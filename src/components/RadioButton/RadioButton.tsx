import { useId, type InputHTMLAttributes } from "react";

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
}

export function RadioButton({ label, className, id, disabled, ...props }: RadioButtonProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={[
        "inline-flex items-center gap-[var(--spacing-8)]",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="relative inline-flex size-[20px] shrink-0">
        <input
          id={inputId}
          type="radio"
          disabled={disabled}
          className="peer absolute inset-0 size-full cursor-pointer appearance-none disabled:cursor-not-allowed"
          {...props}
        />
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 rounded-full border transition-colors",
            "border-[var(--color-neutral-gray-4)] bg-[var(--color-neutral-white)]",
            "peer-hover:border-[var(--color-neutral-gray-5)]",
            "peer-checked:border-2 peer-checked:border-[var(--color-action-primary)] peer-checked:bg-[var(--color-action-primary)]",
            "peer-disabled:border-[var(--color-neutral-gray-4)] peer-disabled:bg-[var(--color-neutral-gray-1)]",
            "peer-disabled:peer-checked:border-[var(--color-neutral-gray-4)] peer-disabled:peer-checked:bg-[var(--color-neutral-gray-4)]",
          ].join(" ")}
        />
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 m-auto hidden size-[6px] rounded-full bg-[var(--color-neutral-white)]",
            "peer-checked:block",
            "peer-disabled:peer-checked:bg-[var(--color-neutral-gray-3)]",
          ].join(" ")}
        />
      </span>
      {label && (
        <span className="font-sans text-body-medium font-normal text-[var(--color-neutral-gray-9)]">{label}</span>
      )}
    </label>
  );
}
