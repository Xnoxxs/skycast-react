// Drawer navigator for the Settings tab.
// Screens: SettingsHome (default) and Profile (accessible via drawer)

import { createDrawerNavigator } from "@react-navigation/drawer"

import ProfileScreen from "../screens/ProfileScreen"
import SettingsScreen from "../screens/SettingsScreen"

import type { SettingsDrawerParamList } from "./types"

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
