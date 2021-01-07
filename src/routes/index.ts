import express from "express";
const router = express.Router();
import { postItemLink } from "../controllers/scrapeControllers";
import { userRouter } from "./user";

router.get("/", (req, res, next) => {
  res.send("Hello World");
});

router.post("/scrape", postItemLink);
router.use("/user", userRouter);

export default router;
