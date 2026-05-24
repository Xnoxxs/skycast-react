import { ScrollView, StyleSheet, Text } from "react-native"

import { BARCELONA } from "#shared/constants/locations"

import CurrentWeather from "#features/home/components/CurrentWeather"
import Forecast from "#features/home/components/Forecast"

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <CurrentWeather location={BARCELONA} />
      <Forecast location={BARCELONA} />
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
})
