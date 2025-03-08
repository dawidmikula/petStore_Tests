export function cleanNumber(providedString: unknown): number {
  const value =
    typeof providedString === "string"
      ? providedString
      : String(providedString);

  if (value.toLowerCase() === "free") return 0;

  const cleanedValue = value.replace(/[^0-9.]/g, "");
  return parseFloat(cleanedValue) || 0;
}
