// Typography element — replaces repeated <Text style={...}> patterns.
// Pick a variant for size/weight and an optional color key for text color.

import { StyleSheet, Text, type TextStyle } from "react-native"

import { colors } from "#design-system/foundations/colors"
import { typography } from "#design-system/foundations/typography"

type Variant = "heading" | "title" | "subtitle" | "body" | "label"
type ColorKey = "primary" | "secondary" | "muted" | "faint"

type Props = {
  variant?: Variant
  color?: ColorKey
  style?: TextStyle
  children: React.ReactNode
}

const Typography: React.FC<Props> = ({
  variant = "body",
  color,
  style,
  children,
}) => {
  return (
    <Text style={[styles[variant], color && { color: colors.text[color] }, style]}>
      {children}
    </Text>
  )
}

export default Typography

const styles = StyleSheet.create({
  heading: typography.heading,
  title: typography.title,
  subtitle: typography.subtitle,
  body: typography.body,
  label: typography.label,
})
