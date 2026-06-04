import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * CloudLens Design System — Button
 *
 * Variants: primary | secondary | ghost | danger
 * Sizes:    default (40px) | sm (34px)
 * Features: loading state with inline spinner, hover lift + glow
 */
const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-[7px]",
    "font-body text-sm font-medium whitespace-nowrap select-none",
    "rounded-radius border border-transparent",
    "transition-all duration-[160ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
    "outline-none cursor-pointer",
    "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-accent text-[#07090e] border-transparent",
          "hover:bg-[#52ffb4] hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(46,255,160,0.26)]",
          "active:translate-y-0 active:shadow-none",
        ].join(" "),
        secondary: [
          "bg-accent-glow text-accent border-accent-bdr",
          "hover:bg-[rgba(46,255,160,0.16)]",
          "active:bg-[rgba(46,255,160,0.12)]",
        ].join(" "),
        ghost: [
          "bg-transparent text-text2 border-border2",
          "hover:text-text hover:border-[rgba(255,255,255,0.18)]",
          "active:bg-[rgba(255,255,255,0.03)]",
        ].join(" "),
        danger: [
          "bg-[rgba(255,82,82,0.09)] text-red border-[rgba(255,82,82,0.2)]",
          "hover:bg-[rgba(255,82,82,0.15)]",
          "active:bg-[rgba(255,82,82,0.2)]",
        ].join(" "),
      },
      size: {
        default: "h-10 px-5 text-[14px]",
        sm: "h-[34px] px-3.5 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

/** 16×16 animated spinner SVG matching the design system spec */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M14 8a6 6 0 00-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** When true, replaces the leading icon with a 16px spinner and disables pointer events without resizing. */
  loading?: boolean;
  /** Content rendered before the label. Replaced by spinner when loading. */
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading = false, icon, children, ...props },
    ref
  ) => {
    return (
      <button
        data-slot="button"
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "pointer-events-none"
        )}
        disabled={props.disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {/* Icon slot — spinner replaces icon during loading, preserving the same 16px box */}
        {(loading || icon) && (
          <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
            {loading ? <Spinner /> : icon}
          </span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, Spinner };
