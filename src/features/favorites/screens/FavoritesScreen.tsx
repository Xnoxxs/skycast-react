import  { type NativeStackScreenProps } from "@react-navigation/native-stack"

import { View, StyleSheet } from "react-native"

import { Button, ScreenContainer, Typography, spacing } from "#design-system"

import  { type FavoritesStackParamList } from "#shared/types/navigation"


type Props = NativeStackScreenProps<FavoritesStackParamList, "FavoritesList">

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <Typography variant="heading">Favorites</Typography>
      <Typography variant="subtitle" color="secondary" style={styles.subtitle}>
        Your saved items appear here.
      </Typography>
      <Button
        title="View Favorite #1"
        onPress={() => navigation.navigate("FavoriteDetails", { id: "1" })}
      />
      <View style={styles.spacer} />
      <Button
        title="View Favorite #2"
        onPress={() => navigation.navigate("FavoriteDetails", { id: "2" })}
      />
    </ScreenContainer>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: spacing.lg, // was: 16
  },
  spacer: {
    height: spacing.xs, // was: 4
  },
})
