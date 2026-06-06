// A city returned from the geocoding API.
// Holds everything needed to display weather: name + coordinates.
export type SearchedCity = {
  name: string
  latitude: number
  longitude: number
}

export type WeatherRecommendation = {
  id: string
  message: string
}
