import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

export const isAuth: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(createHttpError(401, 'Unauthorized'));
};

export const isAdmin: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated() && req.user.username === 'paolo') {
    return next();
  }

  return next(createHttpError(401, 'Unauthorized'));
};
