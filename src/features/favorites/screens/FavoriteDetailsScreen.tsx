import { type NativeStackScreenProps } from "@react-navigation/native-stack"

import { ActivityIndicator, StyleSheet } from "react-native"

import { Button, ScreenContainer, Typography, colors, spacing, typography } from "#design-system"
import { useFavorites } from "#features/favorites/hooks/useFavorites"
import { type FavoritesStackParamList } from "#shared/types/navigation"

type Props = NativeStackScreenProps<FavoritesStackParamList, "FavoriteDetails">

const FavoriteDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params
  const { favorites, isLoading, toggleFavorite, isFavorite } = useFavorites()

  // Show a spinner while the initial load from AsyncStorage is in progress
  if (isLoading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" />
        <Typography variant="subtitle" color="secondary">
          Loading...
        </Typography>
      </ScreenContainer>
    )
  }

  // Look up the favorite by id from the loaded list
  const favorite = favorites.find((f) => f.id === id)

  // Handle the case where the city is not found in favorites
  if (favorite === undefined) {
    return (
      <ScreenContainer>
        <Typography variant="heading">Not Found</Typography>
        <Typography variant="subtitle" color="secondary">
          This city is not in your favorites.
        </Typography>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </ScreenContainer>
    )
  }

  const saved = isFavorite(favorite.id)

  return (
    <ScreenContainer>
      <Typography variant="heading">{favorite.name}</Typography>

      <Typography variant="body" style={styles.coord}>
        Latitude: {favorite.latitude}
      </Typography>
      <Typography variant="body" style={styles.coord}>
        Longitude: {favorite.longitude}
      </Typography>

      {/* Toggle button — label changes based on whether it's already saved */}
      <Button
        title={saved ? "Remove from Favorites" : "Add to Favorites"}
        color={saved ? "red" : undefined}
        onPress={() => void toggleFavorite(favorite)}
      />

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </ScreenContainer>
  )
}

export default FavoriteDetailsScreen

const styles = StyleSheet.create({
  coord: {
    ...typography.temperatureMax,
    color: colors.text.faint,
    marginBottom: spacing.sm,
  },
})
