import test, { expect } from "@playwright/test";
import { Header } from "../components/header.component";
import { ContactPage } from "../pages/contact.page";
import exp from "constants";

test.describe("test", () => {
  let header: Header;
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    contactPage = new ContactPage(page);

    await page.goto("https://dawidmikula.github.io/petStore/contact.html");
    // await header.contactButton.click();
  });

  test("Contact - text checking ", async ({ page }) => {
    await expect(contactPage.contactUsHeader).toHaveText("CONTACT US");
    await expect(contactPage.contactUsDesc).toHaveText("Meassage!");

    await expect(contactPage.getInTouchSpan).toHaveText("GET IN TOUCH");
    await expect(contactPage.ourLocationsHeader).toHaveText(
      "Our locations, but if you want You can call us now."
    );
    await expect(contactPage.headOfficeHeader).toHaveText("Head Office");

    await expect(contactPage.addressIcon).toBeVisible();
    await expect(contactPage.address).toHaveText(" Poland, Gdansk");
    await expect(contactPage.emailIcon).toBeVisible();
    await expect(contactPage.email).toHaveText(" mail@gmail.com");
    await expect(contactPage.phoneIcon).toBeVisible();
    await expect(contactPage.phone).toHaveText(" +00 000-000-000");
    await expect(contactPage.workingHoursIcon).toBeVisible();
    await expect(contactPage.workingHours).toHaveText(
      " Monday to Friday: 9:00 AM to 16:00 PM"
    );

    await expect(contactPage.messageHeader).toHaveText("LEAVE A MESSAGE");
    await expect(contactPage.messageDesc).toHaveText(
      "We love to hear from you"
    );
    await expect(contactPage.yourNameMessage).toHaveAttribute(
      "placeholder",
      "Your Name"
    );
    await expect(contactPage.emailMessage).toHaveAttribute(
      "placeholder",
      "E-mail"
    );
    await expect(contactPage.subjectMessage).toHaveAttribute(
      "placeholder",
      "Subject"
    );
    await expect(contactPage.yourMessageContent).toHaveAttribute(
      "placeholder",
      "Your Message"
    );
    await expect(contactPage.acceptRegulationsDesc).toHaveText(
      "I accept the regulations"
    );
    await expect(contactPage.submitButton).toHaveText("Submit");
  });

  test("Contact - Map", async ({ page }) => {
    // TBD
    await expect(contactPage.map).toBeVisible();
  });

  test("Contact - Contact form - Positive", async ({ page }) => {
    let dialogMessages: string[] = [];

    page.on("dialog", async (dialog) => {
      const messageText = dialog.message();
      dialogMessages.push(messageText);
      const firstLine = messageText.split("\n")[0];

      if (firstLine === "✅ Your message has been sent successfully!") {
        await dialog.accept();
      }
    });

    const name = "Dawid";
    const email = "email@email.com";
    const subject = "Subject";
    const message = "Message";

    await contactPage.yourNameMessage.fill(name);
    await contactPage.emailMessage.fill(email);
    await contactPage.subjectMessage.fill(subject);
    await contactPage.yourMessageContent.fill(message);
    await contactPage.acceptRegulationsCheckbox.check();
    await contactPage.submitButton.click();

    await page.waitForTimeout(1000);

    expect(dialogMessages[0]).toBe(
      "✅ Your message has been sent successfully!" +
        `\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    );
  });

  test("Contact - Contact form - Negative", async ({ page }) => {
    await contactPage.yourNameMessage.fill("");
    await contactPage.emailMessage.fill("");
    await contactPage.subjectMessage.fill("");
    await contactPage.yourMessageContent.fill("");
  });
});
