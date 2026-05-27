import  { type NativeStackScreenProps } from "@react-navigation/native-stack"

import { StyleSheet } from "react-native"

import { Button, ScreenContainer, Typography, colors, spacing, typography } from "#design-system"

import  { type FavoritesStackParamList } from "#shared/types/navigation"

type Props = NativeStackScreenProps<FavoritesStackParamList, "FavoriteDetails">

const FavoriteDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params
  return (
    <ScreenContainer>
      <Typography variant="heading">Favorite Details</Typography>
      <Typography variant="body" style={styles.id}>
        Item ID: {id}
      </Typography>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </ScreenContainer>
  )
}

export default FavoriteDetailsScreen

const styles = StyleSheet.create({
  id: {
    ...typography.temperatureMax,     // fontSize: 18 — same as original
    color: colors.text.faint,         // was: "#444"
    marginBottom: spacing.sm,         // was: 8
  },
})
