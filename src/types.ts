/** A single day's activity record, persisted locally. */
export interface DayRecord {
  /** ISO date, e.g. "2026-10-26". */
  date: string;
  steps: number;
  goal: number;
}

/** Derived streak info. */
export interface StreakInfo {
  current: number;
  best: number;
}

/** An achievement definition + unlock state. */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** Total lifetime steps required to unlock (or a custom predicate handled in code). */
  threshold: number;
  unlocked: boolean;
}

/** A stop along an Adventure-mode journey. */
export interface AdventureStop {
  name: string;
  atStep: number;
}

/** An Adventure-mode journey definition. */
export interface Adventure {
  id: string;
  name: string;
  description: string;
  totalSteps: number;
  stops: AdventureStop[];
}

/** Metric conversions derived from a step count. */
export interface DerivedMetrics {
  distanceKm: number;
  calories: number;
  activeMinutes: number;
}
