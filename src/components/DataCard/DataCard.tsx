import type { HTMLAttributes } from "react";
import { InterfaceEssentialPenEditIcon } from "../icons/InterfaceEssentialPenEditIcon";

export interface DataCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  editLabel?: string;
  /** Si se pasa, se muestra el CTA "Editar" con ícono de lápiz. */
  onEdit?: () => void;
}

export function DataCard({ label, value, editLabel = "Editar", onEdit, className, ...props }: DataCardProps) {
  return (
    <div
      className={[
        "flex w-[340px] flex-col items-start gap-[var(--spacing-12)]",
        "rounded-[var(--radius-small)] border border-[var(--color-neutral-gray-4)] bg-[var(--color-neutral-white)] p-[var(--spacing-16)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="flex flex-col items-start gap-[var(--spacing-1)]">
        {/* Figma usa 14px/24px acá, no el par 14/18 de --text-body-small */}
        <span className="font-sans text-[length:var(--text-body-small)] font-normal leading-[24px] text-[var(--color-neutral-gray-9)]">
          {label}
        </span>
        <span className="font-sans text-body-large font-normal text-[var(--color-neutral-gray-9)]">{value}</span>
      </div>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="flex h-[20px] items-center gap-[var(--spacing-8)] font-sans text-body-medium-semibold font-semibold text-[var(--color-action-primary)]"
        >
          {editLabel}
          <InterfaceEssentialPenEditIcon className="size-[16px]" />
        </button>
      )}
    </div>
  );
}
