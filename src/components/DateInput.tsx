"use client";

/**
 * A date field that always shows and accepts DD/MM/YYYY.
 *
 * The native <input type="date"> renders its display format based on the
 * browser locale (US browsers show MM/DD/YYYY), which we can't override. So we
 * use a masked text input: it auto-inserts the slashes as the user types digits
 * and validates the DD/MM/YYYY shape, giving a consistent Indian date format on
 * every device.
 */
export default function DateInput({
  value,
  onChange,
  className = "",
  required = false,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  id?: string;
}) {
  const format = (raw: string): string => {
    const digits = raw.replace(/\D/g, "").slice(0, 8); // DDMMYYYY
    const parts: string[] = [];
    if (digits.length > 0) parts.push(digits.slice(0, 2));
    if (digits.length >= 3) parts.push(digits.slice(2, 4));
    if (digits.length >= 5) parts.push(digits.slice(4, 8));
    return parts.join("/");
  };

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="bday"
      required={required}
      value={value}
      onChange={(e) => onChange(format(e.target.value))}
      placeholder="DD/MM/YYYY"
      maxLength={10}
      pattern="\d{2}/\d{2}/\d{4}"
      title="Please enter your date of birth as DD/MM/YYYY"
      className={className}
    />
  );
}
