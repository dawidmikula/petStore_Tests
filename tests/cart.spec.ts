import { test, expect } from "@playwright/test";
import { ProfilePage } from "../pages/profile.page";
import { Header } from "../components/header.component";
import { CartPage, quantityRow } from "../pages/cart.page";
import { cartToTable } from "../utils/cartToTable";
import { cleanNumber } from "../utils/cleanNumber";
import { sumCart } from "../utils/sumCart";

test.describe("test", () => {
  let profilePage: ProfilePage;
  let header: Header;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    profilePage = new ProfilePage(page);
    header = new Header(page);
    cartPage = new CartPage(page);

    await page.goto("https://dawidmikula.github.io/petStore/index.html");
    await header.cartButton.click();
  });

  test("Cart - text checking", async ({ page }) => {
    await expect(await page.title()).toBe("YourPuppy - Cart");
    await expect(cartPage.headerCart).toHaveText("#Cart");
    await expect(cartPage.headerDescriptionCart).toHaveText(
      "Add your coupon code & SAVE up to 70%!"
    );
    await expect(cartPage.removeTableHead).toHaveText("Remove");
    await expect(cartPage.imageTableHead).toHaveText("Image");
    await expect(cartPage.productTableHead).toHaveText("Product");
    await expect(cartPage.priceTableHead).toHaveText("Price");
    await expect(cartPage.quantityTableHead).toHaveText("Quantity");
    await expect(cartPage.subtotalTableHead).toHaveText("Subtotal");

    await expect(cartPage.applyCouponHeader).toHaveText("Apply Coupon");
    await expect(cartPage.applyCouponButton).toHaveText("Apply");

    await expect(cartPage.cartTotals).toHaveText("Cart Totals");
    await expect(cartPage.cartSubtotalCost).toHaveText("Cart Subtotal");
    await expect(cartPage.shippingCost).toHaveText("Shipping");
    await expect(cartPage.totalCost).toHaveText("Total");
    await expect(cartPage.proceedToCheckoutButton).toHaveText(
      "Proceed to Checkout"
    );
    // await expect(cartPage.).toHaveText("");
  });

  test("Cart - base values checking", async ({ page }) => {
    const tableData = await cartToTable(page);
    expect(tableData.length).toBeGreaterThan(0);

    const totalSum = sumCart(tableData);
    const cartSubtotal = await page.locator("#cart-subtotal").innerText();
    expect(cartSubtotal).not.toBe("");

    await expect(cleanNumber(cartSubtotal)).toBe(totalSum);
  });

  test("Cart - changed values checking", async ({ page }) => {
    quantityRow(page, 1, 11);
    quantityRow(page, 2, 1);
    quantityRow(page, 3, 2);

    const tableData = await cartToTable(page);
    expect(tableData.length).toBeGreaterThan(0);

    const totalSum = sumCart(tableData);
    const cartSubtotal = await page.locator("#cart-subtotal").innerText();
    expect(cartSubtotal).not.toBe("");
    console.log(cartSubtotal);

    expect(cleanNumber(cartSubtotal)).toBe(totalSum);
  });
});
