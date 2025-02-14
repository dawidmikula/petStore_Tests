import { Page } from "@playwright/test";

export async function quantityRow(
  page: Page,
  rowIndex: number,
  newValue: number
) {
  rowIndex--;

  const rows = await page.locator("#cart tbody tr").all();

  if (rowIndex < 0 || rowIndex >= rows.length) {
    throw new Error(
      `Błąd: Wiersz ${rowIndex + 1} nie istnieje. Zakres to od 1 do ${
        rows.length
      }.`
    );
  }

  if (!Number.isInteger(newValue) || newValue < 0) {
    throw new Error(
      `Błąd: Wartość ${newValue} musi być liczbą całkowitą większą lub wieksza od 0.`
    );
  }

  const quantityInput = rows[rowIndex].locator(".change-quantity");

  // ✅ Sprawdzenie, czy input istnieje
  if ((await quantityInput.count()) === 0) {
    throw new Error(
      `Błąd: Nie znaleziono pola Quantity w wierszu ${rowIndex + 1}.`
    );
  }

  await quantityInput.fill(newValue.toString());
}
