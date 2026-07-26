import type { HTMLAttributes, ReactNode } from "react";

export interface ProductCarouselProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  /** Ej. "Mostrar todo". Opcional, se oculta si no se pasa. */
  seeAllLabel?: string;
  onSeeAll?: () => void;
  /** `ProductCard` instances. */
  children: ReactNode;
}

export function ProductCarousel({
  title,
  seeAllLabel,
  onSeeAll,
  children,
  className,
  ...props
}: ProductCarouselProps) {
  return (
    <div className={["flex w-full flex-col gap-[var(--spacing-8)]", className].filter(Boolean).join(" ")} {...props}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[var(--spacing-8)]">
          <span className="font-sans text-[18px] font-semibold leading-[24px] text-[var(--color-neutral-gray-9)]">
            {title}
          </span>
          {seeAllLabel && (
            <button
              type="button"
              onClick={onSeeAll}
              className="font-sans text-[18px] font-semibold leading-[24px] text-[var(--color-action-primary)]"
            >
              {seeAllLabel}
            </button>
          )}
        </div>
        <span className="flex shrink-0 items-center gap-[8px]">
          <span className="size-[8px] shrink-0 rounded-full bg-[var(--color-action-primary)]" />
          <span className="size-[8px] shrink-0 rounded-full bg-[var(--color-action-secondary)]" />
          <span className="size-[8px] shrink-0 rounded-full bg-[var(--color-action-secondary)]" />
          <span className="size-[4px] shrink-0 rounded-full bg-[var(--color-action-secondary)]" />
        </span>
      </div>
      <div className="flex w-full gap-[var(--spacing-4)] overflow-x-auto">{children}</div>
    </div>
  );
}
