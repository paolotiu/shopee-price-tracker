import { scrape } from '../functions/scraper';
import { RequestHandler } from 'express';
import { updatePrices } from '../functions/updatePrices';
import Item, { IItem } from '../models/Item';
import { isAuth } from '../functions/util';
import User from '../models/User';
import { Schema } from 'mongoose';
import createHttpError from 'http-errors';
import { urlSchema } from './validation';

// User sends link then return item from that link
export const postItemLink: RequestHandler[] = [
  isAuth,
  async (req, res, next) => {
    let { link } = req.body;
    if (!link) return next({ message: 'No link provided', status: 400 });
    const existingItem = await Item.findOne({ urls: link }).lean().exec();

    // Validation check using joi
    const { error, value } = urlSchema.validate(link);
    if (error) {
      return next(createHttpError(400, error.message));
    }

    link = value;
    if (existingItem) {
      // Save to users items
      const message = await addItemToUser(req.user?.id, existingItem._id);

      return res.json({ ...existingItem, status: 'existing', message });
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
          const message = await addItemToUser(req.user?.id, updatedItem._id);

          return res.json({ ...updatedItem, status: 'updated', message });
        }

        // Shopee returns the price with 5 zeroes at the end
        const price_max = data.price_max / 10 ** 5;

        const item = new Item({
          name: data.name,
          itemID: data.itemid,
          shopID: data.shopid,
          price: price_max,
          api_url: `https://shopee.ph/api/v2/item/get?itemid=${data.itemid}&shopid=${data.shopid}`,
          description: data.description,
          onSale: !!data.price_before_discount,
          lowest_price: price_max,
          all_prices: [{ price: price_max, time: new Date() }],
          avg_rating: data.item_rating.rating_star,
          total_rating_count: data.item_rating.rating_count.reduce((acc, curr) => acc + curr, 0),
          urls: [link],
          likes: data.liked_count,
          views: data.view_count,
          normal_stock: data.normal_stock,
          stock: data.stock,
          free_shipping: data.show_free_shipping,
          sold: data.sold,
          historical_sold: data.historical_sold,

          discount_stock: data.discount_stock,
          discount: data.raw_discount,
        } as IItem);

        item.save(async (err, doc) => {
          if (err) return next(err);

          // Save to users items
          const message = await addItemToUser(req.user?.id, item._id);

          return res.json({ ...doc.toObject(), status: 'created', message });
        });
      })
      .catch((err) => {
        return next(err);
      });
  },
];

// Check item
export const checkItem: RequestHandler = async (req, res, next) => {
  const { itemid } = req.params;

  try {
    const item = await Item.findOne({ itemID: itemid }).lean().exec();
    if (!item) {
      return next(createHttpError(404, 'Item not found'));
    }

    return res.json({ item });
  } catch (error) {
    return next(error);
  }
};

// update Items
export const updateItemPrices: RequestHandler[] = [
  async (req, res, next) => {
    try {
      const { secret } = req.body;
      if (secret !== process.env.UPDATE_SECRET) {
        return res.status(403).json('Not allowed');
      }
      const response = await updatePrices();

      return res.json(response);
    } catch (error) {
      return next(error);
    }
  },
];

// Add target to item
export const addTarget: RequestHandler[] = [
  isAuth,
  async (req, res, next) => {
    const { itemid, target } = req.body;
    const userid = req.user?.id;

    try {
      // Update user item
      const user = await User.findOneAndUpdate(
        { _id: userid, 'items.item': itemid },
        { $set: { 'items.$.target': target } },
        { fields: { items: { item: itemid } }, projection: { _id: 0 } }
      )
        .lean()
        .exec();

      // Check if item exits
      if (user?.items[0]) {
        user.items[0].target = target;
      }

      if (!user) {
        // Return no item found if no item found
        return next(createHttpError(400, 'No item found'));
      }

      return res.json(user);
    } catch (err) {
      console.log(err);
      return next(createHttpError(400, 'Unable to update target'));
    }
  },
];

// Save to users items
async function addItemToUser(userid: Schema.Types.ObjectId, itemid: Schema.Types.ObjectId) {
  // const res = await User.findByIdAndUpdate(userid, {
  //   $addToSet: { items: { item: itemid } },
  // }).exec();

  const res = await User.findById(userid)
    .updateOne({
      $addToSet: { items: { item: itemid } },
    })
    .exec();

  if (res.nModified) {
    return 'Item added';
  } else {
    return 'You are already tracking this item';
  }
}
