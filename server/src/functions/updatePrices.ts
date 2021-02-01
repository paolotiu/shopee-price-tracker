import Item from '../models/Item';
import { Item as I } from '../types/Item';
import cron from 'node-cron';
import axios from 'axios';
import { sendTargetNotif } from '../config/nodemailer';
import { notifyUserTarget } from './notifyUserTarget';
export const updatePrices = async () => {
  try {
    const items = await Item.find().exec();

    await Promise.all(
      items.map(async (item) => {
        const url = item.api_url;
        const { data } = await axios.get<I.RootObject>(url);
        const price = data.item.price_max / 10 ** 5;
        const lowest = item.lowest_price <= price ? item.lowest_price : price;
        const item_data = data.item;
        const res = await item.updateOne({
          price: price,
          onSale: !!item_data.price_before_discount,
          name: item_data.name,
          avg_rating: item_data.item_rating.rating_star,
          total_rating_count: item_data.item_rating.rating_count.reduce(
            (acc, curr) => acc + curr,
            0
          ),
          description: item_data.description,
          likes: item_data.liked_count,
          views: item_data.view_count,
          normal_stock: item_data.view_count,
          discount_stock: item_data.discount_stock,
          stock: item_data.stock,
          discount: item_data.raw_discount,
          free_shipping: item_data.show_free_shipping,
          sold: item_data.sold,
          historical_sold: item_data.historical_sold,
          lowest_price: lowest,

          $push: { all_prices: { price: price, time: new Date() } },
        });
        if (item.price !== price) {
          notifyUserTarget(item.id, price);
        }
      })
    );

    return { status: 'updated' };
  } catch (err) {
    return { status: 'error', message: err.message };
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
