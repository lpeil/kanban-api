import { Schema } from 'mongoose';

export const ListSchema = new Schema(
  {
    name: String,
    color: String,
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Card',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'lists',
  },
);
