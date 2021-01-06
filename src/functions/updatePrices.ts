import Item from "../models/Item";
import { Item as I } from "../types/Item";
import cron from "node-cron";
import axios from "axios";

export const updatePrices = async () => {
  const items = await Item.find().exec();
  try {
    await Promise.all(
      items.map(async (item) => {
        const url = item.api_url;
        const { data } = await axios.get<I.RootObject>(url);
        const price = data.item.price_max / 10 ** 5;

        item
          .updateOne({
            price: price,
            $push: { all_prices: { price: price, time: new Date() } },
          })
          .exec();

        item
          .updateOne({
            price: price,
            $push: { all_prices: { price: price, time: new Date() } },
          })
          .exec();
      })
    );

    return { status: "updated" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};
let count = 0;

//Cron Job
const task = cron.schedule(" */15 * * * * *", async () => {
  const res = await updatePrices();
  console.log("Updated");
  if (res.status === "error") {
    console.log(res.message);
    task.destroy();
  }
});
