import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface CategoryCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

export function CategoryCard({ icon, label, className, ...props }: CategoryCardProps) {
  return (
    <button
      className={[
        "flex h-[124px] w-[100px] shrink-0 flex-col items-center justify-center gap-[var(--spacing-8)]",
        "rounded-[var(--radius-large)] border border-[var(--color-action-secondary-pressed)]",
        "bg-[var(--color-action-secondary)] px-[var(--spacing-8)] py-[var(--spacing-20)] transition-colors",
        "hover:bg-[var(--color-action-secondary-hover)] active:bg-[var(--color-action-secondary-pressed)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="flex size-[40px] shrink-0 items-center justify-center text-[var(--color-action-primary)] [&>svg]:size-[40px]">
        {icon}
      </span>
      <span className="w-full [word-break:break-word] text-center font-sans text-body-small-semibold font-semibold text-[var(--color-action-primary)]">
        {label}
      </span>
    </button>
  );
}
