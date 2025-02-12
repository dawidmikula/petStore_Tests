import { Page } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  // Page header
  headerCart = this.page.locator("#page-header h2");
  headerDescriptionCart = this.page.locator("#page-header p");

  // Cart
  removeTableHead = this.page.locator("thead td").nth(0);
  imageTableHead = this.page.locator("thead td").nth(1);
  productTableHead = this.page.locator("thead td").nth(2);
  priceTableHead = this.page.locator("thead td").nth(3);
  quantityTableHead = this.page.locator("thead td").nth(4);
  subtotalTableHead = this.page.locator("thead td").nth(5);

  // Cart Coupon
  applyCouponHeader = this.page.locator(".coupon h3");
  enterYourCoupon = this.page.getByPlaceholder("Enter Your Coupon");
  applyCouponButton = this.page.getByRole("button", { name: "Apply" });

  // Cart totals
  cartTotals = this.page.locator(".subtotal h3");
  cartSubtotalCost = this.page.locator(
    ".subtotal td:has-text('Cart Subtotal')"
  );
  cartSubtotalCostValue = this.page.waitForSelector("#cart-subtotal");

  shippingCost = this.page.locator(".subtotal td:has-text('Shipping')");
  // shippingCostvalue = this.page.
  totalCost = this.page.getByText("Total", { exact: true });
  // totalCostValue = this.page.

  proceedToCheckoutButton = this.page.getByRole("button", {
    name: "Proceed to Checkout",
  });
}

export async function quantityRow(
  page: Page,
  rowIndex: number,
  newValue: number
) {
  rowIndex--;

  const rows = await page.locator("#cart tbody tr").all();

  if (rowIndex < 0 || rowIndex >= rows.length) {
    throw new Error(
      `Błąd: Wiersz ${rowIndex + 1} nie istnieje. Zakres to od 1 do ${
        rows.length
      }.`
    );
  }

  if (!Number.isInteger(newValue) || newValue < 0) {
    throw new Error(
      `Błąd: Wartość ${newValue} musi być liczbą całkowitą większą lub wieksza od 0.`
    );
  }

  const quantityInput = rows[rowIndex].locator(".change-quantity");

  // ✅ Sprawdzenie, czy input istnieje
  if ((await quantityInput.count()) === 0) {
    throw new Error(
      `Błąd: Nie znaleziono pola Quantity w wierszu ${rowIndex + 1}.`
    );
  }

  await quantityInput.fill(newValue.toString());
}
