import { Document } from 'mongoose';

export interface List extends Document {
  name: string;
  color: string;
  cards: Array<string>;
}
