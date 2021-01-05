import { scrape } from "./../functions/scraper";
import { RequestHandler } from "express";

export const postItemLink: RequestHandler = async (req, res, next) => {
  const { link } = req.body;
  if (!link) return next({ message: "No link provided", status: 400 });

  scrape(link)
    .then((data) => {
      return res.json(data);
    })
    .catch((err: Error) => {
      return res.json({ error: err.message });
    });
};
