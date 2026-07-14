import { Request, Response, NextFunction } from 'express';
import { weatherProvider } from '../services/weatherApiCom.provider';
import { getCached, setCached } from '../services/cache.service';
import { SearchHistory } from '../models/SearchHistory.model';
import { createError } from '../middleware/errorHandler';

/**
 * GET /api/weather?q=<city>&days=<1-7>
 * Checks the MongoDB cache first; falls back to the weather provider.
 */
export async function getWeather(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const q = (req.query.q as string | undefined)?.trim();
    const days = Number(req.query.days) || 7;
    const sessionId = (req.headers['x-session-id'] as string | undefined) ?? 'anonymous';

    if (!q) {
      return next(createError('Query parameter "q" is required', 400));
    }

    // 1. Check cache
    const cached = await getCached(q);
    if (cached) {
      res.json({ success: true, data: cached, fromCache: true });
      return;
    }

    // 2. Fetch from provider
    let weatherData;
    try {
      weatherData = await weatherProvider.getWeather(q, days);
    } catch (providerErr: unknown) {
      // WeatherAPI.com returns 400 for city-not-found
      const err = providerErr as { response?: { status?: number } };
      if (err?.response?.status === 400) {
        return next(createError(`City "${q}" not found. Please check the spelling and try again.`, 404));
      }
      throw providerErr;
    }

    // 3. Persist to cache asynchronously (don't await — not critical path)
    setCached(q, weatherData).catch((e) => console.warn('[Cache write error]', e));

    // 4. Record search history asynchronously
    SearchHistory.create({ sessionId, query: q, searchedAt: new Date() }).catch(() => {
      // Non-critical — swallow silently
    });

    res.json({ success: true, data: weatherData, fromCache: false });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/weather/search?q=<partial>
 * Returns city autocomplete suggestions.
 */
export async function searchCities(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const q = (req.query.q as string | undefined)?.trim();

    if (!q || q.length < 2) {
      res.json({ success: true, data: [] });
      return;
    }

    const results = await weatherProvider.searchCities(q);
    res.json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/weather/history
 * Returns the last 10 searches for the session.
 */
export async function getSearchHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const sessionId = (req.headers['x-session-id'] as string | undefined) ?? 'anonymous';
    const history = await SearchHistory.find({ sessionId })
      .sort({ searchedAt: -1 })
      .limit(10)
      .lean();

    res.json({ success: true, data: history.map((h) => h.query) });
  } catch (err) {
    next(err);
  }
}
