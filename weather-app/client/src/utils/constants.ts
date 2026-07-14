/** Temperature unit used throughout the app */
export const DEFAULT_CITY = 'London';
export const API_BASE_URL = 'https://nimbus-weather-backend.onrender.com';
export const REFETCH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
export const DEBOUNCE_DELAY_MS = 300;
export const SESSION_ID_KEY = 'weather_app_session_id';
export const THEME_KEY = 'weather_app_theme';
export const UNIT_KEY = 'weather_app_unit';

/** WeatherAPI.com condition codes for background theming */
export const SUNNY_CODES = [1000];
export const CLOUDY_CODES = [1003, 1006, 1009, 1030];
export const RAINY_CODES = [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246];
export const SNOWY_CODES = [1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264];
export const STORMY_CODES = [1087, 1273, 1276, 1279, 1282];
export const FOGGY_CODES = [1135, 1147];
