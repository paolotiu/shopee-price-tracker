import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
export const signUpUser: RequestHandler = (req, res, next) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);
  User.findOne({ username: username }).exec((err, user) => {
    if (err) return next(err);

    // If username taken
    if (user)
      return next({
        message: "Username taken",
        status: "403",
      });

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
