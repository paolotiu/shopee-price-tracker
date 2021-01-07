import passport from "passport";
import PassportLocal from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User";

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
