import { Page } from "@playwright/test";

export class ProfilePage {
  constructor(private page: Page) {}

  myProfileTittle = this.page.getByRole("heading", { name: "My Profile" });
  myProfileDesription = this.page.getByText("Manage your personal");

  firstNameHeader = this.page.getByText("First Name:");
  firstNameField = this.page.getByRole("textbox", { name: "First Name:" });
  firstNameError = this.page.getByText("First name is required.");

  lastNameHeader = this.page.getByText("Last Name:");
  lastNameField = this.page.getByRole("textbox", { name: "Last Name:" });
  lastNameError = this.page.getByText("Last name is required.");

  emailHeader = this.page.getByText("Email:");
  emailField = this.page.getByRole("textbox", { name: "Email:" });
  emailError = this.page.getByText("Invalid email format.");

  phoneHeader = this.page.locator("#profile-form").getByText("Phone:");
  phoneField = this.page.getByRole("textbox", { name: "Phone:" });
  phoneError = this.page.getByText("Phone number is required.");

  addressHeader = this.page.locator("#profile-form").getByText("Address:");
  addressField = this.page.getByRole("textbox", { name: "Address:" });
  addressError = this.page.getByText("Address is required.");

  birthdateHeader = this.page.getByText("Date of Birth:");
  birthdateField = this.page.getByRole("textbox", { name: "Date of Birth:" }); 
  birthdateError = this.page.getByText("You must be at least 13 years");

  aboutMeHeader = this.page.getByText("About Me:");
  aboutMeField = this.page.getByRole("textbox", { name: "About Me:" });

  saveChangesButton = this.page.getByRole("button", { name: "Save Changes" });
  deleteProfileButton = this.page.getByRole("button", {
    name: "Delete Profile",
  });
}

