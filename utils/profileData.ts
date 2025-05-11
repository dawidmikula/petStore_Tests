import { faker } from "@faker-js/faker";

export function generateFirstName() {
  return faker.person.firstName();
}

export function generateLastName() {
  return faker.person.lastName().replace(/[\s.]/g, "");
}

export function generateRandomEmail() {
  const name = faker.person.fullName().replace(" ", "").toLowerCase();
  const number = faker.number.int(2000);
  return `${name}${number}@dawid.com`;
}

export function generateBirthdate() {
  return faker.date
    .between({ from: "1940-01-01", to: "2012-12-31" })
    .toISOString()
    .split("T")[0];
}

export function generatePhoneNumber() {
  return faker.phone.number({ style: "international" });
}

export function generateCity() {
  return faker.location.city();
}

export function generateRandomWords(count = 20) {
  return faker.lorem.words(count);
}
