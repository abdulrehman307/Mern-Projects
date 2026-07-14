import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { FavoriteCity } from '../models/FavoriteCity.model';
import { createError } from '../middleware/errorHandler';

const addFavoriteSchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  region: z.string().default(''),
  lat: z.number(),
  lon: z.number(),
});

type AddFavoriteBody = z.infer<typeof addFavoriteSchema>;

function getSessionId(req: Request): string {
  const sid = req.headers['x-session-id'] as string | undefined;
  if (!sid) throw createError('X-Session-ID header is required', 400);
  return sid;
}

/** GET /api/favorites — list all favorites for this session */
export async function getFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const sessionId = getSessionId(req);
    const favorites = await FavoriteCity.find({ sessionId }).sort({ addedAt: -1 }).lean();
    res.json({ success: true, data: favorites });
  } catch (err) {
    next(err);
  }
}

/** POST /api/favorites — add a favorite city */
export async function addFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const sessionId = getSessionId(req);
    const parsed = addFavoriteSchema.safeParse(req.body);

    if (!parsed.success) {
      return next(createError('Invalid request body', 400));
    }

    const body: AddFavoriteBody = parsed.data;

    const favorite = await FavoriteCity.findOneAndUpdate(
      { sessionId, name: body.name, country: body.country },
      { ...body, sessionId, addedAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, data: favorite });
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/favorites/:id — remove a favorite by Mongo _id */
export async function removeFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const sessionId = getSessionId(req);
    const { id } = req.params;

    const deleted = await FavoriteCity.findOneAndDelete({ _id: id, sessionId });
    if (!deleted) {
      return next(createError('Favorite not found', 404));
    }

    res.json({ success: true, message: 'Favorite removed' });
  } catch (err) {
    next(err);
  }
}
