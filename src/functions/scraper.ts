import puppeteer from "puppeteer";
import axios from "axios";
import { Item } from "../types/Item";
export const scrape = async (link: string): Promise<Item.RootObject> => {
  if (!link || !link.search("shopee.ph")) {
    throw new Error("Not a valid link");
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let result: Item.RootObject | undefined;

  // Enable to get website request
  await page.setRequestInterception(true);

  page.on("request", async (request) => {
    if (request.url().includes("shopee.ph/api/v2/item/get")) {
      const url = request.url();
      const { data } = await axios.get(url);
      result = data;
      request.abort();
      return;
    }

    request.continue();
  });

  await page.goto(link, {
    waitUntil: "networkidle0",
  });

  await browser.close();
  if (!result) {
    throw new Error("Error in scraping");
  }
  return result;
};
