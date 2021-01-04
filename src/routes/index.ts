import { scrape } from "./../functions/scraper";
import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Hello World");
});

router.post("/scrape", (req, res, next) => {
  const { link } = req.body;
  scrape(link)
    .then((data) => {
      return res.json(data);
    })
    .catch((err: Error) => {
      return res.json({ error: err.message });
    });
});

export default router;
