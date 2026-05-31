import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"

import { Button, Typography, colors, spacing, typography } from "#design-system"

import CurrentWeather from "#features/home/components/CurrentWeather"
import Forecast from "#features/home/components/Forecast"
import { useWeatherSearch } from "#features/weather/hooks/useWeatherSearch"

const HomeScreen: React.FC = () => {
  // useWeatherSearch manages city input, location state, loading, errors, and persistence
  const { cityInput, setCityInput, location, isLoading, error, searchCity } =
    useWeatherSearch()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="title" style={styles.title}>
        Weather App
      </Typography>

      {/* City search bar */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name..."
          placeholderTextColor={colors.text.muted}
          value={cityInput}
          onChangeText={setCityInput}
          // Allow the user to submit with the keyboard's search/go key
          onSubmitEditing={() => void searchCity(cityInput)}
          returnKeyType="search"
        />
        <Button title="Search" onPress={() => void searchCity(cityInput)} />
      </View>

      {/* Loading indicator — shown while restoring last city or geocoding a new one */}
      {isLoading && (
        <ActivityIndicator style={styles.loading} />
      )}

      {/* Error message — shown when the city is not found or a network error occurs */}
      {!isLoading && error !== null && (
        <Text style={styles.error}>{error}</Text>
      )}

      {/* Weather cards — hidden while the initial load is in progress */}
      {!isLoading && (
        <>
          <CurrentWeather location={location} />
          <Forecast location={location} />
        </>
      )}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background.screen, // was: "#fff"
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,               // was: 24
  },
  title: {
    marginBottom: spacing.lg,                  // was: 16
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
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
  loading: {
    marginVertical: spacing.xl,
  },
  error: {
    ...typography.body,
    color: "red",
    marginBottom: spacing.lg,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },
})
