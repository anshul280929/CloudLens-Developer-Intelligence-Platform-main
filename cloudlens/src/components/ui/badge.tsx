import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * CloudLens Design System — Badge
 *
 * Cloud Provider variants: aws | gcp | azure | vercel | stripe | supabase
 * Scan Status variants:    complete | scanning | failed | never-scanned
 * Generic:                 default | info
 */
const badgeVariants = cva(
  [
    "inline-flex items-center gap-[5px]",
    "px-[10px] py-[4px] rounded-full",
    "text-[12px] font-medium font-mono leading-none whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        /* ── Cloud Providers ── */
        aws: "bg-[rgba(245,177,32,0.10)] text-[#f5b120] border border-[rgba(245,177,32,0.2)]",
        gcp: "bg-[rgba(78,143,255,0.10)] text-[#4e8fff] border border-[rgba(78,143,255,0.2)]",
        azure:
          "bg-[rgba(0,144,255,0.10)] text-[#0090ff] border border-[rgba(0,144,255,0.2)]",
        vercel:
          "bg-[rgba(255,255,255,0.06)] text-text border border-border2",
        stripe:
          "bg-[rgba(99,91,255,0.10)] text-[#635bff] border border-[rgba(99,91,255,0.2)]",
        supabase:
          "bg-[rgba(62,207,142,0.10)] text-[#3ecf8e] border border-[rgba(62,207,142,0.2)]",

        /* ── Scan Status ── */
        complete:
          "bg-accent-glow text-accent border border-accent-bdr",
        scanning:
          "bg-[rgba(245,177,32,0.10)] text-amber border border-[rgba(245,177,32,0.2)]",
        failed:
          "bg-[rgba(255,82,82,0.09)] text-red border border-[rgba(255,82,82,0.2)]",
        "never-scanned":
          "bg-elevated text-text3 border border-border2",

        /* ── Generic ── */
        default:
          "bg-accent-glow text-accent border border-accent-bdr",
        info: "bg-[rgba(78,143,255,0.10)] text-blue border border-[rgba(78,143,255,0.2)]",
      },
      size: {
        default: "px-[10px] py-[4px] text-[12px]",
        sm: "px-[8px] py-[3px] text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/** Static dot indicator — 6×6 circle inheriting text color */
function BadgeDot({ pulse = false, className }: { pulse?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "w-1.5 h-1.5 rounded-full bg-current shrink-0",
        pulse && "animate-badge-pulse",
        className
      )}
      aria-hidden="true"
    />
  );
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show the leading dot indicator. Defaults to true for all variants except never-scanned. */
  showDot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, showDot, children, ...props }, ref) => {
    const isScanning = variant === "scanning";
    const isNeverScanned = variant === "never-scanned";

    // Default: show dot for everything except never-scanned
    const shouldShowDot = showDot ?? !isNeverScanned;

    return (
      <span
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {shouldShowDot && <BadgeDot pulse={isScanning} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, BadgeDot };
