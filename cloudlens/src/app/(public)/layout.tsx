import type { ReactNode } from "react";
import { PublicNav } from "@/components/layout/PublicNav";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <PublicNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8 px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-text3 font-mono">
          <span>CloudLens © 2026</span>
          <span>A lens into every cloud service you use.</span>
        </div>
      </footer>
    </div>
  );
}
