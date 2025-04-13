export class ProductPage {
  constructor(private page: Page) {}

  // Images
  bigImage = this.page.locator(".single-pro-image #MainImg");
  smallImage = (index: number) => page.locator(".small-img").nth(index);

  // Product Details
  private $(selector: string) {
    return this.page.locator(`.single-pro-details ${selector}`);
  }
  category = this.$("h6");
  name = this.$("h4").first();
  price = this.$("h2");
  format = this.$("select");
  amount = this.$("input");
  addToCart = this.$(":text('Add to Cart')");
  detailsHeader = this.$("h4:text('Product Details')");
  detailsContent = this.$("span");
}
