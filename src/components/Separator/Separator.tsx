import type { HTMLAttributes } from "react";

export type SeparatorProps = HTMLAttributes<HTMLHRElement>;

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <hr
      className={["h-0 w-full border-0 border-t border-[var(--color-neutral-gray-3)]", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
