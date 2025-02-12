import { Page, Locator, expect } from "@playwright/test";

export async function checkLink(
  page: Page,
  linkLocator: Locator,
  expectedHref: string
) {
  const href = await linkLocator.getAttribute("href");
  if (!href) {
    throw new Error(
      `Nie znaleziono atrybutu href w linku/przycisku: ${await linkLocator.innerText()}`
    );
  }
  await expect(href).toBe(expectedHref);
}

export async function checkFullLink(
  page: Page,
  linkLocator: Locator,
  expectedHref: string //tu nie było string
) {
  const aboutUsUrl = await linkLocator.getAttribute("href");
  const newTab = await page.context().newPage();

  if (!aboutUsUrl) {
    throw new Error(
      `Nie znaleziono atrybutu href w linku/przycisku: ${await linkLocator.innerText()}`
    );
  }

  await newTab.goto(new URL(aboutUsUrl, page.url()).toString()); // Tworzy pełny URL
  await expect(newTab).toHaveURL(
    `https://dawidmikula.github.io/petStore/${expectedHref}`
  );
  await newTab.close();
}
