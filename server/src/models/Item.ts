import { requireType } from './functions';
import { Schema, model, Document } from 'mongoose';
import { number } from 'joi';

export interface IItem extends Document {
  name: string;
  itemID: string;
  shopID: string;
  price: number;
  api_url: string;
  description: string;
  all_prices: [{ price: number; time: Date }];
  onSale: boolean;
  avg_rating: number;
  total_rating_count: number;
  urls: string[];
}

const ItemSchema: Schema = new Schema({
  name: requireType(String),
  itemID: requireType(String),
  shopID: requireType(String),
  price: requireType(Number),
  api_url: requireType(String),
  description: requireType(String),
  onSale: requireType(Boolean),
  avg_rating: requireType(Number),
  total_rating_count: requireType(Number),
  all_prices: [
    {
      price: requireType(Number),
      time: { type: Date, default: new Date() },
      _id: false,
    },
  ],
  urls: [{ type: String }],
});

export default model<IItem>('Item', ItemSchema);
