// RecentSearchesList — renders the recent searches using a FlatList.
//
// Using FlatList (not map) gives us:
//   - Efficient rendering for long lists via virtualization
//   - Built-in pull-to-refresh via the refreshing / onRefresh props
//   - A standard keyExtractor for stable React reconciliation
//
// Props:
//   data       — ordered list of city names (most recent first)
//   onSelect   — called with the city name when the user taps a row
//   refreshing — true while a pull-to-refresh is in progress
//   onRefresh  — called when the user pulls down on the list

import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"

import { Typography, colors, spacing } from "#design-system"

type Props = {
  data: string[]
  onSelect: (city: string) => void
  refreshing: boolean
  onRefresh: () => void
}

const RecentSearchesList: React.FC<Props> = ({
  data,
  onSelect,
  refreshing,
  onRefresh,
}) => {
  // Nothing to show yet — render nothing so the section header stays hidden
  if (data.length === 0) return null

  return (
    <View style={styles.wrapper}>
      {/* Section header — only visible when there is at least one recent search */}
      <Typography variant="subtitle" style={styles.sectionHeader}>
        Recent Searches
      </Typography>

      {/* FlatList renders each city as a tappable row */}
      <FlatList
        data={data}
        // Each city name is unique in the list so it makes a stable key
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => onSelect(item)}
            activeOpacity={0.6}
          >
            <Typography variant="body" style={styles.cityName}>
              {item}
            </Typography>
          </TouchableOpacity>
        )}
        // Pull-to-refresh — re-fetches weather for the current city
        refreshing={refreshing}
        onRefresh={onRefresh}
        // Disable inner scroll so the outer FlatList in HomeScreen handles scrolling
        scrollEnabled={false}
      />
    </View>
  )
}

export default RecentSearchesList

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionHeader: {
    marginBottom: spacing.sm,
    color: colors.text.secondary, // de-emphasized, subordinate to the weather cards
  },
  row: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.text.muted,
  },
  cityName: {
    color: colors.text.primary,
  },
})
