import { type CurrentWeatherData } from "#features/home/services/weatherApi"
import { type WeatherRecommendation } from "#features/weather/types"

const SUNNY_CODES = [0, 1]
const RAIN_CODES = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99]
const STRONG_WIND_SPEED = 30
const COLD_TEMPERATURE = 10
const MILD_TEMPERATURE_MIN = 10
const MILD_TEMPERATURE_MAX = 25

export function generateWeatherRecommendations(
  weather: CurrentWeatherData,
): WeatherRecommendation[] {
  const recommendations: WeatherRecommendation[] = []
  const hasRain = RAIN_CODES.includes(weather.condition)

  if (SUNNY_CODES.includes(weather.condition)) {
    recommendations.push({
      id: "outdoor-activities",
      message: "☀️ Great day for outdoor activities",
    })
  }

  if (hasRain) {
    recommendations.push({
      id: "umbrella",
      message: "🌧️ Bring an umbrella",
    })
  }

  if (weather.wind >= STRONG_WIND_SPEED) {
    recommendations.push({
      id: "wind",
      message: "🌬️ Windy conditions expected",
    })
  }

  if (weather.temperature < COLD_TEMPERATURE) {
    recommendations.push({
      id: "warm-clothes",
      message: "❄️ Dress warmly today",
    })
  }

  if (
    weather.temperature >= MILD_TEMPERATURE_MIN &&
    weather.temperature <= MILD_TEMPERATURE_MAX &&
    !hasRain
  ) {
    recommendations.push({
      id: "pleasant-weather",
      message: "🌤️ Pleasant weather today",
    })
  }

  return recommendations
}
