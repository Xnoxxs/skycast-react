import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { colors, spacing, typography } from "#design-system"

import {
  type CurrentWeatherData,
  fetchCurrentWeather,
} from "#features/home/services/weatherApi"
import Card from "#shared/ui/Card"


const CurrentWeather: React.FC<{
  location: { name: string; latitude: number; longitude: number }
}> = ({ location }) => {
  const [data, setData] = useState<CurrentWeatherData>()

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const result = await fetchCurrentWeather(location)
        if (!cancelled && result) setData(result)
      } catch (error) {
        console.error("Failed to load current weather:", error)
        if (!cancelled) setData(undefined)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [location])

  return (
    <Card>
      <View style={styles.current}>
        <Text style={styles.temperature}>{data?.temperature ?? "--"} C</Text>
        <Text style={styles.location}>{location.name}</Text>
        <Text style={styles.condition}>{data?.condition ?? "--"}</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{data?.wind.toFixed(0) ?? "--"} km/h</Text>
          <Text style={styles.statLabel}>Wind</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{data?.humidity.toFixed(0) ?? "--"}%</Text>
          <Text style={styles.statLabel}>Humidity</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{data?.uv.toFixed(0) ?? "--"}</Text>
          <Text style={styles.statLabel}>UV</Text>
        </View>
      </View>
    </Card>
  )
}

export default CurrentWeather

const styles = StyleSheet.create({
  current: { alignItems: "center", marginBottom: spacing.xl },  // was: 24
  temperature: typography.temperature,                           // was: { fontSize: 28 }
  location: { ...typography.label, color: colors.text.muted },  // was: { fontSize: 12, color: "#888" }
  condition: typography.condition,                               // was: { fontWeight: "bold" }
  stats: { flexDirection: "row" },
  stat: { flex: 1, alignItems: "center" },
  statValue: typography.statValue,                               // was: { fontSize: 20, fontWeight: "500" }
  statLabel: {
    ...typography.label,                                         // was: { fontSize: 12 }
    color: colors.text.muted,                                    // was: "#888"
    marginTop: spacing.xs,                                       // was: 2
  },
})
