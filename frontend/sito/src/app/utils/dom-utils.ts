/**
 * Utility DOM helpers
 * Provides safe methods for manipulating input elements to avoid runtime errors
 * when elements are missing or not the expected type.
 */
export function setNumberInputValueSafe(
  selectorOrElement: string | HTMLInputElement | null,
  value: number | string
): boolean {
  // Ensure TypeScript understands we are working with an HTMLInputElement or null
  const el = typeof selectorOrElement === 'string'
    ? (document.querySelector(selectorOrElement) as HTMLInputElement | null)
    : selectorOrElement;

  if (!el || !(el instanceof HTMLInputElement)) return false;

  // Treat as HTMLInputElement from here on to satisfy TypeScript.
  const input = el as HTMLInputElement;

  // Try to set valueAsNumber when available and meaningful, otherwise fallback.
  const n = Number(value);
  if (Number.isNaN(n)) {
    // For invalid numbers, clear the input to avoid stale values.
    input.value = '';
    return true;
  }

  // Some environments might not support valueAsNumber or throw when setting it,
  // so guard with try/catch and fallback to string assignment.
  try {
    // Prefer valueAsNumber when supported
    (input as any).valueAsNumber = n;
    return true;
  } catch (e) {
    // Fallback to string assignment
    input.value = String(n);
    return true;
  }
}
