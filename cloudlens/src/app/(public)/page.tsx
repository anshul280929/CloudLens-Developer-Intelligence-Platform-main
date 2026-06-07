"use client";

import * as React from "react";
import {
  RepoCard,
  AlertCard,
  FeatureCard,
  TerminalCodeBlock,
  StatusBar,
} from "@/components";

export default function Home() {
  const sampleBashCode = `$ npx cloudlens scan anshul280929/payment-gateway-simulator

── CloudLens v2.1.0 ─────────────────────────────────────
✓ Cloning repository…            done (1.2s)
✓ Parsing files…                 247 files scanned
✓ Running detection engine…

── Services Detected ────────────────────────────────────
  AWS         S3, SQS, Lambda, RDS     4 services
  Stripe      Payments API             1 service

✓ Scan complete. 5 services across 2 providers. (3.4s total)`;

  const sampleTSCode = `export default {
  repos: ["anshul280929/payment-gateway-simulator"],
  alerts: {
    newService:   true,
    statuspage:   true,
    weeklyDigest: true,
  },
  providers: ["aws", "gcp", "vercel", "stripe"],
}`;

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent-glow select-none pb-24">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[400px] bg-gradient-radial from-[rgba(46,255,160,0.04)] to-transparent pointer-events-none z-0" />

      {/* Main Well Container */}
      <main className="relative max-w-5xl mx-auto px-6 pt-16 z-10">

        {/* Header */}
        <header className="mb-14 border-b border-border pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="eyebrow-tag px-2 py-0.5 text-[11px] font-mono font-medium rounded-full bg-accent-glow border border-accent-bdr text-accent">
              INTERNAL SHOWCASE
            </span>
            <span className="font-mono text-[11px] text-text3">Task 1C — Composite UI</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-text leading-none mb-4">
            <span className="text-accent">CloudLens</span> Component Library
          </h1>
          <p className="text-[16px] text-text2 max-w-2xl leading-relaxed">
            Visual catalog of composite components developed for Phase 1C, adhering precisely to the CloudLens Design System specification.
          </p>
        </header>

        {/* ── 01 REPO CARDS ── */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[13px] text-accent font-semibold bg-accent-glow px-2 py-0.5 rounded border border-accent-bdr">01</span>
            <h2 className="font-heading text-xl font-bold text-text">Repository Cards (RepoCard)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RepoCard name="payment-gateway-simulator" owner="anshul280929" status="complete" services={[{ provider: "aws", count: 4 }, { provider: "stripe", count: 1 }]} serviceCount={5} updatedAt="2h ago" />
            <RepoCard name="graphrag-compliance-tool" owner="anshul280929" status="scanning" services={[{ provider: "gcp", count: 3 }, { provider: "supabase", count: 2 }]} serviceCount={5} updatedAt="Running…" />
            <RepoCard name="legacy-monolith-app" owner="anshul280929" status="failed" services={[{ provider: "aws", count: 8 }]} serviceCount={8} updatedAt="Failed yesterday" />
            <RepoCard name="experimental-sandbox" owner="anshul280929" status="never-scanned" services={[]} serviceCount={0} updatedAt="Never scanned" />
          </div>
        </section>

        {/* ── 02 ALERT CARDS ── */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[13px] text-accent font-semibold bg-accent-glow px-2 py-0.5 rounded border border-accent-bdr">02</span>
            <h2 className="font-heading text-xl font-bold text-text">Alert Cards (AlertCard)</h2>
          </div>
          <div className="flex flex-col gap-4">
            <AlertCard provider="aws" severity="critical" title="New S3 bucket detected" description={<>Found reference to <code className="font-mono text-[12px] text-accent bg-accent-glow px-1.5 py-0.5 rounded">prod-compliance-docs</code> in <code className="font-mono text-[12px] text-text2">src/services/storage.ts</code>.</>} repoName="payment-gateway-simulator" timestamp="2 hours ago" />
            <AlertCard provider="statuspage" severity="warning" title="Stripe — degraded performance" description="Stripe reports degraded API performance in US East. 2 of your active projects depend on this service." repoName="Statuspage.io" timestamp="35 minutes ago" />
            <AlertCard provider="supabase" severity="info" title="Supabase free-tier threshold warning" description="Monthly operations at 85% of limit." repoName="graphrag-compliance-tool" timestamp="1 day ago" />
          </div>
        </section>

        {/* ── 03 FEATURE CARDS ── */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[13px] text-accent font-semibold bg-accent-glow px-2 py-0.5 rounded border border-accent-bdr">03</span>
            <h2 className="font-heading text-xl font-bold text-text">Feature Cards (FeatureCard)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard title="Auto-detect" description="Weighted regex engine scans every file." variant="accent" icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
            <FeatureCard title="GitHub OAuth" description="Connect in one click. Scans run in the background." variant="blue" icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M7 9l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
            <FeatureCard title="Weekly digests" description="Automated reports on new services and drift." variant="amber" icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>} />
          </div>
        </section>

        {/* ── 04 TERMINAL BLOCKS ── */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[13px] text-accent font-semibold bg-accent-glow px-2 py-0.5 rounded border border-accent-bdr">04</span>
            <h2 className="font-heading text-xl font-bold text-text">Terminal & Code Blocks (TerminalCodeBlock)</h2>
          </div>
          <div className="flex flex-col gap-6">
            <TerminalCodeBlock title="Terminal" language="bash" code={sampleBashCode} />
            <TerminalCodeBlock title="cloudlens.config.ts" language="typescript" code={sampleTSCode} />
          </div>
        </section>

        {/* ── 05 STATUS BARS ── */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[13px] text-accent font-semibold bg-accent-glow px-2 py-0.5 rounded border border-accent-bdr">05</span>
            <h2 className="font-heading text-xl font-bold text-text">Status Indicators (StatusBar)</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <StatusBar label="SYSTEM: CLOUDLENS" dotColor="accent" />
            <StatusBar label="STATUS: SCANNING" dotColor="accent" pulse={true} />
            <StatusBar label="REPOS: 14 CONNECTED" dotColor="text3" />
            <StatusBar label="API OUTAGE DETECTED" dotColor="red" pulse={true} />
          </div>
        </section>

      </main>
    </div>
  );
}
