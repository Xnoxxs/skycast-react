import { Button, StyleSheet, Text, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import type { FavoritesStackParamList } from "../navigation/types"

// Typed props: this screen lives inside the FavoritesStackNavigator
type Props = NativeStackScreenProps<FavoritesStackParamList, "FavoritesList">

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>Your saved items appear here.</Text>

      {/* Navigate into the FavoriteDetails screen, passing an id param */}
      <Button
        title="View Favorite #1"
        onPress={() => navigation.navigate("FavoriteDetails", { id: "1" })}
      />
      <View style={styles.spacer} />
      <Button
        title="View Favorite #2"
        onPress={() => navigation.navigate("FavoriteDetails", { id: "2" })}
      />
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  spacer: {
    height: 4,
  },
})
