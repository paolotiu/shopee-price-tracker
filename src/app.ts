import express, { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import PassportLocal from "passport-local";
import bcrypt from "bcryptjs";

//Make console include timestamp
require("console-stamp")(console, { pattern: "[HH:MM:ss.l]" });

dotenv.config();
const app = express();

// Import routes
import IndexRouter from "./routes";
import User from "./models/User";

// Setup mongoDB connection
import "./config/mongo-connect";

// Setup middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup routes
app.use("/", IndexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "Endpoint not found"));
});

// error handler
app.use(
  (
    err: createError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // return error message
    res.status(err.status || 500);
    res.json(err.message);
  }
);

export default app;
