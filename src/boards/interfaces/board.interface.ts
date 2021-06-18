import { Document } from 'mongoose';

export interface Board extends Document {
  name: string;
  icon: {
    name: string;
    color: string;
  };
  list: Array<string>;
}
