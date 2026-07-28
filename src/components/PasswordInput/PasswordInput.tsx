import { forwardRef, useId, useRef, useState, type FocusEvent, type InputHTMLAttributes } from "react";
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
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = Boolean(errorMessage);
  const hasValue = Boolean(props.value);

  const handleWrapperBlur = (event: FocusEvent<HTMLDivElement>) => {
    // El foco puede moverse del input al botón de mostrar/ocultar (o viceversa) sin que el
    // usuario "termine de editar" — el tracking va en el wrapper entero (bubbling), no solo en
    // el input, porque el botón también puede quedarse con el foco después de tocarlo.
    if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
      // requestAnimationFrame, no directo: si el blur lo dispara un click en un botón debajo del
      // panel (ej. el submit del form), colapsar el panel EN EL MISMO tick corre ese botón hacia
      // arriba entre el mousedown y el mouseup del click — el navegador ve que el mouseup cae
      // sobre otro elemento y el click nunca llega a disparar. Confirmado en vivo con Playwright
      // (un click con coordenadas reales, no un .click() programático) contra la página de
      // signup de induo-app: el submit quedaba completamente muerto. Difiriendo el colapso un
      // frame, el click ya terminó de procesarse contra el layout viejo antes de que se mueva.
      requestAnimationFrame(() => setIsFocused(false));
    }
  };

  return (
    <div className="flex w-full flex-col gap-[var(--spacing-8)]">
      <div className="flex w-full flex-col gap-[var(--spacing-4)]">
        <div
          ref={wrapperRef}
          onFocus={() => setIsFocused(true)}
          onBlur={handleWrapperBlur}
          className={[
            "flex h-[var(--height-56)] w-full items-center justify-between gap-[var(--spacing-16)]",
            "rounded-[var(--radius-medium)] bg-[var(--color-neutral-white)] px-[var(--spacing-16)]",
            hasError
              ? "border-2 border-[var(--color-error-primary)]"
              : [
                  hasValue ? "border border-[var(--color-neutral-gray-5)]" : "border border-[var(--color-neutral-gray-4)]",
                  /* not-focus-within: evita que hover y focus-within empaten en especificidad — Tailwind v4 siempre
                     emite el bloque @media (hover:hover) después de focus-within, así que sin esto el mouse quieto
                     sobre el input (típico justo después de hacer click para escribir) pisaba el borde violeta con gris */
                  "not-focus-within:hover:border-[var(--color-neutral-gray-5)]",
                  "focus-within:border-2 focus-within:border-[var(--color-action-primary)]",
                ].join(" "),
          ].join(" ")}
        >
          <input
            id={inputId}
            type={visible ? "text" : "password"}
            className={[
              "min-w-0 flex-1 bg-transparent font-sans text-body-large font-normal outline-none",
              "placeholder:text-[var(--color-neutral-gray-5)]",
              hasError ? "text-[var(--color-error-primary)]" : "text-[var(--color-neutral-black)]",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={visible}
            className="flex size-[24px] shrink-0 items-center justify-center text-[var(--color-neutral-gray-9)]"
          >
            {visible ? (
              // Tamaño natural del glyph (viewBox 18.8995x14.9), sin estirar — el componente
              // Figma real ("Eye, Show, Visible") lo insertea dentro de su slot de 24x24 con
              // insets porcentuales (18.96% vertical / 10.63% horizontal), que dan exactamente
              // este tamaño. El botón padre ya lo centra (items-center justify-center). Ver CLAUDE.md.
              <InterfaceEssentialEyeShowIcon className="h-[14.9px] w-[18.9px]" />
            ) : (
              <InterfaceEssentialEyeHideIcon className="size-[24px]" />
            )}
          </button>
        </div>
        {hasError && (
          <div
            id={`${inputId}-error`}
            className="flex items-center gap-[var(--spacing-8)] font-sans text-body-small font-normal text-[var(--color-error-primary)]"
          >
            <WarningIcon className="size-[16px]" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {isFocused && !hasError && requirements && requirements.length > 0 && (
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
