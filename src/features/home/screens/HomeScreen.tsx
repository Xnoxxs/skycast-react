import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native"

import { Typography, colors, spacing, typography } from "#design-system"

import CurrentWeather from "#features/home/components/CurrentWeather"
import Forecast from "#features/home/components/Forecast"
import { useWeatherSearch } from "#features/weather/hooks/useWeatherSearch"
import CitySearchBar from "#shared/ui/CitySearchBar"

const HomeScreen: React.FC = () => {
  // useWeatherSearch manages city input, location state, loading, errors, and persistence
  const { cityInput, setCityInput, location, isLoading, error, searchCity } =
    useWeatherSearch()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="title" style={styles.title}>
        Weather App
      </Typography>

      {/* City search bar — extracted into a shared component for reuse and testability */}
      <CitySearchBar
        value={cityInput}
        onChangeText={setCityInput}
        onSearch={searchCity}
      />

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
