import { expect, Locator } from "@playwright/test";

export async function assertParseContactInfo(person: Locator) {
  const contactText = (await person.innerText()).replace(/\s+/g, " ").trim();
  const words = contactText.replace(/\s+/g, " ").trim().split(" ");

  const name = words.slice(0, 2).join(" ");
  expect(name.split(" ").length).toBe(2);

  const positionEndIndex = words.findIndex(
    (word) => word === "Hover" || word === "Phone:"
  );

  const position =
    positionEndIndex > 2 ? words.slice(2, positionEndIndex).join(" ") : "";
  expect(position.length).toBeGreaterThan(0);

  const contactInfo = words
    .slice(positionEndIndex, words.indexOf("Email:"))
    .join(" ");
  expect(contactInfo).toMatch(
    /^(Hover to show number|Phone: \d{3}-\d{3}-\d{3})$/
  );

  const email = contactText.split("Email: ")[1]?.trim() ?? "";
  expect(email).toMatch(/^[a-zA-Z]+@example\.com$/);

  const imageAlt = await person.locator("img").getAttribute("alt");
  expect(imageAlt).toBe(name);
}
