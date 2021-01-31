import { RequestHandler } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import createHttpError from 'http-errors';
import { signUpSchema } from './validation';
import jwt from 'jsonwebtoken';
import { sendConfirmationEmail, sendPasswordReset } from '../config/nodemailer';

export const signUpUser: RequestHandler = (req, res, next) => {
  const { email, password, callbackUrl } = req.body;
  const { error: validationError } = signUpSchema.validate({
    email,
    password,
    callbackUrl,
  });

  if (validationError) {
    return next(createHttpError(403, validationError));
  }
  User.findOne({ email: email }).exec((err, user) => {
    if (err) return next(err);

    // If email taken and confirmed
    if (user && user?.isConfirmed) return next(createHttpError(409, 'Email taken'));
    // If email taken but not confirmed
    if (user) {
      try {
        (async () => {
          await user.updateOne({ password: password }).exec();
        })();
      } catch (error) {
        return next(error);
      }

      return next(createHttpError(409, 'Email not yet confirmed'));
    }
    const newUser = new User({
      email: email,
      password: password,
    });

    // Sign jwt

    jwt.sign(
      {
        id: newUser._id,
        email: email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1D' },
      (err, token) => {
        if (err) return next(err);
        sendConfirmationEmail(email, callbackUrl + token);
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

// Resend confirmation email to user email
export const resendConfirmationEmail: RequestHandler = async (req, res, next) => {
  const { email, callbackUrl } = req.body;

  User.findOne({ email: email }).exec((err, user) => {
    if (err) return next(err);
    if (!user) return next(createHttpError(400, "User hasn't signed up"));
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
        sendConfirmationEmail(email, callbackUrl + token);
        //Save user
        user.save((err) => {
          if (err) return next(err);
          return res.json({ message: 'Email sent' });
        });
      }
    );
  });
};

// Confirm email
export const confirmEmail: RequestHandler = async (req, res, next) => {
  try {
    const { id, email } = jwt.verify(req.params.token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };

    if (typeof id !== 'string') {
      return next(createHttpError(403, 'Invalid token'));
    }
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

    return next(createHttpError(500, 'Invalid token'));
  }
};

// Google auth
export const googleAuth: RequestHandler = passport.authenticate('google', {
  scope: ['email', 'profile'],
});

// Google callback
export const googleCallback: RequestHandler[] = [
  passport.authenticate('google', {
    failureRedirect: `${process.env.APP_URL || 'http://localhost:3000'}/login`,
  }),
  (req, res) => {
    res.redirect(`${process.env.APP_URL || 'http://localhost:3000'}/home`);
  },
];

// Facebook oauth
export const facebookAuth: RequestHandler = passport.authenticate('facebook', { scope: ['email'] });

// Facebook callback
export const facebookCallback: RequestHandler[] = [
  passport.authenticate('facebook', {
    failureRedirect: `${process.env.APP_URL || 'http://localhost:3000'}/login`,
  }),
  (req, res) => {
    res.redirect(`${process.env.APP_URL || 'http://localhost:3000'}/home`);
  },
];

export const oauthFail: RequestHandler = (req, res) => {
  return res.json('Login Failed');
};

export const forgetPassword: RequestHandler = async (req, res, next) => {
  const { email, callbackUrl } = req.body;
  if (!email) {
    return next(createHttpError(400, 'Email required'));
  } else if (!callbackUrl) {
    return next(createHttpError(400, 'callbackUrl required'));
  }
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) return next(createHttpError(401, 'User not found'));
    // generate and set password token
    user.generatePasswordReset();

    const savedUser = await user.save();

    const link = callbackUrl + savedUser.resetPasswordToken;
    await sendPasswordReset(user.email, link);
    return res.json({ message: 'email has been sent', token: user.resetPasswordToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const reset: RequestHandler = (req, res, next) => {
  const { token } = req.params;
  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }).exec(
    (err, user) => {
      if (err) return next(err);
      if (!user) return next(createHttpError(401, 'Token is invalid or expired'));
    }
  );
};

export const resetPassword: RequestHandler = (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;
  if (!password) {
    return next(createHttpError(400, 'Password is required'));
  }
  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }).exec(
    (err, user) => {
      if (err) return next(err);
      if (!user) return next(createHttpError(401, 'Token is invalid or expired'));

      //Set the new password
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      //Save
      user.save((err) => {
        if (err) return next(err);
        res.json({ message: 'Your password has been changed' });
      });
    }
  );
};
