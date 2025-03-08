import { cleanNumber } from "./cleanNumber";

export function sumCart(tableData: string[][]) {
  let totalSum = 0;

  for (let i = 0; i < tableData.length; i++) {
    const row = tableData[i];

    const price = cleanNumber(row[4]);
    const quantity = cleanNumber(row[5]);
    const subtotal = Number(price) * Number(quantity);

    totalSum += subtotal;
  }
  return totalSum;
}
