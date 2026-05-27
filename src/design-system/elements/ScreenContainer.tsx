// ScreenContainer element — replaces the repeated centered layout found
// in every settings and favorites screen:
//   { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }
// Accepts an optional style prop for per-screen overrides.

import { StyleSheet, View, type ViewStyle } from "react-native"

import { spacing } from "#design-system/foundations/spacing"

type Props = {
  children: React.ReactNode
  style?: ViewStyle
}

const ScreenContainer: React.FC<Props> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>
}

export default ScreenContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md, // 12 — matches the original gap: 12
  },
})
