import { PassportStatic } from 'passport';
import PassportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export default function passportConfig(passport: PassportStatic) {
  passport.use(
    new PassportLocal.Strategy(
      {
        usernameField: 'email',
        // passReqToCallback: true
      },
      (username, password, done) => {
        User.findOne({ email: username }).exec((err, user) => {
          if (err) return done(err);
          if (!user) {
            return done(null, false, { message: 'No user found' });
          }

          if (!user.isConfirmed) {
            return done(null, false, { message: 'Confirm your email addrress' });
          }

          const isValid = bcrypt.compareSync(password, user.password);

          if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        });
      }
    )
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
