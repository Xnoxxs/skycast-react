import { ScrollView, StyleSheet } from "react-native"

import { colors, spacing, Typography } from "#design-system"


import CurrentWeather from "#features/home/components/CurrentWeather"
import Forecast from "#features/home/components/Forecast"
import { BARCELONA } from "#shared/constants/locations"

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="title" style={styles.title}>
        Weather App
      </Typography>
      <CurrentWeather location={BARCELONA} />
      <Forecast location={BARCELONA} />
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background.screen, // was: "#fff"
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,               // was: 24
  },
  title: {
    marginBottom: spacing.lg,                  // was: 16
  },
})
