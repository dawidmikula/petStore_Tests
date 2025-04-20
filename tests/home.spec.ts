import test, { expect } from "@playwright/test";
import {
  featuredProductSelectors,
  HomePage,
  newArrivalsSelectors,
} from "../pages/home.page";
import { productsOnHomePage } from "../utils/productsOnHomePage";

test.describe("Home Page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
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
    const names = [
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
      await expect(homePage.featureName(i)).toHaveText(`${names[i]}`);
    }
  });

  test("Home - Featured products", async ({ page }) => {
    await expect(homePage.featuredProductsHeader).toHaveText(
      "Featured Products"
    );
    await expect(homePage.featuredProductsDesc).toHaveText(
      "Summer Collection New Modern Design"
    );

    let allFeaturedProducts: allFeaturedProducts[] = [];

    const homePageProducts = await productsOnHomePage(
      page,
      featuredProductSelectors
    );
    expect(homePageProducts.length).toBeGreaterThan(7);
    expect(homePageProducts.length).toBeLessThan(9);

    allFeaturedProducts = [...allFeaturedProducts, ...homePageProducts];

    for (const product of allFeaturedProducts) {
      await expect(product).not.toBe(false);
      await expect(product.categ).not.toBe("No category");
      await expect(product.name).not.toBe("No name");
      await expect(product.stars).not.toBe(0);
      await expect(product.price).not.toBe("No price");
      await expect(product.link).not.toBe(false);
    }
  });

  test("Home - Banner", async ({ page }) => {
    await expect(homePage.bannerHeader).toHaveText("Repair Services");
    await expect(homePage.bannerMainText).toHaveText(
      "Up to 70% Off - All Dog & Cats accesories"
    );
    await expect(homePage.bannerButton).toHaveText("Explore More");
  });

  test("Home - New Arrivals", async ({ page }) => {
    await expect(homePage.newArrivalsHeader).toHaveText("New Arrivals");
    await expect(homePage.newArrivalsDesc).toHaveText(
      "Summer Collection New Modern Design"
    );

    let allNewArrivalsProducts: allNewArrivalsProducts[] = [];

    const homePageProducts = await productsOnHomePage(
      page,
      newArrivalsSelectors
    );
    expect(homePageProducts.length).toBeGreaterThan(7);
    expect(homePageProducts.length).toBeLessThan(9);

    allNewArrivalsProducts = [...allNewArrivalsProducts, ...homePageProducts];

    for (const product of allNewArrivalsProducts) {
      await expect(product).not.toBe(false);
      await expect(product.categ).not.toBe("No category");
      await expect(product.name).not.toBe("No name");
      await expect(product.stars).not.toBe(0);
      await expect(product.price).not.toBe("No price");
      await expect(product.link).not.toBe(false);
    }
  });

  test("Home - Banner x3", async ({ page }) => {
    const bannerX3 = new Map<string, string>([
      ["SEASONAL SALE", "Winter Collection -50% OFF"],
      ["NEW DOG COLLECTION", "Spring / Summer 2023"],
      ["CAT TOYS", "New Trendy Prints"],
    ]);

    for (let i = 0; i <= 2; i++) {
      await expect(homePage.bannerX3Box(i)).toBeVisible();
      await expect(homePage.bannerX3Header(i)).toHaveText(
        [...bannerX3.keys()][i]
      );
      await expect(homePage.bannerX3Desc(i)).toHaveText(
        [...bannerX3.values()][i]
      );
    }
  });
});
