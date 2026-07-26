import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ItemcardTrailingChevronIcon } from "../icons/ItemcardTrailingChevronIcon";

export interface SpecialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  /** Elemento a la derecha. Por defecto el chevron; pasar `null` para ocultarlo. */
  trailing?: ReactNode | null;
}

export function SpecialButton({ icon, label, trailing, className, ...props }: SpecialButtonProps) {
  const showDefaultTrailing = trailing !== null;

  return (
    <button
      className={[
        "flex h-[var(--height-68)] w-full items-center justify-between gap-[var(--spacing-8)]",
        "rounded-[var(--radius-small)] border border-[var(--color-action-secondary-pressed)]",
        "bg-[var(--color-action-secondary)] pl-[var(--spacing-12)] pr-[var(--spacing-8)] py-[var(--spacing-4)]",
        "text-left transition-colors",
        "hover:bg-[var(--color-action-secondary-hover)] active:bg-[var(--color-action-secondary-pressed)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="flex min-w-0 items-center gap-[var(--spacing-8)]">
        <span className="flex size-[32px] shrink-0 items-center justify-center rounded-[var(--radius-small)] bg-[var(--color-action-secondary)] text-[var(--color-action-primary)] [&>svg]:size-[28px]">
          {icon}
        </span>
        <span className="truncate font-sans text-[18px] leading-[24px] text-[var(--color-action-primary)]">
          {label}
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
