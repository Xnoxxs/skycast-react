import  { type DrawerScreenProps } from "@react-navigation/drawer"

import { StyleSheet, View } from "react-native"

import { Button, ScreenContainer, Typography, spacing } from "#design-system"

import  { type SettingsDrawerParamList } from "#shared/types/navigation"

type Props = DrawerScreenProps<SettingsDrawerParamList, "Profile">

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <Typography variant="heading">Profile</Typography>
      <Typography variant="subtitle" color="secondary" style={styles.subtitle}>
        User information and preferences.
      </Typography>
      <Button
        title="Back to Settings"
        onPress={() => navigation.navigate("SettingsHome")}
      />
      <View style={styles.spacer} />
      <Button title="Close Drawer" onPress={() => navigation.closeDrawer()} />
    </ScreenContainer>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: spacing.lg, // was: 16
  },
  spacer: {
    height: spacing.xs, // was: 4
  },
})
