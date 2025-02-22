import test, { expect } from "@playwright/test";
import { Header } from "../components/header.component";
import { BlogPage } from "../pages/blog.page";
import { Newsletter } from "../components/newsletter.component";

test.describe("test", () => {
  let header: Header;
  let newsletter: Newsletter;
  let blogPage: BlogPage;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    newsletter = new Newsletter(page);
    blogPage = new BlogPage(page);

    await page.goto("https://dawidmikula.github.io/petStore/blog.html");
    // await header.blogButton.click();
  });

  test("Newsletter - check text with empty input", async ({ page }) => {
    await expect(newsletter.newsletterHeader).toHaveText(
      "Sign Up For Newsletter"
    );
    await expect(newsletter.newsletterDescription).toHaveText(
      "Get E-mail updates about our latest shop and special offers."
    );
    const placeholderText = await newsletter.newletterEmailInput.getAttribute(
      "placeholder"
    );
    expect(placeholderText).toBe("Your email address");
    await expect(newsletter.newsletterEmailSubmitButton).toHaveText("Sign Up");
  });

  test("Newsletter", async ({ page }) => {
    await newsletter.newsletterEmailSubmitButton.click();
    await expect(newsletter.newsletterMessage).toHaveText(
      "❌ Please enter a valid email address!"
    );

    await expect(newsletter.newsletterMessage).toBeVisible({ timeout: 500 });
    await page.waitForTimeout(5000);
    await expect(newsletter.newsletterMessage).toBeHidden({ timeout: 500 });
  });
});
