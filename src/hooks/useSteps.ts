import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pedometer } from 'expo-sensors';
import { DayRecord, StreakInfo } from '../types';
import {
  adaptiveGoal,
  bestDay,
  computeStreak,
  DEFAULT_GOAL,
  lifetimeSteps,
  loadHistory,
  saveToday,
} from '../lib/storage';
import { deriveMetrics } from '../lib/metrics';

export interface StepsState {
  /** Whether a pedometer is available on this device. */
  available: boolean;
  /** True until the first load/subscription attempt resolves. */
  loading: boolean;
  /** Live step count for today. */
  steps: number;
  /** Today's adaptive goal. */
  goal: number;
  history: Record<string, DayRecord>;
  streak: StreakInfo;
  lifetime: number;
  best: number;
  distanceKm: number;
  calories: number;
  activeMinutes: number;
}

/**
 * Subscribes to the device pedometer for live step counts, persists today's progress, and derives
 * streaks, lifetime totals and metric conversions.
 *
 * On platforms/devices without a pedometer (e.g. simulators or web), it degrades gracefully:
 * `available` is false and the UI can show an appropriate message while still rendering history.
 */
export function useSteps(): StepsState {
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(0);
  const [goal, setGoal] = useState<number>(DEFAULT_GOAL);
  const [history, setHistory] = useState<Record<string, DayRecord>>({});
  const subscriptionRef = useRef<{ remove: () => void } | null>(null);
  const lastSavedRef = useRef<number>(0);

  // Persist at most ~once per 10 steps to limit storage writes.
  const persist = useCallback(
    (count: number, dailyGoal: number) => {
      if (Math.abs(count - lastSavedRef.current) >= 10 || count === 0) {
        lastSavedRef.current = count;
        void saveToday(count, dailyGoal).then(setHistory);
      }
    },
    [],
  );

  useEffect(() => {
    let mounted = true;

    (async () => {
      const loaded = await loadHistory();
      if (!mounted) return;
      setHistory(loaded);
      const g = adaptiveGoal(loaded);
      setGoal(g);

      let isAvailable = false;
      try {
        isAvailable = await Pedometer.isAvailableAsync();
      } catch {
        isAvailable = false;
      }
      if (!mounted) return;
      setAvailable(isAvailable);

      if (isAvailable) {
        // Seed today's count from midnight using a historical query where supported.
        try {
          const start = new Date();
          start.setHours(0, 0, 0, 0);
          const result = await Pedometer.getStepCountAsync(start, new Date());
          if (mounted && result?.steps != null) {
            setSteps(result.steps);
            persist(result.steps, g);
          }
        } catch {
          // iOS supports historical queries; Android may not. Live watch below still works.
        }

        // Live subscription: expo gives steps since subscription start, so we add to a baseline.
        const baseline = { value: 0 };
        setSteps((current) => {
          baseline.value = current;
          return current;
        });
        subscriptionRef.current = Pedometer.watchStepCount((res) => {
          const total = baseline.value + res.steps;
          setSteps(total);
          persist(total, g);
        });
      }

      if (mounted) setLoading(false);
    })();

    return () => {
      mounted = false;
      subscriptionRef.current?.remove();
    };
  }, [persist]);

  const streak = useMemo(() => computeStreak(history), [history]);
  const lifetime = useMemo(() => lifetimeSteps(history) + steps, [history, steps]);
  const best = useMemo(() => Math.max(bestDay(history), steps), [history, steps]);
  const metrics = useMemo(() => deriveMetrics(steps), [steps]);

  return {
    available,
    loading,
    steps,
    goal,
    history,
    streak,
    lifetime,
    best,
    distanceKm: metrics.distanceKm,
    calories: metrics.calories,
    activeMinutes: metrics.activeMinutes,
  };
}
