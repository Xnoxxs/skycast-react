import { ScrollView, StyleSheet, Text, View } from "react-native"

import CurrentWeather from "../CurrentWeather"
import Forecast from "../Forecast"

const location = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <CurrentWeather location={location} />
      <Forecast location={location} />
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
