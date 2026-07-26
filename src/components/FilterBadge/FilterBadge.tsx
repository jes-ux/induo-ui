import type { HTMLAttributes } from "react";
import { FilterBadgeCloseIcon } from "../icons/FilterBadgeCloseIcon";

export interface FilterBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  /** Si se pasa, muestra el botón de cerrar (X). */
  onRemove?: () => void;
}

export function FilterBadge({ label, onRemove, className, ...props }: FilterBadgeProps) {
  return (
    <span
      className={[
        "inline-flex h-[28px] w-fit items-center gap-[7px] rounded-[var(--radius-small)]",
        "bg-[var(--color-action-secondary)] px-[var(--spacing-8)] py-[var(--spacing-4)]",
        "whitespace-nowrap font-sans text-[16px] leading-[20px] text-[var(--color-action-primary)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Quitar filtro ${label}`}
          className="flex shrink-0 items-center justify-center text-[var(--color-action-primary)]"
        >
          <FilterBadgeCloseIcon className="size-[12px]" />
        </button>
      )}
    </span>
  );
}
