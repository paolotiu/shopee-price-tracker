import { RequestHandler } from 'express';
import User from '../models/User';

import { isAuth } from '../functions/util';
import createHttpError from 'http-errors';
import { IItem } from '../models/Item';

// Return all items tracked by user
export const checkItems: RequestHandler[] = [
  isAuth,
  async (req, res, next) => {
    const { items } = await User.findById(req.user?._id, 'items -_id')
      .populate({
        path: 'items',
        populate: {
          path: 'item',
        },
      })
      .lean<{ items: { item: IItem }[] }>()
      .exec();

    return res.json(items);
  },
];

// Return one item by user

export const checkOneItem: RequestHandler[] = [
  isAuth,
  async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      return next(createHttpError(400, 'No id provided'));
    }

    const { items } = await User.findById(req.user?._id, 'items -_id')
      .populate({
        path: 'items',
        populate: {
          path: 'item',
        },
      })
      .lean<{ items: { item: IItem }[] }>()
      .exec();
    if (!items) {
      return next(createHttpError(400, 'No item matched'));
    }
    const item = items.filter(({ item }) => item.itemID === id)[0];
    if (!item) {
      return next(createHttpError(400, 'No item matched!'));
    }
    return res.json(item);
  },
];

export const getUser: RequestHandler[] = [
  isAuth,
  async (req, res, next) => {
    const user = req.user;
    return res.json({
      email: user?.email,
      items: user?.items,
    });
  },
];
