import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { Schema } from 'mongoose';

export const isAuth: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(createHttpError(401, 'Unauthorized'));
};

export const changePopulatedType = <T>(populatedId: Schema.Types.ObjectId) => {
  return (populatedId as unknown) as T;
};
