import { PassportStatic } from 'passport';
import PassportLocal from 'passport-local';
import PassportGoogle from 'passport-google-oauth2';
import PassportFacebook from 'passport-facebook';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export default function passportConfig(passport: PassportStatic) {
  // Local Strategy
  passport.use(
    new PassportLocal.Strategy(
      {
        usernameField: 'email',
        // passReqToCallback: true
      },
      (email, password, done) => {
        User.findOne({ email: email }).exec((err, user) => {
          if (err) return done(err);
          if (!user) {
            return done(null, false, { message: 'No user found' });
          }

          if (!user.isConfirmed) {
            return done(null, false, { message: 'Confirm your email addrress' });
          }

          const isValid = bcrypt.compareSync(password, user.password);

          if (!isValid) {
            return done(null, false, { message: 'Incorrect email or password.' });
          }

          return done(null, user);
        });
      }
    )
  );

  // Google Oauth2 Strategy
  passport.use(
    new PassportGoogle.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL:
          process.env.GOOGLE_OAUTH_CALLBACK || 'http://localhost:3001/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile.email }).exec((err, user) => {
          if (err) return done(err);

          if (user) {
            return done(null, user);
          } else {
            new User({
              email: profile.email,
              google: {
                id: profile.id,
                email: profile.email,
              },
            }).save((err, user) => {
              return done(err, user);
            });
          }
        });
      }
    )
  );

  // Facebook Oauth2 Strategy
  passport.use(
    new PassportFacebook.Strategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        callbackURL:
          process.env.FACEBOOK_OAUTH_CALLBACK || 'http://localhost:3001/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name'],
      },
      (accessToken, refreshToken, profile, done) => {
        if (!profile.emails) return done(null, false, 'No email attached with profile');
        const email = profile.emails[0].value;
        User.findOne({ email }).exec((err, user) => {
          if (err) return done(err);

          if (user) {
            return done(null, user);
          } else {
            new User({
              email: email,
            }).save((err, user) => {
              return done(err, user);
            });
          }
        });
      }
    )
  );

  passport.serializeUser((user: Express.User, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser((user_id, done) => {
    User.findById(user_id, { password: false }).exec((err, user) => {
      if (err) return done(err);

      return done(null, user!);
    });
  });
}
