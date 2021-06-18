import { Schema } from 'mongoose';

export const BoardSchema = new Schema(
  {
    name: String,
    icon: {
      name: String,
      color: String,
    },
    list: [
      {
        type: Schema.Types.ObjectId,
        ref: 'List',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'boards',
  },
);
