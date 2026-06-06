import { StyleSheet, View } from "react-native"

import { spacing, Typography } from "#design-system"
import { type WeatherRecommendation } from "#features/weather/types"
import Card from "#shared/ui/Card"

type Props = {
  recommendations: WeatherRecommendation[]
}

const WeatherRecommendations: React.FC<Props> = ({ recommendations }) => {
  return (
    <Card>
      <View style={styles.container}>
        <Typography variant="title" style={styles.title}>
          Weather Recommendations
        </Typography>

        {recommendations.length > 0 ? (
          recommendations.map((recommendation) => (
            <Typography
              key={recommendation.id}
              variant="body"
              style={styles.item}
            >
              {recommendation.message}
            </Typography>
          ))
        ) : (
          <Typography variant="body" color="secondary">
            No recommendations available.
          </Typography>
        )}
      </View>
    </Card>
  )
}

export default WeatherRecommendations

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    marginBottom: spacing.xs,
  },
  item: {
    textAlign: "center",
  },
})
