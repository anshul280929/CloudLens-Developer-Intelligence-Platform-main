import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface RepoService {
  provider: "aws" | "gcp" | "azure" | "vercel" | "stripe" | "supabase" | string;
  count: number;
}

export interface RepoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  owner: string;
  status: "complete" | "scanning" | "failed" | "never-scanned";
  services: RepoService[];
  serviceCount: number;
  updatedAt: string;
  onViewClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

export const RepoCard = React.forwardRef<HTMLDivElement, RepoCardProps>(
  (
    {
      className,
      name,
      owner,
      status,
      services,
      serviceCount,
      updatedAt,
      onViewClick,
      ...props
    },
    ref
  ) => {
    const isScanning = status === "scanning";

    // Mapping scan status to UI label
    const statusLabels = {
      complete: "Scanned",
      scanning: "Scanning",
      failed: "Failed",
      "never-scanned": "Never scanned",
    };

    const handleViewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isScanning) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (onViewClick) {
        onViewClick(e);
      }
    };

    return (
      <Card
        ref={ref}
        variant="interactive"
        className={cn("repo-card p-5 px-[22px] transition-colors duration-200 cursor-pointer", className)}
        onClick={(e) => {
          if (!isScanning && onViewClick) {
            onViewClick(e);
          }
        }}
        {...props}
      >
        <CardHeader className="rch flex items-start justify-between mb-3 p-0">
          <div>
            <CardTitle className="rc-name font-mono text-[13px] font-medium text-text">
              {name}
            </CardTitle>
            <p className="rc-owner text-[12px] text-text3 mt-0.5">{owner}</p>
          </div>
          <Badge variant={status} size="sm">
            {statusLabels[status]}
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          <div className="rc-services flex gap-1.5 flex-wrap mb-3.5">
            {services.length > 0 ? (
              services.map((svc) => (
                <Badge
                  key={svc.provider}
                  variant={svc.provider as any}
                  size="sm"
                >
                  {svc.provider.toUpperCase()} · {svc.count}
                </Badge>
              ))
            ) : (
              <span className="text-[12px] text-text3 italic">No services detected</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="rc-footer flex items-center justify-between pt-3 mt-3.5 border-t border-border p-0">
          <span className="rc-stat font-mono text-[11px] text-text3">
            <strong className="text-text2 font-medium">{serviceCount}</strong>{" "}
            {serviceCount === 1 ? "service" : "services"}
          </span>
          <span className="rc-stat font-mono text-[11px] text-text3">
            {isScanning ? "Running…" : updatedAt}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={isScanning}
            className={cn(isScanning && "opacity-35 pointer-events-none")}
            onClick={handleViewClick}
          >
            View →
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

RepoCard.displayName = "RepoCard";

// Inline helper CardContent component to keep RepoCard matching card.tsx layout if we want to import it directly
function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rc-content", className)} {...props} />;
}
