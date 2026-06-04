import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon: React.ReactNode;
  variant?: "accent" | "blue" | "amber" | string;
}

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, title, description, icon, variant = "accent", ...props }, ref) => {
    // Map variant to icon container color styles
    const iconColors: Record<string, string> = {
      accent: "bg-accent-glow border border-accent-bdr text-accent",
      blue: "bg-[rgba(78,143,255,0.1)] border border-[rgba(78,143,255,0.2)] text-blue",
      amber: "bg-[rgba(245,177,32,0.1)] border border-[rgba(245,177,32,0.2)] text-amber",
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "bg-elevated border border-border rounded-radius-lg p-[22px]",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "feat-icon w-9 h-9 rounded-[10px] flex items-center justify-center mb-3.5",
            iconColors[variant] || iconColors.accent
          )}
        >
          {icon}
        </div>
        <div className="feat-title font-heading text-[15px] font-bold text-text mb-1.5">
          {title}
        </div>
        <div className="feat-body text-[13px] text-text2 leading-relaxed font-body">
          {description}
        </div>
      </Card>
    );
  }
);

FeatureCard.displayName = "FeatureCard";
