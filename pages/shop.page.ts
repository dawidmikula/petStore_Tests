import { Page } from "@playwright/test";

export class ShopPage {
  constructor(private page: Page) {}

  // Shop Title
  shopHeader = this.page.locator("#page-header h2");
  shopDesc = this.page.locator("#page-header p");

  // Pagination
  goToPrevPage = this.page.locator("#pagination .prev");
  goToNextPage = this.page.locator("#pagination .next");
  private lastShopPage = this.page.locator("#pagination a");
  secondLastElement = this.lastShopPage.nth(-1);
}

// Shop Products
export const shopSelectors = {
  proBox: ".pro-container .pro",
  img: "img",
  categ: ".des span",
  name: ".des h5",
  stars: ".des .star",
  price: ".des h4",
  link: "a",
};
