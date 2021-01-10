import express from 'express';
import User from '../models/User';
import { itemRouter } from './item';
import { userRouter } from './user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hello World');
});

router.get('/confirmation/:token', async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.params.token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const user = await User.findById(id).exec();
    user?.updateOne({ isConfirmed: true });
  } catch (error) {
    return next(error);
  }
});
router.use('/item', itemRouter);
router.use('/user', userRouter);

export default router;
