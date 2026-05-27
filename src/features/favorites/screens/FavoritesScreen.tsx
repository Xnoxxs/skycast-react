import { type NativeStackScreenProps } from "@react-navigation/native-stack"

import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"

import { Button, ScreenContainer, Typography, colors, spacing } from "#design-system"
import { useFavorites } from "#features/favorites/hooks/useFavorites"
import type { Favorite } from "#features/favorites/types"
import { type FavoritesStackParamList } from "#shared/types/navigation"

type Props = NativeStackScreenProps<FavoritesStackParamList, "FavoritesList">

// A handful of preset cities the user can add to their favorites.
// Using the city name as the id keeps things simple and predictable.
const PRESET_CITIES: Favorite[] = [
  { id: "barcelona", name: "Barcelona", latitude: 41.385063, longitude: 2.173404 },
  { id: "new-york", name: "New York", latitude: 40.712776, longitude: -74.005974 },
  { id: "tokyo", name: "Tokyo", latitude: 35.689487, longitude: 139.691711 },
  { id: "london", name: "London", latitude: 51.507351, longitude: -0.127758 },
  { id: "sydney", name: "Sydney", latitude: -33.868820, longitude: 151.209290 },
]

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const { favorites, isLoading, addFavorite, removeFavorite } = useFavorites()

  // Cities from the preset list that the user hasn't saved yet
  const availableCities = PRESET_CITIES.filter(
    (city) => !favorites.some((f) => f.id === city.id),
  )

  // Show a spinner while the initial load from AsyncStorage is in progress
  if (isLoading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" />
        <Typography variant="subtitle" color="secondary">
          Loading favorites...
        </Typography>
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer style={styles.container}>
      {/* ── Saved favorites ───────────────────────────── */}
      <Typography variant="heading">Favorites</Typography>

      {favorites.length === 0 ? (
        <Typography variant="subtitle" color="secondary" style={styles.emptyText}>
          No favorites yet. Add a city below!
        </Typography>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Typography variant="body" style={styles.cityName}>
                {item.name}
              </Typography>
              <View style={styles.rowButtons}>
                <Button
                  title="Details"
                  onPress={() =>
                    navigation.navigate("FavoriteDetails", { id: item.id })
                  }
                />
                <Button
                  title="Remove"
                  color="red"
                  onPress={() => void removeFavorite(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}

      {/* ── Add a city ────────────────────────────────── */}
      {availableCities.length > 0 && (
        <>
          <Typography variant="subtitle" color="secondary" style={styles.sectionLabel}>
            Add a city
          </Typography>
          <FlatList
            data={availableCities}
            keyExtractor={(item) => item.id}
            style={styles.list}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Typography variant="body" style={styles.cityName}>
                  {item.name}
                </Typography>
                <Button title="Add" onPress={() => void addFavorite(item)} />
              </View>
            )}
          />
        </>
      )}
    </ScreenContainer>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  // Override ScreenContainer's centered layout so content starts at the top
  container: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: spacing.lg,
  },
  list: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.text.muted,
  },
  cityName: {
    flex: 1,
  },
  rowButtons: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  emptyText: {
    marginTop: spacing.sm,
  },
  sectionLabel: {
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
  },
})
