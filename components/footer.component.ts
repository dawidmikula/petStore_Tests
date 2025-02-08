import { Page, Locator } from "@playwright/test";

export class Footer {
  constructor(private page: Page) {}

  private shopContactAndSocialsFooterCollun = this.page
    .locator("footer .col")
    .nth(0); // Pierwsza kolumna (Contact)
  private aboutFooterCollumn = this.page.locator("footer .col").nth(1); // Druga kolumna (About)
  private myAccountFooterCollumn = this.page.locator("footer .col").nth(2); // Trzecia kolumna (My Account)
  private installAppFooterCollumn = this.page.locator("footer .col").nth(3); // Czwarta kolumna (Install App)
  // Shop & Contact
  logoFooter = this.shopContactAndSocialsFooterCollun.locator(".logo");

  contactHeaderFooter = this.shopContactAndSocialsFooterCollun.locator(
    "h4:has-text('Contact')"
  );
  addressContactFooter = this.shopContactAndSocialsFooterCollun.locator(
    "p:has-text('Address:')"
  );
  phoneContactFooter = this.shopContactAndSocialsFooterCollun.locator(
    "p:has-text('Phone:')"
  );
  hoursContactFooter = this.shopContactAndSocialsFooterCollun.locator(
    "p:has-text('Hours:')"
  );
  followUsContactFooter = this.shopContactAndSocialsFooterCollun.locator(
    "h4:has-text('Follow us')"
  );
  facebookIconContactFooter =
    this.shopContactAndSocialsFooterCollun.locator(".fab.fa-facebook-f");
  twitterIconContactFooter =
    this.shopContactAndSocialsFooterCollun.locator(".fab.fa-twitter");
  instagremIconContactFooter =
    this.shopContactAndSocialsFooterCollun.locator(".fab.fa-instagram");
  pinterestIconContactFooter = this.shopContactAndSocialsFooterCollun.locator(
    ".fab.fa-pinterest-p"
  );
  youTubeIconContactFooter =
    this.shopContactAndSocialsFooterCollun.locator(".fab.fa-youtube");
  // About
  aboutHeaderFooter = this.aboutFooterCollumn.locator("h4:has-text('About')");
  aboutUsAboutFooter = this.aboutFooterCollumn.locator(
    "a:has-text('About us')"
  );
  deliveryInformationAboutFooter = this.aboutFooterCollumn.locator(
    'a:has-text("Delivery")'
  );
  privacyPolicyUsAboutFooter = this.aboutFooterCollumn.locator(
    'a:has-text("Privacy")'
  );
  termsAndConditionstUsAboutFooter = this.aboutFooterCollumn.locator(
    'a:has-text("Terms")'
  );
  contactUsAboutFooter = this.aboutFooterCollumn.locator(
    'a:has-text("Contact")'
  );

  //
}
