import type { SVGProps } from "react";

export function InfoCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={2} />
      <path d="M12 11v5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <path d="M12 7.99v.01" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
