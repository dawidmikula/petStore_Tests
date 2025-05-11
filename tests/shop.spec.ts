import test, { expect } from "@playwright/test";
import { Header } from "../components/header.component";
import { ShopPage, shopSelectors } from "../pages/shop.page";
import { getShopProducts } from "../utils/shopContent";

test.describe("Shop Page", () => {
  let header: Header;
  let shopPage: ShopPage;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    shopPage = new ShopPage(page);

    await page.goto("");
    await header.shopButton.click();
  });

  test("Shop - check text and pages functionality", async ({ page }) => {
    await expect(shopPage.shopHeader).toHaveText("STORE");
    await expect(shopPage.shopDesc).toHaveText("Take care of your pet");

    await expect(shopPage.goToPrevPage).toHaveClass("prev disabled");
    await expect(shopPage.goToNextPage).toHaveClass("next");
    await shopPage.secondLastElement.click();
    await expect(shopPage.goToPrevPage).toHaveClass("prev");
    await expect(shopPage.goToNextPage).toHaveClass("next disabled");
  });

  test("Shop - check all products", async ({ page }) => {
    const paginationLinks = await page.$$eval("#pagination a", (links) =>
      links
        .map((link) => link.textContent?.trim())
        .filter((text) => text && !isNaN(Number(text)))
        .map(Number)
    );

    const lastPageNumber =
      paginationLinks.length > 0 ? Math.max(...paginationLinks) : 0;

    let allProducts: AllProducts[] = [];

    for (let p = 1; p <= lastPageNumber; p++) {
      const shopProducts = await getShopProducts(page);
      expect(shopProducts.length).toBeGreaterThan(0);
      expect(shopProducts.length).toBeLessThan(9);

      allProducts = [...allProducts, ...shopProducts];

      if (p < lastPageNumber) {
        await shopPage.goToNextPage.click();
        await page.waitForSelector(shopSelectors.proBox, { state: "visible" });
      }
    }

    expect(allProducts.length).toBeGreaterThan((lastPageNumber - 1) * 8);
    expect(allProducts.length).toBeLessThan(lastPageNumber * 8 + 1);

    for (const product of allProducts) {
      await expect(product).not.toBe(false);
      await expect(product.categ).not.toBe("No category");
      await expect(product.name).not.toBe("No name");
      await expect(product.stars).not.toBe(0);
      await expect(product.price).not.toBe("No price");
      await expect(product.link).not.toBe(false);
    }
  });
});
