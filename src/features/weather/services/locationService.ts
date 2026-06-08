// Device location service — reads GPS coordinates from the device.
// This is the ONLY place in the app that imports expo-location.
// All other code must go through these functions.

import * as Location from "expo-location"

type DeviceCoordinates = {
  latitude: number
  longitude: number
}

export type LocationResult =
  | { success: true; coordinates: DeviceCoordinates }
  | { success: false; error: string }

// Requests foreground location permission and returns the current GPS position.
// Returns a user-friendly error if permission is denied or location is unavailable.
export async function getCurrentCoordinates(): Promise<LocationResult> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== Location.PermissionStatus.GRANTED) {
      return {
        success: false,
        error:
          "Location permission denied. Enable it in Settings to use this feature.",
      }
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    })

    return {
      success: true,
      coordinates: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    }
  } catch {
    return {
      success: false,
      error: "Unable to get your current location. Please try again.",
    }
  }
}
