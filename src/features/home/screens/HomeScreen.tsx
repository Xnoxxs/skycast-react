import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native"

import { colors, spacing, typography } from "#design-system"

import CurrentWeather from "#features/home/components/CurrentWeather"
import Forecast from "#features/home/components/Forecast"
import RecentSearchesList from "#features/home/components/RecentSearchesList"
import { useRecentSearches } from "#features/weather/hooks/useRecentSearches"
import { useWeatherSearch } from "#features/weather/hooks/useWeatherSearch"
import CitySearchBar from "#shared/ui/CitySearchBar"
import { useCallback, useState } from "react"

const HomeScreen: React.FC = () => {
  // useWeatherSearch manages city input, location state, loading, errors, and persistence
  const { cityInput, setCityInput, location, isLoading, error, searchCity } =
    useWeatherSearch()

  // useRecentSearches manages the persisted list of recently searched cities
  const { recentSearches, addRecentSearch } = useRecentSearches()

  // True while a pull-to-refresh is in progress
  const [isRefreshing, setIsRefreshing] = useState(false)

  // --- Handle search ---
  // Geocodes the city, and if successful, adds it to the recent searches list.
  const handleSearch = useCallback(
    async (city: string) => {
      const success = await searchCity(city)
      if (success) {
        await addRecentSearch(city)
      }
    },
    [searchCity, addRecentSearch],
  )

  // --- Handle recent search tap ---
  // Populates the search field, re-fetches weather, and moves the city to the top.
  const handleSelectRecent = useCallback(
    async (city: string) => {
      setCityInput(city)
      const success = await searchCity(city)
      if (success) {
        await addRecentSearch(city)
      }
    },
    [searchCity, setCityInput, addRecentSearch],
  )

  // --- Pull-to-refresh ---
  // Re-fetches weather for the currently displayed city when the user pulls down.
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await searchCity(location.name)
    setIsRefreshing(false)
  }, [searchCity, location.name])

  // --- ListHeaderComponent ---
  // Everything above the recent searches list: search bar, weather cards.
  // Rendered once at the top of the FlatList.
  const ListHeader = (
    <>
      {/* City search bar — extracted into a shared component for reuse and testability */}
      <CitySearchBar
        value={cityInput}
        onChangeText={setCityInput}
        onSearch={handleSearch}
      />

      {/* Loading indicator — shown while restoring last city or geocoding a new one */}
      {isLoading && <ActivityIndicator style={styles.loading} />}

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
    </>
  )

  return (
    // FlatList replaces the outer ScrollView so pull-to-refresh works natively.
    // data is empty — all content lives in ListHeaderComponent.
    // The outer FlatList is the scroll container and owns pull-to-refresh;
    // RecentSearchesList renders its own inner FlatList (scrollEnabled=false).
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <>
          {ListHeader}
          {/* RecentSearchesList renders its own FlatList (scrollEnabled=false) */}
          <RecentSearchesList
            data={recentSearches}
            onSelect={handleSelectRecent}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </>
      }
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      contentContainerStyle={styles.container}
    />
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
