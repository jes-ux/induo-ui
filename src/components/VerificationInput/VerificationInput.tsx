import { useId, useRef, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";
import { WarningIcon } from "../icons/WarningIcon";

export interface VerificationInputProps {
  /** Cantidad de casilleros. Por defecto 4. */
  length?: number;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
}

export function VerificationInput({
  length = 4,
  value,
  onChange,
  errorMessage,
  helperText,
  disabled,
  name,
  id,
}: VerificationInputProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const hasError = Boolean(errorMessage);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function setDigit(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  }

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value.replace(/[^0-9]/g, "");
    if (!raw) {
      setDigit(index, "");
      return;
    }
    setDigit(index, raw.slice(-1));
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
      setDigit(index - 1, "");
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!pasted) return;
    event.preventDefault();
    onChange(pasted.slice(0, length));
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div className="flex w-full flex-col gap-[var(--spacing-4)]">
      <div className="flex gap-[var(--spacing-16)]">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            id={index === 0 ? baseId : undefined}
            name={name ? `${name}-${index}` : undefined}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            aria-invalid={hasError}
            className={[
              "h-[58px] w-[48px] rounded-[var(--radius-medium)] bg-[var(--color-neutral-white)] text-center font-sans text-[18px] leading-[24px] outline-none transition-colors",
              hasError
                ? "border-2 border-[var(--color-error-primary)] text-[var(--color-error-primary)]"
                : digit
                  ? "border-2 border-[var(--color-action-primary)] text-[var(--color-neutral-gray-9)]"
                  : "border border-[var(--color-neutral-gray-4)] text-[var(--color-neutral-gray-9)] hover:border-[var(--color-neutral-gray-5)] focus:border-2 focus:border-[var(--color-action-primary)]",
            ].join(" ")}
          />
        ))}
      </div>
      {hasError ? (
        <div className="flex items-center gap-[var(--spacing-4)] font-sans text-[14px] leading-[18px] text-[var(--color-error-primary)]">
          <WarningIcon className="size-[16px]" />
          <span>{errorMessage}</span>
        </div>
      ) : helperText ? (
        <p className="font-sans text-[14px] leading-[18px] text-[var(--color-neutral-gray-6)]">{helperText}</p>
      ) : null}
    </div>
  );
}
