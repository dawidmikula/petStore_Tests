import { Page } from "@playwright/test";

export class ContactPage {
  constructor(private page: Page) {}

  contactUsHeader = this.page.locator("#page-header h2");
  contactUsDesc = this.page.locator("#page-header p");

  getInTouchSpan = this.page.locator('span:text("GET IN TOUCH")');
  ourLocationsHeader = this.page.locator(
    'h2:text("Our locations, but if you want You can call us now.")'
  );
  headOfficeHeader = this.page.locator('h3:text("Head Office")');

  addressIcon = this.page.locator("i.fa-map");
  address = this.page.locator(".details li").nth(0);
  emailIcon = this.page.locator("i.fa-envelope");
  email = this.page.locator(".details li").nth(1);
  phoneIcon = this.page.locator("i.fa-phone-alt");
  phone = this.page.locator(".details li").nth(2);
  workingHoursIcon = this.page.locator("i.fa-clock");
  workingHours = this.page.locator(".details li").nth(3);

  map = this.page.locator(".map");

  messageHeader = this.page.locator('#contact-form span:text("LEAVE")');
  messageDesc = this.page.locator("#contact-form h2");

  yourNameMessage = this.page.locator("#contact-form #name");
  emailMessage = this.page.locator("#contact-form #email");
  subjectMessage = this.page.locator("#contact-form #subject");
  yourMessageContent = this.page.locator("#contact-form #message");

  acceptRegulationsCheckbox = this.page.locator(
    "#contact-form #accept-regulations"
  );
  acceptRegulationsDesc = this.page.locator(
    '#contact-form :text("I accept the regulations")'
  );
  submitButton = this.page.locator('#contact-form :text("Submit")');
}
