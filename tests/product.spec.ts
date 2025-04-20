import test, { expect } from "@playwright/test";
import { Header } from "../components/header.component";
import { ProductPage } from "../pages/product.page";

test.describe("Product Page", () => {
  let header: Header;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    productPage = new ProductPage(page);

    await page.goto(
      "https://dawidmikula.github.io/petStore/singleProduct.html"
    );
  });

  test("Product - text verification", async ({ page }) => {
    await expect(productPage.category).toHaveText("Home / Psychology");
    await expect(productPage.name).toHaveText(
      "Mindfulness & Self-Development Kit"
    );
    await expect(productPage.price).toHaveText("$139.00");

    await expect(productPage.detailsHeader).toHaveText("Product Details");
    await expect(productPage.detailsContent).toBeVisible();
  });

  test("Product - images verification", async ({ page }) => {
    for (let i = 1; i <= 4; i++) {
      await expect(productPage.bigImage).toBeVisible();
      const src = await productPage.bigImage.getAttribute("src");
      await expect(src).toContain(`images/products/f${i}.jpg`);

      if (i < 4) {
        await productPage.smallImage(i).click();
      }
    }
  });

  test("Product - checking options/inputs", async ({ page }) => {
    const options = await productPage.format
      .locator("option")
      .allTextContents();
    const optionsCount = options.length;

    for (let i = 0; i < optionsCount; i++) {
      await productPage.format.selectOption(options[i]);
      expect(await productPage.format.inputValue()).toBe(options[i]);
    }

    await productPage.amount.fill("10");

    await productPage.addToCart.click();
  });
});
