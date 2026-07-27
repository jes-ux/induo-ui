import type { HTMLAttributes, ReactNode } from "react";
import { InterfaceEssentialWarningIcon } from "../icons/InterfaceEssentialWarningIcon";
import { ToastSuccessIcon } from "../icons/ToastSuccessIcon";

export type ToastVariant = "default" | "success" | "warning" | "error";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Color semántico. "default" es gris oscuro, para mensajes neutros (ej. sesión expirada). */
  variant?: ToastVariant;
  /** Ícono a la izquierda del mensaje (32px). Por defecto alerta en default/warning/error y check en success; pasar `null` para ocultarlo. */
  icon?: ReactNode | null;
  message: string;
  /** Label del botón de acción transparente. Si no se pasa, el botón no se renderiza. */
  actionLabel?: string;
  onAction?: () => void;
}

const variantStyles: Record<ToastVariant, string> = {
  default: "bg-[var(--color-neutral-gray-9)] border-[var(--color-neutral-gray-9)]",
  success: "bg-[var(--color-success-primary)] border-[var(--color-success-primary)]",
  warning: "bg-[var(--color-warning-primary)] border-[var(--color-warning-primary)]",
  error: "bg-[var(--color-error-primary)] border-[var(--color-error-primary)]",
};

const defaultIcons: Record<ToastVariant, ReactNode> = {
  default: <InterfaceEssentialWarningIcon />,
  success: <ToastSuccessIcon />,
  warning: <InterfaceEssentialWarningIcon />,
  error: <InterfaceEssentialWarningIcon />,
};

export function Toast({
  variant = "default",
  icon,
  message,
  actionLabel,
  onAction,
  className,
  ...props
}: ToastProps) {
  const showIcon = icon !== null;
  const iconNode = icon ?? defaultIcons[variant];

  return (
    <div
      role="status"
      className={[
        "flex h-[var(--height-64)] w-full min-w-[340px] items-center justify-between gap-[var(--spacing-4)]",
        "rounded-[var(--radius-medium)] border pl-[var(--spacing-16)] pr-[var(--spacing-4)] py-[var(--spacing-8)]",
        "text-[var(--color-neutral-white)]",
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="flex min-w-0 items-center gap-[var(--spacing-12)]">
        {showIcon && (
          <span className="flex size-[32px] shrink-0 items-center justify-center [&>svg]:size-[20px]">{iconNode}</span>
        )}
        <span className="min-w-0 font-sans text-body-medium font-normal">{message}</span>
      </span>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 rounded-[var(--radius-medium)] px-[var(--spacing-16)] py-[var(--spacing-8)] font-sans text-body-medium-semibold font-semibold text-[var(--color-neutral-white)] transition-colors hover:bg-white/10 active:bg-white/20"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
