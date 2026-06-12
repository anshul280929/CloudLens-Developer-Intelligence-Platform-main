import * as React from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";

export function SkeletonRepoCard() {
  return (
    <Card className="p-5 px-[22px] animate-pulse">
      <CardHeader className="flex items-start justify-between mb-3 p-0">
        <div className="space-y-2">
          {/* Title skeleton */}
          <div className="h-4 w-32 bg-elevated rounded border border-border" />
          {/* Owner skeleton */}
          <div className="h-3.5 w-20 bg-elevated rounded border border-border" />
        </div>
        {/* Status badge skeleton */}
        <div className="h-[22px] w-20 bg-elevated rounded-full border border-border" />
      </CardHeader>

      <div className="rc-content p-0 mb-3.5 flex gap-1.5 flex-wrap">
        {/* Service badges skeletons */}
        <div className="h-[22px] w-16 bg-elevated rounded-full border border-border" />
        <div className="h-[22px] w-20 bg-elevated rounded-full border border-border" />
      </div>

      <CardFooter className="rc-footer flex items-center justify-between pt-3 mt-3.5 border-t border-border p-0">
        <div className="h-3 w-16 bg-elevated rounded border border-border" />
        <div className="h-3 w-20 bg-elevated rounded border border-border" />
        <div className="h-[30px] w-14 bg-elevated rounded border border-border" />
      </CardFooter>
    </Card>
  );
}
