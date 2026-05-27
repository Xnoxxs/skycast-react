// Storage service for favorites.
// This is the ONLY place in the app that calls AsyncStorage directly.
// All other code must go through these functions.

import AsyncStorage from "@react-native-async-storage/async-storage"

import type { Favorite } from "#features/favorites/types"

// The key used to store the favorites array in AsyncStorage.
const FAVORITES_KEY = "favorites"

// Reads the saved favorites from AsyncStorage.
// Returns an empty array if nothing is saved yet, or if reading fails.
export async function getFavorites(): Promise<Favorite[]> {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY)

    if (json === null) {
      // Nothing saved yet — first time the user opens the app
      return []
    }

    // Safely parse the JSON string back into an array
    return JSON.parse(json) as Favorite[]
  } catch (error) {
    console.error("Failed to load favorites:", error)
    return []
  }
}

// Saves the full favorites array to AsyncStorage.
// Called whenever the list changes (add or remove).
export async function saveFavorites(favorites: Favorite[]): Promise<void> {
  try {
    // Convert the array to a JSON string before storing
    const json = JSON.stringify(favorites)
    await AsyncStorage.setItem(FAVORITES_KEY, json)
  } catch (error) {
    console.error("Failed to save favorites:", error)
  }
}

// Removes all saved favorites from AsyncStorage.
// Useful for a "clear all" action or testing.
export async function clearFavorites(): Promise<void> {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY)
  } catch (error) {
    console.error("Failed to clear favorites:", error)
  }
}
