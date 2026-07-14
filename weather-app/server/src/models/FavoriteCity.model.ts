import mongoose, { Schema, Document } from 'mongoose';

export interface IFavoriteCity extends Document {
  sessionId: string;
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  addedAt: Date;
}

const FavoriteCitySchema = new Schema<IFavoriteCity>(
  {
    sessionId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    region: { type: String, default: '' },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

// Prevent duplicate favorites per session
FavoriteCitySchema.index({ sessionId: 1, name: 1, country: 1 }, { unique: true });

export const FavoriteCity = mongoose.model<IFavoriteCity>('FavoriteCity', FavoriteCitySchema);
