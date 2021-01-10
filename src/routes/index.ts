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
    const id = jwt.verify(req.params.token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        if (err.name === 'SyntaxError') {
          return next(createHttpError(400, 'Not a valid token'));
        }
        return next(err);
      }
      if (hasId(decoded)) {
        return decoded.id;
      }
      return null;
    });
    const user = await User.findById(id).exec();
    await user?.updateOne({ isConfirmed: true }).exec();
    return res.json({ message: 'Email confirmed' });
  } catch (error) {
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
