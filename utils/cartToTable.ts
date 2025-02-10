import { Page, Locator } from "@playwright/test";

export async function cartToTable(page: Page): Promise<string[][]> {
  await page.waitForSelector("#cart tbody tr");
  const rows = await page.locator("#cart tbody tr").all();
  let tableData: string[][] = [];

  for (let i = 0; i < rows.length; i++) {
    let rowData: string[] = [];

    // Dodaj numer porządkowy wiersza (indeksy zaczynają się od 1)
    rowData.push((i + 1).toString());

    // Pobierz wszystkie komórki `td`
    const columns = await rows[i].locator("td").all();

    for (const column of columns) {
      // Sprawdź, czy komórka zawiera obrazek `<img>`
      const img = column.locator("img");

      if ((await img.count()) > 0) {
        rowData.push("image");
      } else {
        // Sprawdź, czy komórka zawiera input (np. pole Quantity)
        const input = column.locator("input");

        if ((await input.count()) > 0) {
          // Pobierz wartość z inputa
          rowData.push(await input.inputValue());
        } else {
          // Pobierz tekst komórki
          rowData.push(await column.innerText());
        }
      }
    }

    tableData.push(rowData);
  }
  return tableData;
}
