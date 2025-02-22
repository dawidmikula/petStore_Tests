import { Page } from "@playwright/test";

export class Newsletter {
  constructor(private page: Page) {}

  newsletterHeader = this.page.locator("#newsletter .newstext h4");
  newsletterDescription = this.page.locator("#newsletter .newstext p");
  newletterEmailInput = this.page.locator("#newsletter #newsletter-email");
  newsletterEmailSubmitButton = this.page.locator(
    "#newsletter #newsletter-submit"
  );
  newsletterMessage = this.page.locator("#newsletter #newsletter-message");
}
