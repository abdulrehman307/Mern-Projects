import { Router } from 'express';
import { getWeather, searchCities, getSearchHistory } from '../controllers/weather.controller';
import { searchLimiter } from '../middleware/rateLimiter';

const router = Router();

// GET /api/weather?q=London&days=7
router.get('/', getWeather);

// GET /api/weather/search?q=Lon  (stricter rate limit)
router.get('/search', searchLimiter, searchCities);

// GET /api/weather/history
router.get('/history', getSearchHistory);

export default router;
