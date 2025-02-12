import { cleanNumber } from "./cleanNumber";

export function sumCart(tableData: string[][]) {
  let totalSum = 0;

  for (let i = 0; i < tableData.length; i++) {
    const row = tableData[i];

    const price = cleanNumber(row[4]); // 5. komórka - cena
    const quantity = cleanNumber(row[5]); // 6. komórka - ilość
    const subtotal = Number(price) * Number(quantity); // Obliczamy wartość dla wiersza

    totalSum += subtotal; // Sumujemy wartość wszystkich wierszy
  }
  return totalSum;
}
