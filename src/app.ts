import express, { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// Import routes
import IndexRouter from "./routes";

// Setup mongoDB connection
const DB_URL = process.env.DB_URL as string;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((e) => console.log(e));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));

// Setup middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup routes
app.use("/", IndexRouter);

app.use((req, res, next) => {
  return res.json("JIFJIEJ");
});
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
