export class CartPage {
  constructor(private page: Page) {}

  // Page Header
  headerCart = this.page.locator("#page-header h2");
  headerDescriptionCart = this.page.locator("#page-header p");

  // Cart
  removeTableHead = this.page.locator("thead td").nth(0);
  imageTableHead = this.page.locator("thead td").nth(1);
  productTableHead = this.page.locator("thead td").nth(2);
  priceTableHead = this.page.locator("thead td").nth(3);
  quantityTableHead = this.page.locator("thead td").nth(4);
  subtotalTableHead = this.page.locator("thead td").nth(5);

  // Cart Collumns
  dragHandle = (index: number) => page.locator(".drag-handle").nth(index);
  productName = this.page.locator("table tbody tr td:nth-child(3)");

  // Cart Coupon
  applyCouponHeader = this.page.locator(".coupon h3");
  enterYourCoupon = this.page.getByPlaceholder("Enter Your Coupon");
  applyCouponButton = this.page.getByRole("button", { name: "Apply" });

  // Cart Totals
  cartTotals = this.page.locator(".subtotal h3");
  cartSubtotalCost = this.page.locator(
    ".subtotal td:has-text('Cart Subtotal')"
  );
  cartSubtotalCostValue = this.page.waitForSelector("#cart-subtotal");

  shippingCost = this.page.locator(".subtotal td:has-text('Shipping')");
  shippingCostvalue = this.page
    .locator(".subtotal tr")
    .nth(1)
    .locator("td")
    .nth(1);
  totalCost = this.page.getByText("Total", { exact: true });
  totalCostValue = this.page.locator("#cart-total");

  proceedToCheckoutButton = this.page.getByRole("button", {
    name: "Proceed to Checkout",
  });
}
