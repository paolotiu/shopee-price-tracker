import { RequestHandler } from 'express';
import User from '../models/User';

import { isAuth } from '../functions/util';

// Return all items tracked by user
export const checkItems: RequestHandler[] = [
  isAuth,
  async (req, res, next) => {
    const user = await User.findById(req.user?._id)
      .populate({
        path: 'items',
        populate: {
          path: 'item',
        },
      })
      .lean()
      .exec();

    return res.json(user?.items);
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
