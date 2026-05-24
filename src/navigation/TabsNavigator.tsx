// Bottom tab navigator — the main navigation hub of the app.
// Tabs: Home | Favorites (Stack) | Settings (Drawer)

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeScreen from "../screens/HomeScreen"

import FavoritesStackNavigator from "./FavoritesStackNavigator"
import SettingsDrawerNavigator from "./SettingsDrawerNavigator"
import type { TabsParamList } from "./types"

const Tabs = createBottomTabNavigator<TabsParamList>()

const TabsNavigator: React.FC = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeScreen} />

      {/* Favorites tab hosts a nested Stack — hide the tab's own header */}
      <Tabs.Screen
        name="Favorites"
        component={FavoritesStackNavigator}
        options={{ headerShown: false }}
      />

      {/* Settings tab hosts a nested Drawer — hide the tab's own header */}
      <Tabs.Screen
        name="Settings"
        component={SettingsDrawerNavigator}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  )
}

export default TabsNavigator
