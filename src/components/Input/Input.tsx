import { useId, type InputHTMLAttributes } from "react";
import { WarningIcon } from "../icons/WarningIcon";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Texto de ayuda debajo del campo. Se oculta si hay errorMessage. */
  helperText?: string;
  /** Si viene definido, el input entra en estado de error (borde y texto rojo) sin importar el foco. */
  errorMessage?: string;
}

/**
 * Los 5 estados de Figma (Default/Hover/Active/Complete/Error) se resuelven acá con CSS nativo:
 * - Default/Complete: placeholder gris vs. texto tipeado oscuro, vía `::placeholder`.
 * - Hover: pseudo-clase `hover:`.
 * - Active: pseudo-clase `focus:`.
 * - Error: prop `errorMessage`, tiene prioridad sobre hover/focus.
 */
export function Input({ helperText, errorMessage, className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = Boolean(errorMessage);

  return (
    <div className="flex w-full flex-col gap-[var(--spacing-4)]">
      <input
        id={inputId}
        className={[
          "h-[var(--height-56)] w-full rounded-[var(--radius-medium)] bg-[var(--color-neutral-white)]",
          "px-[var(--spacing-16)] font-sans text-body-large font-normal",
          "text-[var(--color-neutral-gray-9)] placeholder:text-[var(--color-neutral-gray-5)]",
          "outline-none transition-colors",
          hasError
            ? "border-2 border-[var(--color-error-primary)] text-[var(--color-error-primary)]"
            : [
                "border border-[var(--color-neutral-gray-4)]",
                "hover:border-[var(--color-neutral-gray-5)]",
                "focus:border-2 focus:border-[var(--color-action-primary)]",
              ].join(" "),
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={hasError}
        aria-describedby={helperText || errorMessage ? `${inputId}-desc` : undefined}
        {...props}
      />
      {hasError ? (
        <div
          id={`${inputId}-desc`}
          className="flex items-center gap-[var(--spacing-4)] font-sans text-body-small font-normal text-[var(--color-error-primary)]"
        >
          <WarningIcon className="size-[16px]" />
          <span>{errorMessage}</span>
        </div>
      ) : helperText ? (
        <p id={`${inputId}-desc`} className="font-sans text-body-small font-normal text-[var(--color-neutral-gray-6)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
