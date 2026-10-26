/**
 * Centralized design tokens for StepQuest. A single dark, modern palette with vibrant accents keeps
 * the UI cohesive across every screen.
 */
export const theme = {
  colors: {
    bg: '#0b1020',
    bgElev: '#141b33',
    bgSoft: '#1b2440',
    card: '#151d38',
    border: '#273257',
    text: '#eef1fb',
    textSoft: '#aab4d4',
    textFaint: '#7b86ac',
    brand: '#6c8cff',
    brand2: '#8b5cf6',
    accent: '#22d3ee',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
    ringTrack: '#273257',
  },
  gradient: {
    primary: ['#6c8cff', '#8b5cf6'] as const,
    energy: ['#22d3ee', '#6c8cff'] as const,
    flame: ['#fb7185', '#fbbf24'] as const,
  },
  radius: { sm: 10, md: 16, lg: 24, pill: 999 },
  spacing: (n: number) => n * 4,
  font: {
    h1: 34,
    h2: 24,
    h3: 18,
    body: 15,
    small: 13,
    tiny: 11,
  },
} as const;

export type Theme = typeof theme;
