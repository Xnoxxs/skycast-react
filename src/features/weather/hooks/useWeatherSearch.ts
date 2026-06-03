// Reusable hook that manages city search, location state, and persistence.
//
// Patterns used (as taught in class):
//   1. Load on mount  — reads the last searched city from storage when the hook first runs
//   2. Loading state  — isLoading is true during the initial restore and during each search
//   3. Save on change — every successful search persists the city name to storage
//   4. Error handling — city not found and network failures set a user-friendly error message

import { useCallback, useEffect, useState } from "react"

import { BARCELONA } from "#shared/constants/locations"

import { geocodeCity } from "#features/weather/services/geocodingApi"
import { getLastCity, setLastCity } from "#features/weather/storage/weatherPreferences"
import type { SearchedCity } from "#features/weather/types"

export function useWeatherSearch() {
  // The text the user is currently typing in the search field
  const [cityInput, setCityInput] = useState("")

  // The resolved location used to display weather (name + coordinates)
  const [location, setLocation] = useState<SearchedCity>(BARCELONA)

  // True while reading from storage on mount, or while geocoding a search
  const [isLoading, setIsLoading] = useState(true)

  // User-friendly error message; null when there is no error
  const [error, setError] = useState<string | null>(null)

  // --- Load on mount ---
  // Runs once when the hook first mounts.
  // Reads the last searched city from AsyncStorage and fetches its coordinates.
  // Falls back to Barcelona if nothing was saved or geocoding fails.
  useEffect(() => {
    async function restoreLastCity() {
      const saved = await getLastCity()

      if (saved === null) {
        // First app launch — keep the Barcelona default and stop loading
        setIsLoading(false)
        return
      }

      // Pre-fill the input field with the previously searched city
      setCityInput(saved)

      // Geocode the saved city to get up-to-date coordinates
      const result = await geocodeCity(saved)

      if (result) {
        setLocation(result)
      }
      // If geocoding fails, the Barcelona default stays in place

      setIsLoading(false)
    }

    void restoreLastCity()
  }, []) // empty deps = runs only once, on mount

  // --- Search a city ---
  // Geocodes the city name, updates the location, and persists the name to storage.
  // Sets an error message if the city is not found or the network request fails.
  // Returns true if the search succeeded so callers can react (e.g. update recent searches).
  const searchCity = useCallback(async (name: string): Promise<boolean> => {
    const trimmed = name.trim()

    if (trimmed === "") {
      setError("Please enter a city name.")
      return false
    }

    setIsLoading(true)
    setError(null)

    const result = await geocodeCity(trimmed)

    if (result) {
      // --- Save on change ---
      setLocation(result)
      await setLastCity(trimmed)
      setIsLoading(false)
      return true
    } else {
      setError(`City "${trimmed}" not found. Please check the name and try again.`)
      setIsLoading(false)
      return false
    }
  }, [])

  return {
    cityInput,
    setCityInput,
    location,
    isLoading,
    error,
    searchCity,
  }
}
