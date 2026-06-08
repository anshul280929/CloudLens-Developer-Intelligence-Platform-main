import type { ReactNode } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";

const FOOTER_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "GitHub", href: "https://github.com", rel: "noopener noreferrer" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <PublicNav />
      <main className="flex-1">{children}</main>
<<<<<<< HEAD
      <footer className="border-t border-border py-8 px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-text3 font-mono">
          <span>CloudLens © 2026</span>
          <span>A lens into every cloud service you use.</span>
=======

      <footer className="border-t border-border py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            {/* Logo + tagline */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="8.5" height="8.5" rx="2" fill="var(--accent)" />
                  <rect x="12.5" y="1" width="8.5" height="8.5" rx="2" fill="var(--accent)" opacity="0.6" />
                  <rect x="1" y="12.5" width="8.5" height="8.5" rx="2" fill="var(--accent)" opacity="0.6" />
                  <rect x="12.5" y="12.5" width="8.5" height="8.5" rx="2" fill="var(--accent)" opacity="0.3" />
                </svg>
                <span className="font-heading text-[15px] font-extrabold text-text">CloudLens</span>
              </div>
              <p className="text-[12px] text-text3 font-mono">A lens into every cloud service you use.</p>
            </div>

            {/* Links */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      rel={"rel" in link ? link.rel : undefined}
                      className="text-[12px] text-text3 hover:text-text2 transition-colors font-mono"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom row */}
          <div className="border-t border-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-text3 font-mono">
            <span>© 2026 CloudLens. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Built with
              <span className="text-accent mx-0.5">♥</span>
              for developers who ship.
            </span>
          </div>
>>>>>>> a84a6ba5b5fdacf0692802ec0a3aced500797ad5
        </div>
      </footer>
    </div>
  );
}
