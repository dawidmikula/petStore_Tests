import { Page, Locator } from "@playwright/test";

export async function cartToTable(page: Page): Promise<string[][]> {
  await page.waitForSelector("#cart tbody tr");
  const rows = await page.locator("#cart tbody tr").all();
  let tableData: string[][] = [];

  for (let i = 0; i < rows.length; i++) {
    let rowData: string[] = [];

    rowData.push((i + 1).toString());

    const columns = await rows[i].locator("td").all();

    for (const column of columns) {
      const img = column.locator("img");

      if ((await img.count()) > 0) {
        rowData.push("image");
      } else {
        const input = column.locator("input");

        if ((await input.count()) > 0) {
          rowData.push(await input.inputValue());
        } else {
          rowData.push(await column.innerText());
        }
      }
    }

    tableData.push(rowData);
  }
  return tableData;
}
