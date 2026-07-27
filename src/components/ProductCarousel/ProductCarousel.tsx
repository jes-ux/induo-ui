import { useRef, useState, type HTMLAttributes, type ReactNode, type UIEvent } from "react";
import { Button } from "../Button/Button";

export interface ProductCarouselProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  /** Ej. "Mostrar todo". Opcional, se oculta si no se pasa. */
  seeAllLabel?: string;
  onSeeAll?: () => void;
  /** `ProductCard` instances. */
  children: ReactNode;
}

const DOT_COUNT = 4;
const LAST_DOT = DOT_COUNT - 1;

function getDotSize(index: number, activeDot: number) {
  if (activeDot === 0 && index === LAST_DOT) return "4px";
  if (activeDot === LAST_DOT && index === 0) return "4px";
  return "8px";
}

export function ProductCarousel({
  title,
  seeAllLabel,
  onSeeAll,
  children,
  className,
  ...props
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    setActiveDot(Math.round(ratio * (DOT_COUNT - 1)));
  };

  return (
    <div className={["flex w-full flex-col gap-[var(--spacing-8)]", className].filter(Boolean).join(" ")} {...props}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[var(--spacing-8)]">
          <span className="font-sans text-body-large-semibold font-semibold text-[var(--color-neutral-gray-9)]">
            {title}
          </span>
          {seeAllLabel && (
            <Button variant="text" icon={null} onClick={onSeeAll}>
              {seeAllLabel}
            </Button>
          )}
        </div>
        <span className="flex shrink-0 items-center gap-[8px]">
          {Array.from({ length: DOT_COUNT }, (_, index) => {
            const size = getDotSize(index, activeDot);
            return (
              <span
                key={index}
                className="shrink-0 rounded-full transition-all"
                style={{
                  width: size,
                  height: size,
                  backgroundColor:
                    index === activeDot ? "var(--color-action-primary)" : "var(--color-action-secondary)",
                }}
              />
            );
          })}
        </span>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full gap-[var(--spacing-4)] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
