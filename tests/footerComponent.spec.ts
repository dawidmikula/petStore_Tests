import { test, expect } from "@playwright/test";
import { ProfilePage } from "../pages/profile.page";
import { Header } from "../components/header.component";
import { Footer } from "../components/footer.component";
import { checkFullLink, checkLink } from "../utils/chceckLink";

test.describe("test", () => {
  let profilePage: ProfilePage;
  let header: Header;
  let footer: Footer;

  test.beforeEach(async ({ page }) => {
    profilePage = new ProfilePage(page);
    header = new Header(page);
    footer = new Footer(page);

    await page.goto("https://dawidmikula.github.io/petStore/index.html");
    await header.profileButton.click();
  });

  test("Footer - Shop icon and Contact collumn", async ({ page }) => {
    await expect(footer.contactHeaderFooter).toHaveText("Contact");
    await expect(footer.addressContactFooter).toHaveText(
      "Address: Poland, Gdansk"
    );
    await expect(footer.phoneContactFooter).toHaveText(
      "Phone: +00 000 000 000"
    );
    await expect(footer.hoursContactFooter).toHaveText(
      "Hours: 10:00 - 18:00, Mon - Fri"
    );

    await expect(footer.followUsContactFooter).toHaveText("Follow us");
    await expect(footer.facebookIconContactFooter).toBeVisible();
    await expect(footer.twitterIconContactFooter).toBeVisible();
    await expect(footer.instagremIconContactFooter).toBeVisible();
    await expect(footer.pinterestIconContactFooter).toBeVisible();
    await expect(footer.youTubeIconContactFooter).toBeVisible();
  });

  test("Footer - About collumn", async ({ page }) => {
    await expect(footer.aboutHeaderFooter).toHaveText("About");
    await expect(footer.aboutUsAboutFooter).toHaveText("About us");
    await expect(footer.deliveryInformationAboutFooter).toHaveText(
      "Delivery Information"
    );
    await expect(footer.privacyPolicyUsAboutFooter).toHaveText(
      "Privacy Policy"
    );
    await expect(footer.termsAndConditionstUsAboutFooter).toHaveText(
      "Terms & Conditions"
    );
    await expect(footer.contactUsAboutFooter).toHaveText("Contact Us");
  });

  test("Footer - About us link opens in new tab (force)", async ({ page }) => {
    const expectedHref = "construction.html";
    await checkFullLink(page, footer.aboutUsAboutFooter, expectedHref);
    await checkFullLink(
      page,
      footer.deliveryInformationAboutFooter,
      expectedHref
    );
    await checkFullLink(page, footer.privacyPolicyUsAboutFooter, expectedHref);
    await checkFullLink(
      page,
      footer.termsAndConditionstUsAboutFooter,
      expectedHref
    );
    await checkFullLink(page, footer.contactUsAboutFooter, expectedHref);
  });

  test("test", async ({ page }) => {
    const expectedHref = "construction.html";

    await checkLink(page, footer.aboutUsAboutFooter, expectedHref);
    await checkLink(page, footer.deliveryInformationAboutFooter, expectedHref);
    await checkLink(page, footer.privacyPolicyUsAboutFooter, expectedHref);
    await checkLink(
      page,
      footer.termsAndConditionstUsAboutFooter,
      expectedHref
    );
    await checkLink(page, footer.contactUsAboutFooter, expectedHref);
  });
});
