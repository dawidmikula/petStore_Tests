export function cleanNumber(providedString: string): number {
  if (!providedString) return 0; // Jeśli pusta wartość, zwracamy 0

  // Usuwamy "$", zamieniamy przecinki na kropki i parsujemy do liczby
  const cleanedValue = providedString.replace(/[^0-9.]/g, "");

  return parseFloat(cleanedValue) || 0; // Jeśli `NaN`, zwracamy `0`
}
