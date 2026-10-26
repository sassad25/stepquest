import { Achievement, Adventure } from '../types';

/**
 * Adventure-mode journeys. Steps accumulate toward famous real-world trails, turning everyday
 * walking into tangible progress along a map.
 */
export const ADVENTURES: Adventure[] = [
  {
    id: 'coastal',
    name: 'Coastal Path',
    description: 'Trek a scenic shoreline from cove to lighthouse.',
    totalSteps: 120_000,
    stops: [
      { name: 'Harbour Start', atStep: 0 },
      { name: 'Sandy Cove', atStep: 30_000 },
      { name: 'Cliff Lookout', atStep: 65_000 },
      { name: 'Old Lighthouse', atStep: 120_000 },
    ],
  },
  {
    id: 'summit',
    name: 'Mountain Summit',
    description: 'Climb from the trailhead to a snow-capped peak.',
    totalSteps: 200_000,
    stops: [
      { name: 'Trailhead', atStep: 0 },
      { name: 'Pine Forest', atStep: 55_000 },
      { name: 'Alpine Meadow', atStep: 120_000 },
      { name: 'The Summit', atStep: 200_000 },
    ],
  },
  {
    id: 'city',
    name: 'City Marathon',
    description: 'Wind through landmarks on a classic city route.',
    totalSteps: 55_000,
    stops: [
      { name: 'Start Line', atStep: 0 },
      { name: 'River Bridge', atStep: 18_000 },
      { name: 'Grand Park', atStep: 38_000 },
      { name: 'Finish Line', atStep: 55_000 },
    ],
  },
];

/** Achievement catalogue. `threshold` is lifetime steps unless handled specially in code. */
export const ACHIEVEMENTS: Omit<Achievement, 'unlocked'>[] = [
  { id: 'first-steps', title: 'First Steps', description: 'Record your first 1,000 steps', icon: '👟', threshold: 1_000 },
  { id: 'five-k', title: 'Getting Warm', description: 'Reach 5,000 lifetime steps', icon: '🔥', threshold: 5_000 },
  { id: 'ten-k-day', title: 'Ten-K Club', description: 'Hit 10,000 steps in a single day', icon: '🏅', threshold: 10_000 },
  { id: 'fifty-k', title: 'Road Warrior', description: 'Reach 50,000 lifetime steps', icon: '🛣️', threshold: 50_000 },
  { id: 'hundred-k', title: 'Centurion', description: 'Reach 100,000 lifetime steps', icon: '💯', threshold: 100_000 },
  { id: 'quarter-mil', title: 'Trailblazer', description: 'Reach 250,000 lifetime steps', icon: '🏔️', threshold: 250_000 },
];
