import test, { expect } from "@playwright/test";
import { Header } from "../components/header.component";
import { HomePage } from "../pages/home.page";
import exp from "constants";
import { checkFullLink } from "../utils/chceckLink";

test.describe("Home Page", () => {
  let header: Header;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    homePage = new HomePage(page);

    await page.goto("https://dawidmikula.github.io/petStore/index.html");
  });

  test("Home - Hero", async ({ page }) => {
    await expect(homePage.heroFirstLine).toHaveText("Trade-in-offer");
    await expect(homePage.heroSecondLine).toHaveText("Super value deals");
    await expect(homePage.heroThirdLine).toHaveText("On all products");
    await expect(homePage.heroContent).toHaveText(
      "Save more with coupons & up to 70% off!"
    );
    await expect(homePage.heroLinkToShop).toHaveText("Shop Now");

    await homePage.heroLinkToShop.click();
    await expect(page).toHaveURL(
      "https://dawidmikula.github.io/petStore/shop.html"
    );
  });

  test("Home - Features", async ({ page }) => {
    const nazwy = [
      "Free Shipping",
      "Online Order",
      "Save Money",
      "Promotions",
      "Happy Sell",
      "24/7 Support",
    ];

    for (let i = 0; i <= 5; i++) {
      await expect(homePage.feature(i)).toBeVisible();
      await expect(homePage.featureImage(i)).toBeVisible();
      await expect(homePage.featureName(i)).toHaveText(`${nazwy[i]}`);
    }
  });

  test("Home - Featured products", async ({ page }) => {
    //
  });

  test("Home - Banner", async ({ page }) => {
    await expect(homePage.bannerHeader).toHaveText("Repair Services");
    await expect(homePage.bannerMainText).toHaveText(
      "Up to 70% Off - All Dog & Cats accesories"
    );
    await expect(homePage.bannerButton).toHaveText("Explore More");
  });

  test("Home - New Arrivals", async ({ page }) => {
    //
  });

  test("Home - Banner x3", async ({ page }) => {
    //
  });
});
