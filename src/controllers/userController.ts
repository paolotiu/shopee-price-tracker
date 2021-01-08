import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import passport from "passport";
import createHttpError from "http-errors";
export const signUpUser: RequestHandler = (req, res, next) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);
  User.findOne({ username: username }).exec((err, user) => {
    if (err) return next(err);

    // If username taken
    if (user) return next(createHttpError(409, "username taken"));

    const newUser = new User({
      username: username,
      password: hash,
    });

    //Save user
    newUser.save((err) => {
      if (err) return next(err);
      return res.json({ message: "Successfully signed in" });
    });
  });
};

export const loginUser: RequestHandler[] = [
  passport.authenticate("local", { failWithError: true }),
  (req, res, next) => {
    res.json({
      username: req.user,
    });
  },
];

const loginFailed: RequestHandler = (req, res, next) => {
  return res.json({ error: "failed" });
};
