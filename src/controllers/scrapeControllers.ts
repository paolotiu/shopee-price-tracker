import { scrape } from "./../functions/scraper";
import { RequestHandler } from "express";
import { updatePrices } from "../functions/updatePrices";
import Item from "../models/Item";
export const postItemLink: RequestHandler = async (req, res, next) => {
  const { link } = req.body;
  if (!link) return next({ message: "No link provided", status: 400 });
  const existingDoc = await Item.findOne({ urls: link }).exec();
  if (existingDoc) {
    return res.json({ ...existingDoc.toObject(), status: "existing" });
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
      ).exec();

      if (updatedItem) {
        return res.json({ ...updatedItem.toObject(), status: "updated" });
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

      item.save((err, doc) => {
        if (err) return next(err);
        return res.json({ ...doc.toObject(), status: "created" });
      });
    })
    .catch((err) => {
      return next(err);
    });
};

export const updateItemPrices: RequestHandler = async (req, res, next) => {
  const response = await updatePrices();

  return res.json(response);
};
