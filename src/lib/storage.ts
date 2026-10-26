import AsyncStorage from '@react-native-async-storage/async-storage';
import { DayRecord, StreakInfo } from '../types';
import { isoDate } from './metrics';

const HISTORY_KEY = 'stepquest.history.v1';
const DEFAULT_GOAL = 8_000;

/** Reads the full day-history map (keyed by ISO date). */
export async function loadHistory(): Promise<Record<string, DayRecord>> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, DayRecord>;
  } catch {
    return {};
  }
}

/** Persists (or updates) today's record with the latest step count. */
export async function saveToday(steps: number, goal: number): Promise<Record<string, DayRecord>> {
  const history = await loadHistory();
  const today = isoDate();
  history[today] = { date: today, steps, goal };
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}

/** Sum of all recorded steps across history (lifetime). */
export function lifetimeSteps(history: Record<string, DayRecord>): number {
  return Object.values(history).reduce((sum, r) => sum + r.steps, 0);
}

/** Highest single-day step count across history. */
export function bestDay(history: Record<string, DayRecord>): number {
  return Object.values(history).reduce((max, r) => Math.max(max, r.steps), 0);
}

/**
 * Computes the current and best goal-hitting streak from history. A day counts toward the streak
 * when its steps met or exceeded that day's goal. The current streak counts consecutive
 * goal-days ending today (or yesterday, allowing for a day still in progress).
 */
export function computeStreak(history: Record<string, DayRecord>): StreakInfo {
  const dates = Object.keys(history).sort(); // ascending ISO sorts chronologically
  let best = 0;
  let run = 0;
  let prev: Date | null = null;

  for (const d of dates) {
    const rec = history[d];
    const hit = rec.steps >= rec.goal && rec.goal > 0;
    const cur = new Date(d + 'T00:00:00');
    const consecutive = prev !== null && (cur.getTime() - prev.getTime()) === 86_400_000;
    if (hit) {
      run = consecutive ? run + 1 : 1;
    } else {
      run = 0;
    }
    best = Math.max(best, run);
    prev = cur;
  }

  // Current streak: walk backwards from today over goal-hitting consecutive days.
  let current = 0;
  const now = new Date();
  for (let i = 0; i < 400; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const rec = history[isoDate(d)];
    if (rec && rec.steps >= rec.goal && rec.goal > 0) {
      current += 1;
    } else if (i === 0) {
      // Today may still be in progress; don't break the streak yet.
      continue;
    } else {
      break;
    }
  }

  return { current, best };
}

/**
 * Adaptive daily goal: the rolling 7-day average nudged up by 5% to gently push improvement,
 * rounded to the nearest 500, and floored at the default. Returns the default with no history.
 */
export function adaptiveGoal(history: Record<string, DayRecord>): number {
  const values = Object.values(history).map((r) => r.steps).filter((s) => s > 0);
  if (values.length === 0) return DEFAULT_GOAL;
  const recent = values.slice(-7);
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const target = Math.round((avg * 1.05) / 500) * 500;
  return Math.max(DEFAULT_GOAL, target);
}

export { DEFAULT_GOAL };
