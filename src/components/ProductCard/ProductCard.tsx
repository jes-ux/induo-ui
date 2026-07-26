import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ProductCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
  imageAlt?: string;
  /** Ej. `<Badge variant="information" size="small">Novedad</Badge>`. Opcional. */
  badge?: ReactNode;
  brand: string;
  title: string;
  price: string;
  /** Ej. "Envío Gratis". Opcional, se oculta si no se pasa. */
  shipping?: string;
}

export function ProductCard({
  image,
  imageAlt = "",
  badge,
  brand,
  title,
  price,
  shipping,
  className,
  ...props
}: ProductCardProps) {
  return (
    <button
      type="button"
      className={[
        "flex w-[160px] shrink-0 flex-col items-start border-0 bg-transparent p-0 text-left appearance-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="flex size-[160px] shrink-0 items-center justify-center overflow-hidden rounded-t-[var(--radius-large)] border border-[var(--color-neutral-gray-4)] bg-[var(--color-neutral-white)] p-[var(--spacing-8)]">
        <img src={image} alt={imageAlt} className="size-full object-cover" />
      </span>
      <span className="flex h-[183px] w-full flex-col gap-[var(--spacing-12)] rounded-b-[var(--radius-large)] border-x border-b border-[var(--color-neutral-gray-4)] bg-[var(--color-neutral-white)] p-[var(--spacing-12)]">
        <span className="flex w-full flex-col items-start gap-[var(--spacing-4)]">
          {badge}
          <span className="font-sans text-[16px] font-semibold leading-[20px] text-[var(--color-neutral-gray-9)]">
            {brand}
          </span>
          <span className="line-clamp-2 w-full font-sans text-[14px] leading-[18px] text-[var(--color-neutral-gray-9)]">
            {title}
          </span>
        </span>
        <span className="flex w-full flex-col items-start gap-[var(--spacing-4)]">
          <span className="font-sans text-[18px] font-semibold leading-[24px] text-[var(--color-neutral-gray-9)]">
            {price}
          </span>
          {shipping && (
            <span className="font-sans text-[14px] font-semibold leading-[18px] text-[var(--color-information-primary)]">
              {shipping}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}
