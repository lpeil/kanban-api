import { Schema } from 'mongoose';

export const CardSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    collection: 'cards',
  },
);
