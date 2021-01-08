import { PassportStatic } from "passport";
import PassportLocal from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User";

export function passportConfig(passport: PassportStatic) {
  passport.use(
    new PassportLocal.Strategy((username, password, done) => {
      User.findOne({ username: username }).exec((err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      });
    })
  );

  passport.serializeUser((user: Express.User, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((user_id, done) => {
    User.findById(user_id).exec((err, user) => {
      if (err) return done(err);

      return done(null, user!);
    });
  });
}
