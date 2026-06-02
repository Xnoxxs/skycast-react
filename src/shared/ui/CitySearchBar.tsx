// Controlled search bar component — renders a TextInput and a Search button.
// The parent owns the input value via `value` and `onChangeText`.
// When the Search button (or keyboard search key) is pressed, `onSearch`
// is called with the current value so the parent can trigger geocoding.

import { StyleSheet, TextInput, View } from "react-native"

import { Button, colors, spacing, typography } from "#design-system"

type Props = {
  // The current text in the input — controlled by the parent
  value: string
  onChangeText: (text: string) => void
  // Called with the trimmed city name when the user submits the search
  onSearch: (city: string) => void
}

const CitySearchBar: React.FC<Props> = ({ value, onChangeText, onSearch }) => {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name..."
        placeholderTextColor={colors.text.muted}
        value={value}
        onChangeText={onChangeText}
        // Allow the user to submit with the keyboard's search/go key
        onSubmitEditing={() => onSearch(value)}
        returnKeyType="search"
      />
      <Button title="Search" onPress={() => onSearch(value)} />
    </View>
  )
}

export default CitySearchBar

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.text.muted,
    borderRadius: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...typography.body,
    color: colors.text.primary,
  },
})
