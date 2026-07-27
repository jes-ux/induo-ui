import type { HTMLAttributes, ReactNode } from "react";

export type ItemListVariant = "information" | "success" | "warning" | "error";

export interface ItemListProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  /** Color semántico del ícono y del status label. */
  variant?: ItemListVariant;
  title: string;
  amount: string;
  statusLabel: string;
  date: string;
}

const variantStyles: Record<ItemListVariant, { iconBg: string; primaryText: string }> = {
  information: { iconBg: "bg-[var(--color-information-secondary)]", primaryText: "text-[var(--color-information-primary)]" },
  success: { iconBg: "bg-[var(--color-success-secondary)]", primaryText: "text-[var(--color-success-primary)]" },
  warning: { iconBg: "bg-[var(--color-warning-secondary)]", primaryText: "text-[var(--color-warning-primary)]" },
  error: { iconBg: "bg-[var(--color-error-secondary)]", primaryText: "text-[var(--color-error-primary)]" },
};

export function ItemList({
  icon,
  variant = "information",
  title,
  amount,
  statusLabel,
  date,
  className,
  ...props
}: ItemListProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={["flex w-full items-center gap-[var(--spacing-8)] bg-[var(--color-neutral-white)] py-[var(--spacing-16)]", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span
        className={[
          "flex size-[32px] shrink-0 items-center justify-center rounded-[var(--radius-small)] [&>svg]:size-[20px]",
          styles.iconBg,
          styles.primaryText,
        ].join(" ")}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[var(--spacing-1)]">
        <span className="flex w-full items-center justify-between gap-[var(--spacing-4)]">
          <span className="truncate font-sans text-body-medium font-normal text-[var(--color-neutral-gray-9)]">
            {title}
          </span>
          <span className="shrink-0 font-sans text-body-medium font-normal text-[var(--color-neutral-gray-9)]">
            {amount}
          </span>
        </span>
        <span className="flex w-full items-center justify-between gap-[var(--spacing-4)]">
          <span className={["truncate font-sans text-body-small font-normal", styles.primaryText].join(" ")}>
            {statusLabel}
          </span>
          <span className="shrink-0 font-sans text-body-small font-normal text-[var(--color-neutral-gray-9)]">
            {date}
          </span>
        </span>
      </span>
    </div>
  );
}
