import { Button, StyleSheet, Text, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import type { FavoritesStackParamList } from "#shared/types/navigation"

// Typed props: this screen lives inside the FavoritesStackNavigator
type Props = NativeStackScreenProps<FavoritesStackParamList, "FavoriteDetails">

const FavoriteDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  // route.params.id is fully typed thanks to FavoritesStackParamList
  const { id } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Details</Text>
      <Text style={styles.id}>Item ID: {id}</Text>

      {/* Go back to the FavoritesList screen */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default FavoriteDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  id: {
    fontSize: 18,
    color: "#444",
    marginBottom: 8,
  },
})
