import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { connectDB } from './config/db';
import { globalLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import weatherRoutes from './routes/weather.routes';
import favoritesRoutes from './routes/favorites.routes';

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(globalLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/weather', weatherRoutes);
app.use('/api/favorites', favoritesRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Error Handler (must be last) ─────────────────────────────────────────────
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────
async function bootstrap(): Promise<void> {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`🚀  Server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
  });
}

bootstrap();

export default app;
