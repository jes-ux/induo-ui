import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";

export interface ItemCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  /** true = fondo en el tono más oscuro (opción elegida), sin importar hover. Pensado para usarse en un grupo de opciones (envío, medio de pago, etc.). */
  selected?: boolean;
  /** Elemento a la derecha. Por defecto el chevron; pasar `null` para ocultarlo. */
  trailing?: ReactNode | null;
}

export function ItemCard({ icon, label, selected = false, trailing, className, ...props }: ItemCardProps) {
  return (
    <button
      aria-pressed={selected}
      className={[
        "flex w-full items-center justify-between gap-[var(--spacing-4)]",
        "rounded-[var(--radius-small)] p-[var(--spacing-4)] text-left transition-colors",
        selected
          ? "bg-[var(--color-action-secondary-pressed)]"
          : "bg-[var(--color-action-secondary)] hover:bg-[var(--color-action-secondary-hover)] active:bg-[var(--color-action-secondary-pressed)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="flex items-center gap-[var(--spacing-4)] min-w-0">
        <span className="flex size-[32px] shrink-0 items-center justify-center rounded-[var(--radius-small)] text-[var(--color-action-primary)] [&>svg]:size-[21px]">
          {icon}
        </span>
        <span className="truncate font-sans text-[18px] leading-[24px] text-[var(--color-neutral-gray-9)]">
          {label}
        </span>
      </span>
      {trailing ?? (
        <span className="flex size-[32px] shrink-0 items-center justify-center text-[var(--color-action-primary)]">
          <ChevronRightIcon className="h-[24px] w-[13px]" />
        </span>
      )}
    </button>
  );
}
