export function formatPhoneNumber(input: string): string | null {
  // Remove any non-numeric characters
  const digits = input.replace(/\D/g, '');

  // Ensure the cleaned input consists of exactly 10 digits
  if (!/^\d{10}$/.test(digits)) {
    return null; // Return null if input is invalid
  }

  // Format the phone number as (XXX) XXX-XXXX
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
