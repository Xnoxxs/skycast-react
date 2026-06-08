# SkyCast

## Project Description

SkyCast is a mobile weather application that lets you search for any city, view current conditions and a multi-day forecast, save favourite locations for quick access, and keep a list of recent searches across sessions. You can also use your device's GPS to see weather where you are. The app uses free Open-Meteo APIs with no API key, making it easy to run locally and useful for quick, on-the-go weather checks.

## Technical Overview

SkyCast is built with Expo and React Native using a feature-based architecture under `src/`. Navigation is separated into an app shell (`src/app`) that wires tab, stack, and drawer navigators, while screens and business logic live in feature folders. Shared UI, types, and constants sit behind `#` path aliases so features import through module boundaries rather than deep relative paths. Persistence is isolated in storage gateway modules that are the only code touching AsyncStorage; hooks expose load-on-mount, save-on-change, and optimistic-update patterns to the UI. A design system provides colour, spacing, typography, and radius tokens plus reusable primitives. Tests use Jest and React Native Testing Library; CI runs lint and tests on every push and pull request.

- Expo (SDK 56)
- React Native
- React Navigation (bottom tabs, native stack, drawer)
- AsyncStorage
- Jest + React Native Testing Library
- Open-Meteo Forecast API
- Open-Meteo Geocoding API
- expo-location

## Project Structure

- **`src/app`** — Application shell: `NavigationContainer` provider, root stack navigator, and bottom-tab navigator that mounts feature screens and nested navigators.
- **`src/features`** — Domain modules (`home`, `weather`, `favorites`, `settings`). Each feature owns its screens, hooks, services, storage, and nested navigators where needed.
- **`src/shared`** — Cross-feature UI (`Card`, `CitySearchBar`), navigation param types, and app-wide constants.
- **`src/design-system`** — Design tokens (colours, spacing, typography, radius) and primitive components (`Button`, `Typography`, `ScreenContainer`).

## Getting Started

**Node version:** Node.js 20 LTS or newer (matches Expo SDK 56 and the CI workflow).

```bash
npm install
npm start
npm test
npm run lint
```

**Environment variables:** None required. Open-Meteo forecast and geocoding endpoints are free and do not need an API key.

**Device permissions:** Tapping "Use current location" on the Home screen requests foreground location permission so the app can read GPS coordinates.

## Course Requirements Mapping

| #   | Requirement                                          | Where it is implemented                                                                                                                                  |
| --- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | All application code in `src/`                       | Entry at `src/index.ts`; all screens, hooks, services, and tests under `src/`                                                                            |
| 2   | Routing separated from logic and rendering           | Navigators in `src/app/navigation/` and `src/features/*/navigation/`; screens in `src/features/*/screens/`; types in `src/shared/types/navigation.ts`    |
| 3   | Feature-based organization                           | `src/features/home`, `weather`, `favorites`, `settings`                                                                                                  |
| 4   | Modlets or similar isolation pattern                 | Storage gateways (`favoritesStorage.ts`, `weatherPreferences.ts`), `locationService.ts`, and feature hooks as module APIs                                |
| 5   | Shared code via module boundaries                    | `#app/*`, `#features/*`, `#shared/*`, `#design-system` path aliases in `tsconfig.json`                                                                   |
| 6   | Design system present and actively used              | `src/design-system/` — tokens and elements used across screens and shared UI                                                                             |
| 7   | User input                                           | `src/shared/ui/CitySearchBar.tsx` — controlled `TextInput` on `HomeScreen`                                                                               |
| 8   | Persistence                                          | `@react-native-async-storage/async-storage` via `favoritesStorage.ts` and `weatherPreferences.ts`                                                        |
| 9   | Device feature                                       | `expo-location` in `src/features/weather/services/locationService.ts`; "Use current location" on `HomeScreen`                                            |
| 10  | FlatList used meaningfully                           | `HomeScreen`, `RecentSearchesList`, `FavoritesScreen`                                                                                                    |
| 11  | Tests (smoke, unit, mock + user action, integration) | `src/design-system/elements/Button.test.tsx`, `Typography.test.tsx`, `ScreenContainer.test.tsx`, `src/shared/ui/Card.test.tsx`, `CitySearchBar.test.tsx` |
| 12  | CI/CD runs lint and tests                            | `.github/workflows/ci.yml`                                                                                                                               |
| 13  | Expo SDK 56 installed                                | `expo@^56.0.0` in `package.json`                                                                                                                         |
| 14  | Expo Doctor passes                                   | Verified with `npx expo-doctor` (18/18 checks)                                                                                                           |
