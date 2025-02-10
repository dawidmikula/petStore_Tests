import { Page, Locator } from "@playwright/test";

export class Footer {
  constructor(private page: Page) {}

  private shopContactAndSocialsFooterCollun = this.page
    .locator("footer .col")
    .nth(0);
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

  // My account
  myAccountHeaderFooter = this.myAccountFooterCollumn.locator(
    "h4:has-text('My account')"
  );
  signInAccountFooter = this.myAccountFooterCollumn.locator(
    "a:has-text('Sign In')"
  );
  viewCartAccountFooter = this.myAccountFooterCollumn.locator(
    "a:has-text('View Cart')"
  );
  myWishlistAccountFooter = this.myAccountFooterCollumn.locator(
    "a:has-text('My Wishlist')"
  );
  trackMyOrderAccountFooter = this.myAccountFooterCollumn.locator(
    "a:has-text('Track My Order')"
  );
  helpAccoutnFooter = this.myAccountFooterCollumn.locator("a:has-text('Help')");

  // Insatll App
  installAppHeaderFooter = this.installAppFooterCollumn.locator(
    "h4:has-text('Install App')"
  );
  installAppDescriptionFooter = this.installAppFooterCollumn.locator(
    "p:has-text('From App Store or Google Play')"
  );
  appStoreButtonInstallFooter = this.installAppFooterCollumn
    .locator(".row img")
    .nth(0);
  googlePlayButtonInstallFooter = this.installAppFooterCollumn
    .locator(".row img")
    .nth(1);
  paymentMethodsInstallFooter = this.installAppFooterCollumn.locator(
    "p:has-text('Secured Payment Gateway')"
  );
  paymentMethodsButtonInstallFooter = this.installAppFooterCollumn
    .locator("img")
    .nth(2);

  // Copywright
  copywrightFooter = this.page.locator(".copyright");
}
