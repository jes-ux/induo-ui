import type { HTMLAttributes } from "react";

export type BadgeVariant = "information" | "success" | "warning" | "error" | "action";
export type BadgeSize = "regular" | "small";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Sigue el mismo par Primary/Secondary de color que el resto del sistema (Action, Success, Warning, Error, Information). */
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  information: "bg-[var(--color-information-secondary)] text-[var(--color-information-primary)]",
  success: "bg-[var(--color-success-secondary)] text-[var(--color-success-primary)]",
  warning: "bg-[var(--color-warning-secondary)] text-[var(--color-warning-primary)]",
  error: "bg-[var(--color-error-secondary)] text-[var(--color-error-primary)]",
  action: "bg-[var(--color-action-secondary)] text-[var(--color-action-primary)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  regular: "px-[var(--spacing-8)] py-[var(--spacing-4)] text-body-medium",
  small: "px-[var(--spacing-4)] py-[var(--spacing-1)] text-body-small",
};

export function Badge({ variant = "information", size = "regular", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex w-fit items-center rounded-[var(--radius-small)] font-sans font-normal whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
