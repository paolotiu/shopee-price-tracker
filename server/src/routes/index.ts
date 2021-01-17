import express from 'express';
import User from '../models/User';
import { itemRouter } from './item';
import { userRouter } from './user';
import { authRouter } from './auth';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { object, string } from 'joi';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hello World');
});

router.use('/item', itemRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
export default router;

interface JWTPayload {
  id: string;
  iat: number;
  exp: number;
}
const hasId = (obj: { id?: string } | undefined): obj is JWTPayload => {
  return !!obj && !!obj.id;
};
