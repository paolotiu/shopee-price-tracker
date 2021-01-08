import { scrape } from "../functions/scraper";
import { RequestHandler } from "express";
import { updatePrices } from "../functions/updatePrices";
import Item from "../models/Item";
import { isAuth } from "../functions/util";
import User from "../models/User";
import { Schema } from "mongoose";

export const postItemLink: RequestHandler[] = [
  isAuth,
  async (req, res, next) => {
    const { link } = req.body;
    if (!link) return next({ message: "No link provided", status: 400 });
    const existingItem = await Item.findOne({ urls: link }).lean().exec();
    if (existingItem) {
      // Save to users items
      await addItemToUser(req.user?.id, existingItem._id);

      return res.json({ ...existingItem, status: "existing" });
    }

    scrape(link)
      .then(async (scraped) => {
        const data = scraped.item;

        // If item with the same id exsist return that
        const updatedItem = await Item.findOneAndUpdate(
          {
            shopID: data.shopid,
            itemID: data.itemid,
          },
          { $push: { urls: link } },
          { new: true }
        )
          .lean()
          .exec();

        if (updatedItem) {
          // Save to users items
          await addItemToUser(req.user?.id, updatedItem._id);

          return res.json({ ...updatedItem, status: "updated" });
        }

        // Shopee returns the price with 5 zeroes at the end
        const price_max = data.price_max / 10 ** 5;
        const item = new Item({
          name: data.name,
          itemID: data.itemid,
          shopID: data.shopid,
          price: price_max,
          api_url: `https://shopee.ph/api/v2/item/get?itemid=${data.itemid}&shopid=${data.shopid}`,
          all_prices: [{ price: price_max, time: new Date() }],
          urls: [link],
        });

        item.save(async (err, doc) => {
          if (err) return next(err);

          // Save to users items
          await addItemToUser(req.user?.id, item._id);

          return res.json({ ...doc.toObject(), status: "created" });
        });
      })
      .catch((err) => {
        return next(err);
      });
  },
];

export const updateItemPrices: RequestHandler = async (req, res, next) => {
  const response = await updatePrices();

  return res.json(response);
};

async function addItemToUser(userid: Schema.Types.ObjectId, itemid: string) {
  // Save to users items
  await User.findByIdAndUpdate(userid, {
    $addToSet: { items: itemid },
  }).exec();
}
