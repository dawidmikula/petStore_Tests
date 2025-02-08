import { Page } from "@playwright/test";

export class Header {
  constructor(private page: Page) {}

  homeButton = this.page.getByRole("link", { name: "Home" });
  shopButton = this.page.getByRole("link", { name: "Shop", exact: true });
  blogButton = this.page.getByRole("link", { name: "Blog" });
  profileButton = this.page.getByRole("link", { name: "Profile" });
  contactButton = this.page.getByRole("link", { name: "Contact", exact: true });
  cartButton = this.page.getByRole("link", { name: "" });
}
