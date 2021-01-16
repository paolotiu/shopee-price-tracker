import express from 'express';
import User from '../models/User';
import { itemRouter } from './item';
import { userRouter } from './user';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { object, string } from 'joi';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hello World');
});

router.get('/confirmation/:token', async (req, res, next) => {
  try {
    const { id, email } = jwt.verify(req.params.token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };
    const user = await User.findById(id).exec();
    if (user?.isConfirmed) {
      return res.status(400).json({ code: 400, message: 'User already verified', email });
    }
    await user?.updateOne({ isConfirmed: true }).exec();
    return res.json({ message: 'Email confirmed', email });
  } catch (error) {
    if (error.message === 'invalid signature') {
      error.status = 400;
    } else if (error.message === 'jwt expired') {
      error.status = 400;
      error.message = 'Token expired';
    }

    return next(error);
  }
});
router.use('/item', itemRouter);
router.use('/user', userRouter);

export default router;

interface JWTPayload {
  id: string;
  iat: number;
  exp: number;
}
const hasId = (obj: { id?: string } | undefined): obj is JWTPayload => {
  return !!obj && !!obj.id;
};
