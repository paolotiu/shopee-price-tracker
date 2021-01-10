import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

export const isAuth: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(createHttpError(401, 'Unauthorized'));
};
