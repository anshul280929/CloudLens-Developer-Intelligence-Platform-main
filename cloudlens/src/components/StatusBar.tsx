import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  dotColor?: "accent" | "blue" | "amber" | "red" | "text3" | string;
  pulse?: boolean;
}

export const StatusBar = React.forwardRef<HTMLDivElement, StatusBarProps>(
  ({ className, label, dotColor = "accent", pulse = false, ...props }, ref) => {
    // Check if dotColor maps to a standard theme color
    const dotColors = {
      accent: "bg-accent",
      blue: "bg-blue",
      amber: "bg-amber",
      red: "bg-red",
      text3: "bg-text3",
    };

    const isThemeColor = dotColors[dotColor as keyof typeof dotColors] !== undefined;

    return (
      <div
        ref={ref}
        className={cn(
          "status-bar inline-flex items-center gap-2 px-3.5 py-1.75 bg-elevated border border-border rounded-[6px] font-mono text-[11px] text-text2 select-none",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "s-dot w-1.5 h-1.5 rounded-full shrink-0",
            isThemeColor ? dotColors[dotColor as keyof typeof dotColors] : "",
            pulse && "animate-badge-pulse"
          )}
          style={!isThemeColor ? { backgroundColor: dotColor } : undefined}
          aria-hidden="true"
        />
        <span className="uppercase tracking-wider">{label}</span>
      </div>
    );
  }
);

StatusBar.displayName = "StatusBar";
