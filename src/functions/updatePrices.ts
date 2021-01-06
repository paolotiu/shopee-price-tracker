import Item from "../models/Item";
import { Item as I } from "../types/Item";

import axios from "axios";

export const updatePrices = async () => {
  const items = await Item.find().exec();
  try {
    items.forEach(async (item) => {
      const url = item.api_url;
      const { data } = await axios.get<I.RootObject>(url);
      const price = data.item.price_max / 10 ** 5;
      item
        .updateOne({
          price: price,
          $push: { all_prices: { price: price, time: new Date() } },
        })
        .exec();
    });
  } catch (err) {
    return { status: "error", message: err.message };
  }

  return { status: "updated" };
};
