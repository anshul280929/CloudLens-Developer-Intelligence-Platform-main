import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface AlertCardProps extends React.HTMLAttributes<HTMLDivElement> {
  provider: "aws" | "gcp" | "azure" | "vercel" | "stripe" | "supabase" | "statuspage" | string;
  severity: "info" | "warning" | "critical";
  title: string;
  description: React.ReactNode;
  repoName: string;
  timestamp: string;
}

export const AlertCard = React.forwardRef<HTMLDivElement, AlertCardProps>(
  (
    {
      className,
      provider,
      severity,
      title,
      description,
      repoName,
      timestamp,
      ...props
    },
    ref
  ) => {
    // Map severity to left border color class
    const borderColors = {
      critical: "border-l-red",
      warning: "border-l-amber",
      info: "border-l-accent",
    };

    // Determine badge variant for the provider
    const getBadgeVariant = (prov: string) => {
      const lower = prov.toLowerCase();
      const validVariants = ["aws", "gcp", "azure", "vercel", "stripe", "supabase"];
      
      if (validVariants.includes(lower)) {
        return lower as any;
      }
      
      if (lower === "statuspage") {
        return "scanning"; // Maps to b-warn / amber status dot in the design system
      }

      return "info"; // Fallback to info (blue) for unknown providers
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "alert-card bg-surface border border-border border-l-[3px] rounded-radius p-4 px-5",
          borderColors[severity] || "border-l-accent",
          className
        )}
        {...props}
      >
        <div className="ach flex items-center gap-2 mb-1.5">
          <Badge variant={getBadgeVariant(provider)} size="sm">
            {provider}
          </Badge>
          <div className="act text-[14px] font-medium text-text font-body">
            {title}
          </div>
        </div>

        <div className="acb text-[13px] text-text2 leading-relaxed font-body">
          {description}
        </div>

        <div className="acf mt-3 font-mono text-[11px] text-text3 flex items-center gap-3.5">
          <span>{repoName}</span>
          <span>{timestamp}</span>
        </div>
      </Card>
    );
  }
);

AlertCard.displayName = "AlertCard";
