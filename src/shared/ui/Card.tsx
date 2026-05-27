import { Platform, StyleSheet, View } from "react-native"

import { colors, radius, spacing } from "#design-system"

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,        // was: 24
    margin: spacing.lg,         // was: 16
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,    // was: 20
    backgroundColor: colors.background.card, // was: "#ffffff"
    shadowColor: colors.shadow,              // was: "#000"
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
})
