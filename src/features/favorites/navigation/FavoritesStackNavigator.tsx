// Stack navigator for the Favorites tab.
// Screens: FavoritesList -> FavoriteDetails (with id param)

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import type { FavoritesStackParamList } from "#shared/types/navigation"

import FavoriteDetailsScreen from "#features/favorites/screens/FavoriteDetailsScreen"
import FavoritesScreen from "#features/favorites/screens/FavoritesScreen"

const Stack = createNativeStackNavigator<FavoritesStackParamList>()

const FavoritesStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritesList"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />
      <Stack.Screen
        name="FavoriteDetails"
        component={FavoriteDetailsScreen}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  )
}

export default FavoritesStackNavigator
