import User from '../models/User';
import '../models/Item';
import '../config/mongoDB';
import { IItem } from '../models/Item';
import { changePopulatedType } from './util';
import { sendTargetNotif } from '../config/nodemailer';
export const notifyUserTarget = async (itemid: string, price: number) => {
  const users = await User.find(
    {
      items: { $elemMatch: { item: itemid, target: { $gte: price } } },
    },
    null,
    {
      projection: { 'items.$': 1, email: 1 },
    }
  )
    .populate({
      path: 'items',
      populate: {
        path: 'item',
      },
    })
    .exec();
  if (!users.length) {
    return;
  }
  users.forEach((user) => {
    if (user.items[0] && user.items[0].target) {
      const item = changePopulatedType<IItem>(user.items[0].item);
      User.findOneAndUpdate(
        { _id: user._id, items: { $elemMatch: { item: itemid } } },
        {
          $unset: { 'items.$.target': '' },
        },
        { new: true }
      ).exec();

      sendTargetNotif(user.email, item.name, price, user.items[0].target);

      console.log('sent');
    }
  });
};
