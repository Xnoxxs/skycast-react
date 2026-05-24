// Navigation type definitions for the entire app.
// Each navigator gets its own ParamList so TypeScript
// can enforce correct screen names and params everywhere.

import type { NavigatorScreenParams } from "@react-navigation/native"

// ----- Favorites nested Stack -----
export type FavoritesStackParamList = {
  FavoritesList: undefined
  FavoriteDetails: { id: string }
}

// ----- Settings nested Drawer -----
export type SettingsDrawerParamList = {
  SettingsHome: undefined
  Profile: undefined
}

// ----- Root Bottom Tabs -----
export type TabsParamList = {
  Home: undefined
  // These tabs host nested navigators, so we pass their param lists
  Favorites: NavigatorScreenParams<FavoritesStackParamList>
  Settings: NavigatorScreenParams<SettingsDrawerParamList>
}

// ----- Root Stack (top level) -----
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>
}
