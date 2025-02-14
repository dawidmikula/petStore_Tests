export function cleanNumber(providedString: unknown): number {
  // ✅ Konwersja na string, jeśli to nie jest string
  const value =
    typeof providedString === "string"
      ? providedString
      : String(providedString);

  if (value.toLowerCase() === "free") return 0;

  // ✅ Usuwamy niepotrzebne znaki i zamieniamy na liczbę
  const cleanedValue = value.replace(/[^0-9.]/g, "");
  return parseFloat(cleanedValue) || 0;
}
