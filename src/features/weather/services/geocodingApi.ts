// Geocoding service — converts a city name into latitude/longitude coordinates.
// Uses the Open-Meteo Geocoding API (free, no API key required).

import { type SearchedCity } from "#features/weather/types"

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"

// Shape of the response we care about from the Open-Meteo geocoding endpoint.
type GeocodingResponse = {
  results?: Array<{
    name: string
    latitude: number
    longitude: number
    country: string
  }>
}

// Converts a city name into a SearchedCity with coordinates.
// Returns null if the city is not found or if a network/parse error occurs.
export async function geocodeCity(name: string): Promise<SearchedCity | null> {
  try {
    const url = `${GEOCODING_URL}?name=${encodeURIComponent(name)}&count=1&language=en&format=json`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`)
    }

    const data = (await response.json()) as GeocodingResponse

    // The API returns an empty or missing results array when the city is unknown
    if (!data.results || data.results.length === 0) {
      return null
    }

    const first = data.results[0]

    return {
      name: first.name,
      latitude: first.latitude,
      longitude: first.longitude,
    }
  } catch (error) {
    console.error("Failed to geocode city:", error)
    return null
  }
}
