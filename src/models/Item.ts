import { requireType } from "./functions";
import { Schema, model, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  itemID: string;
  shopID: string;
  price: number;
  api_url: string;
  all_prices: [{ price: number; time: Date }];
  urls: string[];
}

const ItemSchema: Schema = new Schema({
  name: requireType(String),
  itemID: requireType(String),
  shopID: requireType(String),
  price: requireType(Number),
  api_url: requireType(String),
  all_prices: [
    {
      price: requireType(Number),
      time: { type: Date, default: new Date() },
    },
  ],
  urls: [{ type: String }],
});

export default model<IItem>("Item", ItemSchema);
