import { RequestHandler } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import createHttpError from 'http-errors';
import { isAuth } from '../functions/util';
import { signUpSchema } from './validation';
import jwt from 'jsonwebtoken';
import { sendConfirmationEmail } from '../config/nodemailer';

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
    if (user) return next(createHttpError(409, 'Email taken'));

    const newUser = new User({
      email: email,
      password: hash,
    });

    // Sign jwt

    jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1D' },
      (err, token) => {
        if (err) return next(err);
        sendConfirmationEmail(email, 'http://localhost:3001/confirmation/' + token);
        //Save user
        newUser.save((err) => {
          if (err) return next(err);
          return res.json({ message: 'Email sent' });
        });
      }
    );
  });
};

export const loginUser: RequestHandler[] = [
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        // return message
        return next(createHttpError(401, { message: info.message }));
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

// Resend confirmation email to user email
export const resendConfirmationEmail: RequestHandler = async (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email: email }).exec((err, user) => {
    if (err) return next(err);
    if (!user) return res.json({ message: 'Email not in database' });
    if (user.isConfirmed) return res.json({ message: 'User is already verified' });

    // Make another jwt then send to user email
    jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1D' },
      (err, token) => {
        if (err) return next(err);
        sendConfirmationEmail(email, 'http://localhost:3001/confirmation/' + token);
        //Save user
        user.save((err) => {
          if (err) return next(err);
          return res.json({ message: 'Email sent' });
        });
      }
    );
  });
};
