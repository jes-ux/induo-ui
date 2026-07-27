import type { HTMLAttributes } from "react";

export interface ContextualCardProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  /** Label del CTA de texto a la derecha. Si no se pasa, no se renderiza. */
  actionLabel?: string;
  onAction?: () => void;
}

export function ContextualCard({ message, actionLabel, onAction, className, ...props }: ContextualCardProps) {
  return (
    <div
      className={[
        "flex w-full items-center gap-[var(--spacing-16)]",
        "rounded-[var(--radius-medium)] bg-[var(--color-neutral-gray-1)] p-[var(--spacing-16)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {/* Figma usa 18px/22px acá, no el par 18/24 de --text-body-large */}
      <p className="flex-1 font-sans text-[length:var(--text-body-large)] font-normal leading-[22px] text-[var(--color-neutral-black)]">
        {message}
      </p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 font-sans text-body-large-semibold font-semibold text-[var(--color-action-primary)]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
