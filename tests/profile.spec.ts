import { test, expect } from "@playwright/test";
import { ProfilePage } from "../pages/profile.page";
import { Header } from "../components/header.component";
import { provideProfileData } from "../utils/provideProfileData";

test.describe("test", () => {
  let profilePage: ProfilePage;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    profilePage = new ProfilePage(page);
    header = new Header(page);

    await page.goto("https://dawidmikula.github.io/petStore/profile.html");
    // await header.profileButton.click();
  });

  test("Check all visible text on Profile tab", async ({ page }) => {
    expect(await page.title()).toBe("YourPuppy - Profile");
    await expect(profilePage.myProfileTittle).toHaveText("My Profile");
    await expect(profilePage.myProfileDesription).toHaveText(
      "Manage your personal information"
    );

    await expect(profilePage.firstNameHeader).toHaveText("First Name:");
    await expect(profilePage.lastNameHeader).toHaveText("Last Name:");
    await expect(profilePage.emailHeader).toHaveText("Email:");
    await expect(profilePage.addressHeader).toHaveText("Address:");
    await expect(profilePage.birthdateHeader).toHaveText("Date of Birth:");
    await expect(profilePage.aboutMeHeader).toHaveText("About Me:");
  });

  test("Correct imput all fields on Profile Page", async ({ page }) => {
    let dialogMessage: string = "";

    page.on("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await provideProfileData(page, profilePage, {
      firstName: "Dawid",
      lastName: "Mikula",
      email: "dawid@dawid.pl",
      phone: "000 000 000",
      address: "Kunki",
      birthdate: "2012-02-05",
      aboutMe: "Dawid Meaaaaaa",
    });
    await profilePage.saveChangesButton.click();

    expect(dialogMessage).toBe("✅ Profile updated successfully!");
  });

  test("Incorrect (empty) data in profile form", async ({ page }) => {
    await profilePage.saveChangesButton.click();

    await expect(profilePage.firstNameError).toHaveText(
      "First name is required."
    );
    await expect(profilePage.lastNameError).toHaveText(
      "Last name is required."
    );
    await expect(profilePage.emailError).toHaveText("Invalid email format.");
    await expect(profilePage.phoneError).toHaveText(
      "Phone number is required."
    );
    await expect(profilePage.addressError).toHaveText("Address is required.");
    await expect(profilePage.birthdateError).toHaveText(
      "You must be at least 13 years old."
    );
  });

  test("Incorrect (email & date) in profile form", async ({ page }) => {
    await provideProfileData(page, profilePage, {
      email: "dawid@d",
      birthdate: "2024-02-05",
    });
    await profilePage.saveChangesButton.click();

    await expect(profilePage.firstNameError).toHaveText(
      "First name is required."
    );
    await expect(profilePage.lastNameError).toHaveText(
      "Last name is required."
    );
    await expect(profilePage.emailError).toHaveText("Invalid email format.");
    await expect(profilePage.phoneError).toHaveText(
      "Phone number is required."
    );
    await expect(profilePage.addressError).toHaveText("Address is required.");
    await expect(profilePage.birthdateError).toHaveText(
      "You must be at least 13 years old."
    );
  });

  test("Positive delete profile", async ({ page }) => {
    let dialogMessages: string[] = [];

    page.on("dialog", async (dialog) => {
      dialogMessages.push(dialog.message());

      if (dialog.message() === "✅ Profile updated successfully!") {
        await dialog.accept();
      } else if (
        dialog.message() ===
        "⚠ Are you sure you want to delete your profile? This action cannot be undone!"
      ) {
        await dialog.accept();
      } else if (dialog.message() === "🗑 Profile deleted successfully!") {
        await dialog.accept();
      }
    });

    await provideProfileData(page, profilePage, {
      firstName: "Dawid",
      lastName: "Mikula",
      email: "dawid@dawid.pl",
      phone: "000 000 000",
      address: "Kunki",
      birthdate: "2012-02-05",
      aboutMe: "Dawid Meaaaaaa",
    });

    await profilePage.saveChangesButton.click();
    await profilePage.deleteProfileButton.click();
    await page.waitForTimeout(1000);

    expect(dialogMessages[1]).toBe(
      "⚠ Are you sure you want to delete your profile? This action cannot be undone!"
    );

    expect(dialogMessages[2]).toBe("🗑 Profile deleted successfully!");
  });

  test("Negative delete profile", async ({ page }) => {
    let dialogMessages: string[] = [];

    page.on("dialog", async (dialog) => {
      dialogMessages.push(dialog.message());

      if (dialog.message() === "✅ Profile updated successfully!") {
        await dialog.accept();
      } else if (
        dialog.message() ===
        "⚠ Are you sure you want to delete your profile? This action cannot be undone!"
      ) {
        await dialog.dismiss();
      }
    });

    await provideProfileData(page, profilePage, {
      firstName: "Dawid",
      lastName: "Mikula",
      email: "dawid@dawid.pl",
      phone: "000 000 000",
      address: "Kunki",
      birthdate: "2012-02-05",
      aboutMe: "Dawid Meaaaaaa",
    });
    await profilePage.saveChangesButton.click();
    await profilePage.deleteProfileButton.click();

    await page.waitForTimeout(1000);

    expect(dialogMessages[1]).toBe(
      "⚠ Are you sure you want to delete your profile? This action cannot be undone!"
    );
    expect(dialogMessages.length).toBeLessThan(3);
  });
});
