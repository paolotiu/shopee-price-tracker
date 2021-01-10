import { RequestHandler } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import createHttpError from 'http-errors';
import { isAuth } from '../functions/util';
import { signUpSchema } from './validation';
import jwt from 'jsonwebtoken';

export const signUpUser: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  const { error: validationError, value } = signUpSchema.validate({
    email,
    password,
  });

  if (validationError) {
    return next(createHttpError(403, validationError));
  }
  const hash = bcrypt.hashSync(password, 10);
  User.findOne({ email: email }).exec((err, user) => {
    if (err) return next(err);

    // If email taken
    if (user) return next(createHttpError(409, 'email taken'));

    const newUser = new User({
      email: email,
      password: hash,
    });

    // Sign jwt
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    //Save user
    newUser.save((err) => {
      if (err) return next(err);
      return res.json({ message: token });
    });
  });
};

export const loginUser: RequestHandler[] = [
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        // return message
        return res.json(info.message);
      }
      req.logIn(user, (err) => {
        if (err) return next(err);

        return res.json({
          email: user.email,
          items: user.items,
        });
      });
    })(req, res, next);
  },
];

// Return all items tracked by user
export const checkItems: RequestHandler[] = [
  isAuth,
  async (req, res, next) => {
    const user = await User.findById(req.user?._id).populate('items').lean().exec();

    return res.json(user?.items);
  },
];
