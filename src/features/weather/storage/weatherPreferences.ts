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
