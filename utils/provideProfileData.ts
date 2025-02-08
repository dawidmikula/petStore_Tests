import { Page } from "@playwright/test";
import { ProfilePage } from "../pages/profile.page";

export async function provideProfileData(
  page: Page,
  profilePage: ProfilePage,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    birthdate?: string;
    aboutMe?: string;
  }
) {
  if (data.firstName) {
    await profilePage.firstNameField.fill(data.firstName);
  }
  if (data.lastName) {
    await profilePage.lastNameField.fill(data.lastName);
  }
  if (data.email) {
    await profilePage.emailField.fill(data.email);
  }
  if (data.phone) {
    await profilePage.phoneField.fill(data.phone);
  }
  if (data.address) {
    await profilePage.addressField.fill(data.address);
  }
  if (data.birthdate) {
    await profilePage.birthdateField.fill(data.birthdate);
  }
  if (data.aboutMe) {
    await profilePage.aboutMeField.fill(data.aboutMe);
  }
}
