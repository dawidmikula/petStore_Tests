import { Page } from "@playwright/test";
import { shopSelectors } from "../pages/shop.page";

type ShopProduct = {
  img: boolean;
  categ: string;
  name: string;
  stars: number;
  price: string;
  link: boolean;
};

export async function getShopProducts(page: Page): Promise<ShopProduct[]> {
  return await page.evaluate((selectors) => {
    const products: ShopProduct[] = [];

    document.querySelectorAll(selectors.proBox).forEach((proBox) => {
      const img = !!proBox.querySelector(selectors.img);
      const categ =
        proBox.querySelector(selectors.categ)?.textContent?.trim() ||
        "No category";
      const name =
        proBox.querySelector(selectors.name)?.textContent?.trim() || "No name";
      const stars =
        proBox.querySelectorAll(`${selectors.stars} .fa-star`).length || 0;
      const price =
        proBox.querySelector(selectors.price)?.textContent?.trim() ||
        "No price";
      const link = !!proBox.querySelector(selectors.link);

      products.push({ img, categ, name, stars, price, link });
    });

    return products;
  }, shopSelectors);
}
