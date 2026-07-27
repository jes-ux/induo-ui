import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ItemcardTrailingChevronIcon } from "../icons/ItemcardTrailingChevronIcon";

export interface ItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ícono dentro del contenedor gris redondeado (24px sugerido; el contenedor es fijo 32x32). */
  icon: ReactNode;
  label: string;
  /** Texto secundario debajo del label, opcional (el kit lo prevé pero no siempre se usa). */
  subtitle?: string;
  /** Elemento a la derecha. Por defecto la flecha; pasar `null` para ocultarlo (ej. si el trailing es un switch). */
  trailing?: ReactNode | null;
}

export function ItemButton({ icon, label, subtitle, trailing, className, ...props }: ItemButtonProps) {
  const showDefaultTrailing = trailing !== null;

  return (
    <button
      className={[
        "flex h-[var(--height-68)] w-full items-center justify-between gap-[var(--spacing-4)]",
        "bg-[var(--color-neutral-white)] p-[var(--spacing-4)] text-left transition-colors",
        "hover:bg-[var(--color-neutral-gray-2)] active:bg-[var(--color-neutral-gray-1)]",
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
        <span className="flex flex-col items-start justify-center gap-[var(--spacing-4)] min-w-0">
          <span className="truncate font-sans text-[18px] leading-[24px] text-[var(--color-neutral-gray-9)]">
            {label}
          </span>
          {subtitle && (
            <span className="truncate font-sans text-[14px] leading-[18px] text-[var(--color-neutral-gray-6)]">
              {subtitle}
            </span>
          )}
        </span>
      </span>
      {trailing ??
        (showDefaultTrailing && (
          <span className="flex size-[32px] shrink-0 items-center justify-center text-[var(--color-action-primary)]">
            <ItemcardTrailingChevronIcon className="h-[12px] w-[6.5px]" />
          </span>
        ))}
    </button>
  );
}
