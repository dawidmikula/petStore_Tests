import { Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}
  // Header - Hero
  heroFirstLine = this.page.locator("#hero h4");
  heroSecondLine = this.page.locator("#hero h2");
  heroThirdLine = this.page.locator("#hero h1");
  heroContent = this.page.locator("#hero p");
  heroLinkToShop = this.page.locator("#hero a");

  // Feature
  feature = (index: number) => page.locator("#feature div").nth(index);
  featureImage = (index: number) => page.locator("#feature div img").nth(index);
  featureName = (index: number) => page.locator("#feature div h6").nth(index);

  // Banner
  bannerHeader = this.page.locator("#banner h4");
  bannerMainText = this.page.locator("#banner h2");
  bannerButton = this.page.locator("#banner button");

  // Banner x3
  bannerX3Box = (index: number) =>
    page.locator("#banner3 .banner-box").nth(index);
  bannerX3Header = (index: number) => page.locator("#banner3 h2").nth(index);
  bannerX3Desc = (index: number) => page.locator("#banner3 h3").nth(index);
}

// // Featured Froducts
// export const featuredProductSelectors = {
//   proBox: "#product1-featured .pro-container .pro",
//   img: "img",
//   categ: ".des span",
//   name: ".des h5",
//   stars: ".des .star",
//   price: ".des h4",
//   link: "a",
// };

// // New Arrivals
// export const newArivalsSlectors = {
//   proBox: "#product1-new .pro-container .pro",
//   img: "img",
//   categ: ".des span",
//   name: ".des h5",
//   stars: ".des .star",
//   price: ".des h4",
//   link: "a",
// };

const baseProductSelectors = {
  img: "img",
  categ: ".des span",
  name: ".des h5",
  stars: ".des .star",
  price: ".des h4",
  link: "a",
};

export const featuredProductSelectors = {
  proBox: "#product1-featured .pro-container .pro",
  ...baseProductSelectors,
};

export const newArrivalsSelectors = {
  proBox: "#product1-new .pro-container .pro",
  ...baseProductSelectors,
};
