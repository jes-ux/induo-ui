import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "text";
export type ButtonSize = "medium" | "small";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual. Mapea 1:1 a las variantes "Primary Out", "Secondary Out", "Outlined" y "Text" de Figma. */
  variant?: ButtonVariant;
  /** "medium" = 52px de alto (default). "small" solo aplica a variant="outlined" (28px) y variant="text" (16px de texto en vez de 18px). */
  size?: ButtonSize;
  /** Icono a la derecha del label. Por defecto la flecha del kit; pasar `null` para ocultarlo. */
  icon?: ReactNode | null;
}

const base =
  "inline-flex items-center justify-center gap-[var(--spacing-8)] rounded-[var(--radius-medium)] font-sans font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "h-[var(--height-52)] px-[var(--spacing-20)] text-body-large-semibold " +
    "bg-[var(--color-action-primary)] text-[var(--color-neutral-white)] " +
    "hover:bg-[var(--color-action-primary-hover)] active:bg-[var(--color-action-primary-pressed)] " +
    "disabled:bg-[var(--color-neutral-gray-1)] disabled:text-[var(--color-neutral-gray-5)] " +
    "disabled:border disabled:border-[var(--color-neutral-gray-4)]",
  secondary:
    "h-[var(--height-52)] px-[var(--spacing-20)] text-body-large-semibold " +
    "bg-[var(--color-action-secondary)] text-[var(--color-action-primary)] " +
    "hover:bg-[var(--color-action-secondary-hover)] active:bg-[var(--color-action-secondary-pressed)] " +
    "disabled:bg-[var(--color-neutral-gray-1)] disabled:text-[var(--color-neutral-gray-5)] " +
    "disabled:border disabled:border-[var(--color-neutral-gray-4)]",
  outlined:
    "h-[28px] px-[var(--spacing-8)] gap-[var(--spacing-4)] rounded-[var(--radius-small)] text-body-medium-semibold border " +
    "border-[var(--color-action-primary)] text-[var(--color-action-primary)] bg-transparent " +
    "hover:bg-[var(--color-action-secondary-hover)] active:bg-[var(--color-action-secondary-pressed)] " +
    "disabled:bg-[var(--color-neutral-gray-1)] disabled:text-[var(--color-neutral-gray-5)] disabled:border-[var(--color-neutral-gray-4)]",
  text:
    "h-[var(--height-20)] px-0 bg-transparent text-[var(--color-action-primary)] " +
    "hover:text-[var(--color-action-primary-hover)] active:text-[var(--color-action-primary-pressed)] " +
    "disabled:text-[var(--color-neutral-gray-5)]",
};

// El variant "text" tiene dos tamaños reales en el kit: 18px ("Big Text") y 16px ("Regular Text").
const textSizeStyles: Record<ButtonSize, string> = {
  medium: "text-body-large-semibold",
  small: "text-body-medium-semibold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "medium", icon, children, className, disabled, ...props },
  ref,
) {
  const showIcon = icon !== null;
  const iconNode = icon ?? <ArrowRightIcon className="size-[18px]" />;

  return (
    <button
      ref={ref}
      className={[
        base,
        variantStyles[variant],
        variant === "text" ? textSizeStyles[size] : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled}
      {...props}
    >
      {children}
      {showIcon && iconNode}
    </button>
  );
});
