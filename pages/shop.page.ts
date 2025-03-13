import { Page } from "@playwright/test";

export class ShopPage {
  constructor(private page: Page) {}
  shopHeader = this.page.locator("#page-header h2");
  shopDesc = this.page.locator("#page-header p");

  goToPrevPage = this.page.locator("#pagination .prev");
  goToNextPage = this.page.locator("#pagination .next");
}

export const shopSelectors = {
  proBox: ".pro-container .pro",
  img: "img",
  categ: ".des span",
  name: ".des h5",
  stars: ".des .star",
  price: ".des h4",
  link: "a",
};
