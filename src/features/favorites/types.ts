// A saved location the user wants to track weather for.
// Stored in AsyncStorage as a JSON array.
export type Favorite = {
  id: string
  name: string
  latitude: number
  longitude: number
}
