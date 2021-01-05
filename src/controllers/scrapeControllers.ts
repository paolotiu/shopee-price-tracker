import { scrape } from "./../functions/scraper";
import { RequestHandler } from "express";
import Item from "../models/Item";
export const postItemLink: RequestHandler = async (req, res, next) => {
  const { link } = req.body;
  if (!link) return next({ message: "No link provided", status: 400 });
  const isExist = await Item.findOne({ urls: link }).exec();
  if (isExist) {
    return res.send("exists already");
  }
  scrape(link)
    .then((scraped) => {
      const data = scraped.item;
      // Shopee returns the price with 5 zeroes at the end
      const price_max = data.price_max / 10 ** 5;
      const item = new Item({
        name: data.name,
        itemID: data.itemid,
        shopID: data.shopid,
        price: price_max,
        api_url: `https://shopee.ph/api/v2/item/get?itemid=${data.itemid}&shopid=${data.shopid}`,
        all_prices: [{ price: price_max, time: Date.now() }],
        urls: [link],
      });

      item.save((err, doc) => {
        if (err) return next({ message: err.message });
        return res.json(doc);
      });
    })
    .catch((err: Error) => {
      return res.json({ error: err.message });
    });
};
