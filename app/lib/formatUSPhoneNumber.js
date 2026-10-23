/**
 * Formats a US phone number for editable forms, without assuming a 406 area code.
 * Supports pasted punctuation and the optional US country code (+1).
 */
export function formatUSPhoneNumber(value) {
  const raw = String(value ?? "").replace(/\D/g, "");
  const digits = (raw.length === 11 && raw.startsWith("1") ? raw.slice(1) : raw).slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}
