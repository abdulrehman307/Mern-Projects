import mongoose, { Schema, Document } from 'mongoose';
import { WeatherData } from '../types/weather.types';

export interface IWeatherCache extends Document {
  cacheKey: string; // normalized city name or "lat,lon"
  data: WeatherData;
  createdAt: Date;
}

const WeatherCacheSchema = new Schema<IWeatherCache>(
  {
    cacheKey: { type: String, required: true, unique: true, index: true },
    data: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

// TTL index — MongoDB will auto-delete documents 600 seconds (10 min) after createdAt
WeatherCacheSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

export const WeatherCache = mongoose.model<IWeatherCache>('WeatherCache', WeatherCacheSchema);
