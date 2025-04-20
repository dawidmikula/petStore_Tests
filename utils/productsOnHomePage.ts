import { Page } from "@playwright/test";

type Product = {
  img: boolean;
  categ: string;
  name: string;
  stars: number;
  price: string;
  link: boolean;
};

type ProductSelectors = {
  proBox: string;
  img: string;
  categ: string;
  name: string;
  stars: string;
  price: string;
  link: string;
};

export async function productsOnHomePage(
  page: Page,
  selectors: ProductSelectors
): Promise<Product[]> {
  return await page.evaluate((s) => {
    const products: Product[] = [];

    document.querySelectorAll(s.proBox).forEach((proBox) => {
      const img = !!proBox.querySelector(s.img);
      const categ =
        proBox.querySelector(s.categ)?.textContent?.trim() || "No category";
      const name =
        proBox.querySelector(s.name)?.textContent?.trim() || "No name";
      const stars = proBox.querySelectorAll(`${s.stars} .fa-star`).length || 0;
      const price =
        proBox.querySelector(s.price)?.textContent?.trim() || "No price";
      const link = !!proBox.querySelector(s.link);

      products.push({ img, categ, name, stars, price, link });
    });

    return products;
  }, selectors);
}
