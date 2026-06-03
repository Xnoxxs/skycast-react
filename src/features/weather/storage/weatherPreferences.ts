// Storage service for weather preferences.
// This is the ONLY place in the app that calls AsyncStorage for weather data.
// All other code must go through these functions.

import AsyncStorage from "@react-native-async-storage/async-storage"

// The key used to store the last searched city name in AsyncStorage.
const LAST_CITY_KEY = "lastCity"

// Reads the last searched city name from AsyncStorage.
// Returns null if nothing has been saved yet.
export async function getLastCity(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(LAST_CITY_KEY)
  } catch (error) {
    console.error("Failed to read last city:", error)
    return null
  }
}

// Saves the last searched city name to AsyncStorage.
// Called every time the user searches for a new city.
export async function setLastCity(city: string): Promise<void> {
  try {
    await AsyncStorage.setItem(LAST_CITY_KEY, city)
  } catch (error) {
    console.error("Failed to save last city:", error)
  }
}

// The key used to store the recent searches array in AsyncStorage.
const RECENT_SEARCHES_KEY = "recentSearches"

// Reads the recent searches array from AsyncStorage.
// Returns an empty array if nothing has been saved yet, or if reading fails.
export async function getRecentSearches(): Promise<string[]> {
  try {
    const json = await AsyncStorage.getItem(RECENT_SEARCHES_KEY)

    if (json === null) {
      // Nothing saved yet — first time the user opens the app
      return []
    }

    // Safely parse the JSON string back into an array
    return JSON.parse(json) as string[]
  } catch (error) {
    console.error("Failed to load recent searches:", error)
    return []
  }
}

// Saves the full recent searches array to AsyncStorage.
// Called whenever the list changes (new search added).
export async function saveRecentSearches(searches: string[]): Promise<void> {
  try {
    // Convert the array to a JSON string before storing
    const json = JSON.stringify(searches)
    await AsyncStorage.setItem(RECENT_SEARCHES_KEY, json)
  } catch (error) {
    console.error("Failed to save recent searches:", error)
  }
}
