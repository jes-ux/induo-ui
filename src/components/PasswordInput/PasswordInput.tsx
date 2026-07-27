import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";
import { InterfaceEssentialEyeShowIcon } from "../icons/InterfaceEssentialEyeShowIcon";
import { InterfaceEssentialEyeHideIcon } from "../icons/InterfaceEssentialEyeHideIcon";
import { InterfaceEssentialCheckThinIcon } from "../icons/InterfaceEssentialCheckThinIcon";
import { InterfaceEssentialCrossThinIcon } from "../icons/InterfaceEssentialCrossThinIcon";
import { WarningIcon } from "../icons/WarningIcon";

export type PasswordStrength = "weak" | "medium" | "strong";

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Nivel de fortaleza. Colorea y llena la barra dentro del panel de requisitos. */
  strength?: PasswordStrength;
  /** Lista de requisitos con su estado cumplido/no cumplido. Si se pasa, se muestra el panel gris (título + barra + checklist). */
  requirements?: PasswordRequirement[];
  requirementsTitle?: string;
  requirementsHelperText?: string;
  /** Si viene definida, el input entra en estado de error (borde rojo 2px) y se muestra el mensaje debajo con ícono de warning. */
  errorMessage?: string;
}

const strengthStyles: Record<PasswordStrength, { fill: string; color: string }> = {
  weak: { fill: "15%", color: "var(--color-error-primary)" },
  medium: { fill: "56%", color: "var(--color-warning-primary)" },
  strong: { fill: "71%", color: "var(--color-success-primary)" },
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  {
    strength,
    requirements,
    requirementsTitle = "Escribe una contraseña",
    requirementsHelperText = "Por tu seguridad, la contraseña debe cumplir con estos requisitos:",
    errorMessage,
    className,
    id,
    ...props
  },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = Boolean(errorMessage);

  return (
    <div className="flex w-full flex-col gap-[var(--spacing-8)]">
      <div className="flex w-full flex-col gap-[var(--spacing-4)]">
        <div
          className={[
            "flex h-[52px] w-full items-center justify-between gap-[var(--spacing-16)]",
            "rounded-[var(--radius-medium)] bg-[var(--color-neutral-white)] px-[var(--spacing-16)]",
            hasError ? "border-2 border-[var(--color-error-primary)]" : "border border-[var(--color-neutral-gray-5)]",
          ].join(" ")}
        >
          <input
            id={inputId}
            type={visible ? "text" : "password"}
            className={[
              "min-w-0 flex-1 bg-transparent font-sans text-body-small font-normal outline-none",
              hasError ? "text-[var(--color-error-primary)]" : "text-[var(--color-neutral-black)]",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={hasError}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="flex size-[24px] shrink-0 items-center justify-center text-[var(--color-neutral-gray-9)]"
          >
            {visible ? (
              <InterfaceEssentialEyeHideIcon className="size-[24px]" />
            ) : (
              <InterfaceEssentialEyeShowIcon className="h-[19px] w-[24px]" />
            )}
          </button>
        </div>
        {hasError && (
          <div className="flex items-center gap-[var(--spacing-8)] font-sans text-body-small font-normal text-[var(--color-error-primary)]">
            <WarningIcon className="size-[16px]" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {requirements && requirements.length > 0 && (
        <div className="flex w-full flex-col gap-[var(--spacing-12)] rounded-[var(--radius-medium)] bg-[var(--color-neutral-gray-1)] p-[var(--spacing-16)]">
          <div className="flex w-full flex-col gap-[var(--spacing-12)]">
            {/* Figma usa 16px/18px acá, no el par 16/20 de --text-body-medium-semibold */}
            <p className="font-sans text-[length:var(--text-body-medium-semibold)] font-semibold leading-[18px] text-[var(--color-neutral-black)]">
              {requirementsTitle}
            </p>
            <div className="h-[11px] w-full overflow-hidden rounded-full bg-[var(--color-neutral-gray-2)]">
              {strength && (
                <div
                  className="h-full rounded-full"
                  style={{ width: strengthStyles[strength].fill, backgroundColor: strengthStyles[strength].color }}
                />
              )}
            </div>
          </div>
          {/* Figma usa 14px/20px acá, no el par 14/18 de --text-body-small */}
          <p className="font-sans text-[length:var(--text-body-small)] leading-[20px] text-[var(--color-neutral-black)]">
            {requirementsHelperText}
          </p>
          <ul className="flex w-full flex-col gap-[var(--spacing-4)]">
            {requirements.map((req) => (
              <li key={req.label} className="flex items-center gap-[var(--spacing-4)]">
                <span
                  className={[
                    "flex size-[24px] shrink-0 items-center justify-center",
                    req.met ? "text-[var(--color-success-primary)]" : "text-[var(--color-error-primary)]",
                  ].join(" ")}
                >
                  {req.met ? (
                    <InterfaceEssentialCheckThinIcon className="h-[11px] w-[16px]" />
                  ) : (
                    <InterfaceEssentialCrossThinIcon className="size-[11px]" />
                  )}
                </span>
                <span className="font-sans text-[length:var(--text-body-small)] leading-[20px] text-[var(--color-neutral-black)]">
                  {req.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
