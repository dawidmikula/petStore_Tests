import { expect } from "@playwright/test";

export async function validateAndScreenshot(
  page,
  locator,
  expectedMessage,
  screenshotPath
) {
  const validationMessage = await locator.evaluate(
    (el) => (el as HTMLInputElement).validationMessage
  );
  expect(validationMessage).toBe(expectedMessage);

  await locator.evaluate((el) => el.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(200);

  const box = await locator.boundingBox();
  if (box) {
    const padding = 150;
    const x = Math.max(0, box.x - padding);
    const y = Math.max(0, box.y - padding);
    const width = box.width + padding * 2;
    const height = box.height + padding * 2;
    const viewport = page.viewportSize();
    const clip = {
      x: x,
      y: y,
      width: Math.min(width, (viewport?.width ?? width) - x),
      height: Math.min(height, (viewport?.height ?? height) - y),
    };

    await page.screenshot({ path: screenshotPath, clip: clip });
  }
}
