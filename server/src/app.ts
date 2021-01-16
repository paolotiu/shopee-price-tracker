import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import Connect from 'connect-mongo';
import mongoose from 'mongoose';
import cors from 'cors';
// Setup routes
import IndexRouter from './routes';

const MongoStore = Connect(session);

// Make console include timestamp
require('console-stamp')(console, { pattern: '[HH:MM:ss.l]' });

// Set env files
dotenv.config();

// Make app
const app = express();

// Setup mongoDB connection
require('./config/mongoDB');

// Setup middlewares
app.use(logger('dev'));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'mysecret',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    name: 'spt-jar',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup passport
import configPassport from './config/passport';
configPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', IndexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Endpoint not found'));
});

// error handler
app.use((err: createError.HttpError, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'AuthenticationError' && err.message === 'Bad Request') {
    return res.status(403).json('No username or password provided');
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return error message
  res.status(err.status || 500);
  res.json({ code: err.status, message: err.message });
});

export default app;
