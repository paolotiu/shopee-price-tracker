import express from "express";
const router = express.Router();
import { postItemLink } from "../controllers/scrapeControllers";

router.get("/", (req, res, next) => {
  res.send("Hello World");
});

router.post("/scrape", postItemLink);

export default router;
