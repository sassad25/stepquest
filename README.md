# StepQuest 👣

A cross-platform (iOS + Android) **live step counter** built with **React Native + Expo +
TypeScript**. It counts your real steps from the device motion sensor and turns everyday walking
into a game with goal rings, streaks, virtual journeys, and achievements.

> Author: **Muhammad Shehzeb Assad**
> An original app — not affiliated with or derived from any existing product.

---

## Features

- **Live step counting** — reads the device pedometer in real time (`expo-sensors`), seeded from
  midnight where the platform supports historical queries.
- **Animated goal ring** — a smooth SVG progress ring is the hero of the Today screen.
- **Smart adaptive goal** — your daily target tracks your rolling 7-day average and nudges you ~5%
  higher, so the goal grows with you.
- **Streaks** — current and best goal-hitting streaks to build the habit.
- **🧭 Adventure mode** — your lifetime steps advance you along famous-trail-style journeys
  (Coastal Path, Mountain Summit, City Marathon) with stops and progress. *The signature feature.*
- **🏆 Achievements** — six milestone badges that unlock as you progress, with progress bars.
- **📊 Stats** — a 7-day bar chart plus weekly totals, averages and best streak.
- **Offline-first** — history is persisted locally with AsyncStorage; metrics (distance, calories,
  active minutes) are derived on device.
- **Polished dark UI** — a cohesive design system, gradients, and bottom-tab navigation.

## Tech stack

React Native 0.74 · Expo SDK 51 · TypeScript (strict) · expo-sensors (Pedometer) · React Navigation
(bottom tabs) · react-native-svg · AsyncStorage.

## Running it

> **Live steps require a physical phone.** Simulators/emulators and web don't provide real pedometer
> data; the app detects this and shows a friendly notice while still rendering the UI and history.

```bash
npm install
npm start          # opens Expo Dev Tools
# then: scan the QR code with the Expo Go app on your iPhone/Android,
#       or press "a" (Android emulator) / "i" (iOS simulator)
```

Type-check:

```bash
npm run typecheck   # tsc --noEmit (strict)
```

## Project structure

```
stepquest/
├── App.tsx                     # bottom-tab navigation, shared steps state
├── app.json                    # Expo config (motion permission, bundle ids)
└── src/
    ├── theme.ts                # design tokens (colors, gradients, spacing)
    ├── types.ts                # domain types
    ├── hooks/useSteps.ts       # pedometer subscription + persistence + derived state
    ├── lib/
    │   ├── storage.ts          # history, streaks, adaptive goal (AsyncStorage)
    │   ├── metrics.ts          # distance/calories/active-minutes + date helpers
    │   └── data.ts             # adventures + achievements
    ├── components/             # GoalRing, StatCard, ProgressBar, Section, ScreenContainer
    └── screens/                # Today, Adventure, Achievements, Stats
```

## Build / verification status

- ✅ **TypeScript compiles** cleanly (`npm run typecheck`, strict mode) — verified.
- ⚠️ **Live step counting** can only be exercised on a **real device** — not verified in this
  environment (no physical sensor available).
- ⚠️ **iOS binary builds** require **macOS + Xcode** (Expo prebuild / EAS Build); not buildable on a
  Windows machine. Android APKs can be produced via EAS Build.

## License

MIT © Muhammad Shehzeb Assad
