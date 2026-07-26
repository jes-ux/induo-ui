import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";

export interface ItemCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  /** true = borde y fondo resaltados (opción elegida). Pensado para usarse en un grupo de opciones (envío, medio de pago, etc.). */
  selected?: boolean;
  /** Elemento a la derecha. Por defecto la flecha; pasar `null` para ocultarlo. */
  trailing?: ReactNode | null;
}

export function ItemCard({ icon, label, selected = false, trailing, className, ...props }: ItemCardProps) {
  return (
    <button
      aria-pressed={selected}
      className={[
        "flex w-full items-center justify-between gap-[var(--spacing-4)]",
        "rounded-[var(--radius-small)] border p-[var(--spacing-4)] text-left transition-colors",
        selected
          ? "border-[var(--color-action-primary)] bg-[var(--color-action-secondary-hover)]"
          : "border-transparent hover:bg-[var(--color-neutral-gray-1)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="flex items-center gap-[var(--spacing-4)] min-w-0">
        <span
          className={[
            "flex size-[32px] shrink-0 items-center justify-center rounded-[var(--radius-small)]",
            "text-[var(--color-neutral-gray-9)] [&>svg]:size-[20px]",
            selected ? "bg-[var(--color-neutral-white)]" : "bg-[var(--color-neutral-gray-1)]",
          ].join(" ")}
        >
          {icon}
        </span>
        <span className="truncate font-sans text-[18px] leading-[24px] text-[var(--color-neutral-gray-9)]">
          {label}
        </span>
      </span>
      {trailing ?? <ArrowRightIcon className="size-[32px] shrink-0 text-[var(--color-neutral-gray-9)]" />}
    </button>
  );
}
