import { Button, StyleSheet, Text, View } from "react-native"

import type { DrawerScreenProps } from "@react-navigation/drawer"

import type { SettingsDrawerParamList } from "../navigation/types"

// Typed props: this screen lives inside the SettingsDrawerNavigator
type Props = DrawerScreenProps<SettingsDrawerParamList, "SettingsHome">

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>App configuration lives here.</Text>

      {/* Opens the drawer from code — useful for a custom hamburger button */}
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <View style={styles.spacer} />

      {/* Navigate to the Profile drawer screen */}
      <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")} />
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  spacer: {
    height: 4,
  },
})
