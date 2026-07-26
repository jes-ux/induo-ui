import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import { InfoCircleIcon } from "../icons/InfoCircleIcon";
import { CloseIcon } from "../icons/CloseIcon";

export interface TooltipProps {
  /** Elemento que dispara el tooltip (recibe los handlers de Radix vía asChild). */
  children: ReactNode;
  message: string;
  /** Ícono a la izquierda del mensaje. Por defecto InfoCircleIcon. */
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  /** Si viene definida, muestra el botón de cerrar (X) arriba a la derecha. */
  onClose?: () => void;
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Tooltip({
  children,
  message,
  icon,
  actionLabel,
  onAction,
  onClose,
  side = "top",
  open,
  defaultOpen,
  onOpenChange,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={8}
            className="z-50 flex max-w-[343px] flex-col gap-[var(--spacing-16)] rounded-[var(--radius-medium)] bg-[var(--color-neutral-gray-9)] p-[var(--spacing-16)] shadow-[0px_2px_6px_rgba(0,0,0,0.15),0px_6px_10px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-start gap-[var(--spacing-16)]">
              <div className="flex flex-1 items-start gap-[var(--spacing-8)]">
                <span className="flex size-[24px] shrink-0 items-center justify-center text-[var(--color-neutral-white)]">
                  {icon ?? <InfoCircleIcon className="size-[24px]" />}
                </span>
                <p className="flex-1 font-sans text-[16px] leading-[20px] text-[var(--color-neutral-white)]">
                  {message}
                </p>
              </div>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="shrink-0 text-[var(--color-neutral-white)]"
                >
                  <CloseIcon className="size-[24px]" />
                </button>
              )}
            </div>
            {actionLabel && (
              <button
                type="button"
                onClick={onAction}
                className="text-left font-sans text-[16px] leading-[24px] text-[var(--color-neutral-white)] underline"
              >
                {actionLabel}
              </button>
            )}
            <TooltipPrimitive.Arrow width={12} height={6} className="fill-[var(--color-neutral-gray-9)]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
