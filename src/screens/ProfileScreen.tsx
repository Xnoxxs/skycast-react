import { Button, StyleSheet, Text, View } from "react-native"

import type { DrawerScreenProps } from "@react-navigation/drawer"

import type { SettingsDrawerParamList } from "../navigation/types"

// Typed props: this screen lives inside the SettingsDrawerNavigator
type Props = DrawerScreenProps<SettingsDrawerParamList, "Profile">

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>User information and preferences.</Text>

      {/* Navigate back to the Settings drawer screen */}
      <Button title="Back to Settings" onPress={() => navigation.navigate("SettingsHome")} />
      <View style={styles.spacer} />

      {/* Close the drawer */}
      <Button title="Close Drawer" onPress={() => navigation.closeDrawer()} />
    </View>
  )
}

export default ProfileScreen

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
