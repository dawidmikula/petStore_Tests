import { test, expect } from "@playwright/test";
import { ProfilePage } from "../pages/profile.page";
import { Header } from "../components/header.component";
import { CartPage } from "../pages/cart.page";
import { cartToTable } from "../utils/cartToTable";

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

  test("Cart", async ({ page }) => {
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

  test("Iteracja po wierszach tabeli", async ({ page }) => {
    const tableData = await cartToTable(page);

    console.log(tableData); // Możesz zobaczyć strukturę tabeli
    expect(tableData.length).toBeGreaterThan(0);
  });

  test("Cart 2", async ({ page }) => {
    //
  });
});
