import mongoose, { Schema, Document } from 'mongoose';

export interface ISearchHistory extends Document {
  sessionId: string;
  query: string;
  searchedAt: Date;
}

const SearchHistorySchema = new Schema<ISearchHistory>(
  {
    sessionId: { type: String, required: true, index: true },
    query: { type: String, required: true },
    searchedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

// TTL — auto-expire search history after 7 days
SearchHistorySchema.index({ searchedAt: 1 }, { expireAfterSeconds: 604800 });

export const SearchHistory = mongoose.model<ISearchHistory>('SearchHistory', SearchHistorySchema);
