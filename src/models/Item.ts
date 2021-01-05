import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
  name: String,
  itemID: String,
  shopID: String,
  price: String,
  all_prices: [
    {
      price: String,
      time: Date,
    },
  ],
  links: [{ type: String }],
});

export default model("Item", ItemSchema);
