// Drawer navigator for the Settings tab.
// Screens: SettingsHome (default) and Profile (accessible via drawer)

import { createDrawerNavigator } from "@react-navigation/drawer"

import type { SettingsDrawerParamList } from "#shared/types/navigation"

import ProfileScreen from "#features/settings/screens/ProfileScreen"
import SettingsScreen from "#features/settings/screens/SettingsScreen"

const Drawer = createDrawerNavigator<SettingsDrawerParamList>()

const SettingsDrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="SettingsHome"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Drawer.Navigator>
  )
}

export default SettingsDrawerNavigator
