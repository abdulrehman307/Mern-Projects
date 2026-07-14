/**
 * Shared weather types — mirrored in client/src/types/weather.types.ts
 * Keep these two files in sync when adding new fields.
 */

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  wind_dir: string;
  pressure_mb: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  is_day: number;
  condition: WeatherCondition;
  last_updated: string;
}

export interface HourWeather {
  time: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  condition: WeatherCondition;
  chance_of_rain: number;
  chance_of_snow: number;
  is_day: number;
}

export interface DayWeather {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  avghumidity: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  maxwind_kph: number;
  maxwind_mph: number;
  uv: number;
  condition: WeatherCondition;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DayWeather;
  hour: HourWeather[];
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface CitySearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export interface FavoriteCity {
  id: string;
  sessionId: string;
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  addedAt: string;
}
