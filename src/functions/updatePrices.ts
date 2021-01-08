import Item from "../models/Item";
import { Item as I } from "../types/Item";
import cron from "node-cron";
import axios from "axios";

export const updatePrices = async () => {
  try {
    const items = await Item.find().exec();

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

// //Cron Job
// const task = cron.schedule(" */15 * * * *", async () => {
//   const res = await updatePrices();
//   if (res.status === "error") {
//     console.log("\x1b[31m%s\x1b[0m", "Destroying update task");
//     console.log(res.message);
//     task.destroy();
//   } else {
//     console.log("\x1b[32m%s\x1b[0m", "Updated");
//   }
// });
