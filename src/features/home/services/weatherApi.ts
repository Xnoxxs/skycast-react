export type WeatherLocation = {
  latitude: number
  longitude: number
}

export type CurrentWeatherData = {
  condition: number
  temperature: number
  wind: number
  humidity: number
  uv: number
}

export type ForecastDay = {
  day: string
  temperatureMax: number
  temperatureMin: number
  condition: number
}

const BASE_URL = "https://api.open-meteo.com/v1/forecast"

type OpenMeteoCurrentResponse = {
  current: {
    weather_code: number
    temperature_2m: number
    wind_speed_10m: number
    relative_humidity_2m: number
    uv_index: number
  }
}

type OpenMeteoForecastResponse = {
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
}

export async function fetchCurrentWeather(
  location: WeatherLocation,
): Promise<CurrentWeatherData | null> {
  try {
    const response = await fetch(
      `${BASE_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,is_day,weather_code,wind_speed_10m,relative_humidity_2m,uv_index`,
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = (await response.json()) as OpenMeteoCurrentResponse

    return {
      condition: data.current.weather_code,
      temperature: data.current.temperature_2m,
      wind: data.current.wind_speed_10m,
      humidity: data.current.relative_humidity_2m,
      uv: data.current.uv_index,
    }
  } catch (error) {
    console.error("Failed to fetch current weather:", error)
    return null
  }
}

export async function fetchForecast(
  location: WeatherLocation,
): Promise<ForecastDay[] | null> {
  try {
    const response = await fetch(
      `${BASE_URL}?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code`,
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = (await response.json()) as OpenMeteoForecastResponse

    const forecast: ForecastDay[] = []
    for (let i = 0; i < data.daily.time.length; i++) {
      forecast.push({
        day: data.daily.time[i],
        temperatureMax: data.daily.temperature_2m_max[i],
        temperatureMin: data.daily.temperature_2m_min[i],
        condition: data.daily.weather_code[i],
      })
    }

    return forecast
  } catch (error) {
    console.error("Failed to fetch forecast:", error)
    return null
  }
}
