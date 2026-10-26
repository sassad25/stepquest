import { DerivedMetrics } from '../types';

/** Average stride length in metres (reasonable default for an adult). */
const STRIDE_M = 0.762;
/** Rough calories burned per step. */
const CAL_PER_STEP = 0.04;
/** Rough steps per active minute at a walking cadence. */
const STEPS_PER_ACTIVE_MIN = 100;

/** Derives distance, calories and active minutes from a step count. */
export function deriveMetrics(steps: number): DerivedMetrics {
  return {
    distanceKm: (steps * STRIDE_M) / 1000,
    calories: Math.round(steps * CAL_PER_STEP),
    activeMinutes: Math.round(steps / STEPS_PER_ACTIVE_MIN),
  };
}

/** Local ISO date (YYYY-MM-DD) for a given Date, defaulting to now. */
export function isoDate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Returns the last `n` ISO dates ending today (oldest first). */
export function lastNDates(n: number): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    out.push(isoDate(d));
  }
  return out;
}

/** Short weekday label for an ISO date, e.g. "Mon". */
export function weekdayLabel(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { weekday: 'short' });
}

/** Clamps a 0..1 progress ratio. */
export function clamp01(v: number): number {
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}
