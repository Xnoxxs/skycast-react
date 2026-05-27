import  { type DrawerScreenProps } from "@react-navigation/drawer"

import { StyleSheet, View } from "react-native"

import { Button, ScreenContainer, Typography, spacing } from "#design-system"

import  { type SettingsDrawerParamList } from "#shared/types/navigation"

type Props = DrawerScreenProps<SettingsDrawerParamList, "SettingsHome">

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <Typography variant="heading">Settings</Typography>
      <Typography variant="subtitle" color="secondary" style={styles.subtitle}>
        App configuration lives here.
      </Typography>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <View style={styles.spacer} />
      <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")} />
    </ScreenContainer>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: spacing.lg, // was: 16
  },
  spacer: {
    height: spacing.xs, // was: 4
  },
})
