import { test, expect } from "@playwright/test";
import { ProfilePage } from "../pages/profile.page";
import { Header } from "../components/header.component";
import { CartPage } from "../pages/cart.page";
import { cartToTable } from "../utils/cartToTable";
import { cleanNumber } from "../utils/cleanNumber";
import { sumCart } from "../utils/sumCart";
import { quantityRow } from "../utils/quantityRow";

test.describe("Cart Page", () => {
  let header: Header;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    cartPage = new CartPage(page);

    await page.goto("");
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

  test("Cart - moving porducts", async ({ page }) => {
    await cartPage.productName.nth(0).waitFor({ timeout: 1000 });

    const slideFrom = cartPage.dragHandle(0);
    const slideTo = cartPage.dragHandle(2);

    const cells = await cartPage.productName.all();
    const columnDataBeforeMoving: string[] = [];
    for (const cell of cells) {
      columnDataBeforeMoving.push(await cell.innerText());
    }

    await slideFrom.dragTo(slideTo);

    const cellsAfterMoving = await page
      .locator("table tbody tr td:nth-child(3)")
      .all();
    const columnDataAfterMoving: string[] = [];
    for (const cell of cellsAfterMoving) {
      columnDataAfterMoving.push(await cell.innerText());
    }

    expect(columnDataAfterMoving[2]).toBe(columnDataBeforeMoving[0]);
  });

  test("Cart - deleting porducts", async ({ page }) => {
    await cartPage.productName.nth(0).waitFor({ timeout: 1000 });

    const cells = await page.locator("table tbody tr td:nth-child(3)").all();
    const columnDataBeforeDelete: string[] = [];
    for (const cell of cells) {
      columnDataBeforeDelete.push(await cell.innerText());
    }

    const indexDelete = columnDataBeforeDelete.length - 1;
    if (columnDataBeforeDelete.length < indexDelete) {
      throw new Error("Błąd: Index do usunięcia większy niż długość tabeli!");
    }
    const targetValue = columnDataBeforeDelete[indexDelete - 1];
    await page
      .locator(".remove-item")
      .nth(indexDelete - 1)
      .click();

    const cellsAfterDelete = await page
      .locator("table tbody tr td:nth-child(3)")
      .all();
    const columnDataAfterDelete: string[] = [];
    for (const cell of cellsAfterDelete) {
      columnDataAfterDelete.push(await cell.innerText());
    }

    const isRecordDeleted = !columnDataAfterDelete.includes(targetValue);
    expect(isRecordDeleted).toBe(true);
  });

  test("Cart - base values checking", async ({ page }) => {
    const tableData = await cartToTable(page);
    expect(tableData.length).toBeGreaterThan(0);

    const totalSum = sumCart(tableData);
    const cartSubtotal = await page.locator("#cart-subtotal").innerText();
    expect(cartSubtotal).not.toBe("");

    expect(cleanNumber(cartSubtotal)).toBe(totalSum);
  });

  test("Cart - subtotal and total calculation", async ({ page }) => {
    await quantityRow(page, 1, 2);
    await quantityRow(page, 2, 2);
    await quantityRow(page, 3, 8);

    const tableData = await cartToTable(page);
    expect(tableData.length).toBeGreaterThan(0);

    const totalSum = sumCart(tableData);
    const cartSubtotal = await page.locator("#cart-subtotal").innerText();
    expect(cartSubtotal).not.toBe("");

    expect(cleanNumber(cartSubtotal)).toBe(totalSum);

    expect(cleanNumber(cartSubtotal)).toBe(
      cleanNumber(await cartPage.totalCostValue.innerText()) +
        cleanNumber(await cartPage.shippingCostvalue.innerText())
    );
  });

  test("Cart - Applying incorrect coupon", async ({ page }) => {
    const couponValues = [11, 22, 98];
    const valueBeforeCouponApply = cleanNumber(
      await cartPage.totalCostValue.innerText()
    );

    for (const value of couponValues) {
      let dialogMessage = "";

      const dialogHandler = page.once("dialog", async (dialog) => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });

      await cartPage.enterYourCoupon.fill(`save${value}`);
      await cartPage.applyCouponButton.click();
      await page.waitForTimeout(500);

      expect(dialogMessage).toBe("❌ Invalid coupon code. Please try again.");

      const valueAfterCouponApply = cleanNumber(
        await cartPage.totalCostValue.innerText()
      );

      expect(valueAfterCouponApply).toBe(valueBeforeCouponApply);
    }
  });

  test("Cart - Applying correct coupon", async ({ page }) => {
    const couponValues = [10, 25, 50, 100];
    const valueBeforeCouponApply = cleanNumber(
      await cartPage.totalCostValue.innerText()
    );

    for (const value of couponValues) {
      let dialogMessage = "";

      const dialogHandler = page.once("dialog", async (dialog) => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });

      await cartPage.enterYourCoupon.fill(`save${value}`);
      await cartPage.applyCouponButton.click();
      await page.waitForTimeout(500);

      expect(dialogMessage).toBe(
        "✅ Discount applied! -" + value + "% off your total."
      );

      const presentedValueAfterCouponApply = cleanNumber(
        await cartPage.totalCostValue.innerText()
      );

      let calculatedExpectedValue = Number(
        (
          valueBeforeCouponApply -
          (valueBeforeCouponApply / 100) * value
        ).toFixed(2)
      );

      if (Object.is(calculatedExpectedValue, -0)) {
        calculatedExpectedValue = 0;
      }

      expect(presentedValueAfterCouponApply).toBe(calculatedExpectedValue);
    }
  });
});
