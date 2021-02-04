import puppeteer from 'puppeteer';
import axios from 'axios';
import { Item } from '../types/Item';
export const scrape = async (link: string): Promise<Item.RootObject> => {
  if (!link || !link.search('shopee.ph')) {
    throw new Error('Not a valid link');
  }
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--headless', '--disable-gpu'],
  });
  const page = await browser.newPage();
  let result: Item.RootObject | undefined | null;
  let closed = false;
  // Enable to get website request
  await page.setRequestInterception(true);

  page.on('request', async (request) => {
    if (request.url().includes('shopee.ph/api/v2/item/get')) {
      const url = request.url();
      const { data } = await axios.get<Item.RootObject>(url);
      result = data;
      closed = true;
      await request.abort();
      if (!data.item) {
        result = null;
      }
      await page.close();
      await browser.close();
      return;
    }

    await request.continue();
  });

  await page
    .goto(link, {
      waitUntil: 'networkidle2',
    })
    .catch((e) => {});

  if (!closed) {
    await browser.close();
  }

  if (result === undefined) {
    throw new Error('Error in scraping');
  } else if (result === null) {
    throw new Error('No item found');
  }
  return result;
};
