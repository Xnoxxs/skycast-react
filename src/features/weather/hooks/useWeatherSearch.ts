// Reusable hook that manages city search, location state, and persistence.
//
// Patterns used (as taught in class):
//   1. Load on mount  — reads the last searched city from storage when the hook first runs
//   2. Loading state  — isLoading is true during the initial restore and during each search
//   3. Save on change — every successful search persists the city name to storage
//   4. Error handling — city not found and network failures set a user-friendly error message

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"

import { geocodeCity } from "#features/weather/services/geocodingApi"
import { getCurrentCoordinates } from "#features/weather/services/locationService"
import {
  getLastCity,
  setLastCity,
} from "#features/weather/storage/weatherPreferences"
import { type SearchedCity } from "#features/weather/types"
import { BARCELONA } from "#shared/constants/locations"

export const CURRENT_LOCATION_NAME = "Current location"

type UseWeatherSearchResult = {
  cityInput: string
  setCityInput: Dispatch<SetStateAction<string>>
  location: SearchedCity
  isLoading: boolean
  error: string | null
  searchCity: (name: string) => Promise<boolean>
  searchCurrentLocation: () => Promise<boolean>
}

export function useWeatherSearch(): UseWeatherSearchResult {
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

      if (saved === CURRENT_LOCATION_NAME) {
        const result = await getCurrentCoordinates()

        if (result.success) {
          setLocation({
            name: CURRENT_LOCATION_NAME,
            latitude: result.coordinates.latitude,
            longitude: result.coordinates.longitude,
          })
        }
        // If GPS fails, the Barcelona default stays in place

        setIsLoading(false)
        return
      }

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
      setError(
        `City "${trimmed}" not found. Please check the name and try again.`,
      )
      setIsLoading(false)
      return false
    }
  }, [])

  // --- Use device GPS ---
  // Reads the device's current coordinates and displays weather for that position.
  const searchCurrentLocation = useCallback(async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    const result = await getCurrentCoordinates()

    if (!result.success) {
      setError(result.error)
      setIsLoading(false)
      return false
    }

    const { latitude, longitude } = result.coordinates

    setLocation({
      name: CURRENT_LOCATION_NAME,
      latitude,
      longitude,
    })
    setCityInput(CURRENT_LOCATION_NAME)
    await setLastCity(CURRENT_LOCATION_NAME)
    setIsLoading(false)
    return true
  }, [])

  return {
    cityInput,
    setCityInput,
    location,
    isLoading,
    error,
    searchCity,
    searchCurrentLocation,
  }
}
