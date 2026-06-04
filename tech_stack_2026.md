# CloudLens Tech Stack Recommendation (2026)

Based on the Product Requirements Document (PRD) for CloudLens, the application requires a robust, scalable, and responsive architecture capable of handling full-stack web interactions, background repository scanning, AI integrations, and real-time visualization.

Here is the recommended tech stack for 2026, aligned with the PRD's goals and technical requirements.

## 1. Frontend
**Core:** Next.js (App Router) + React 19
**Styling & UI:** Tailwind CSS + shadcn/ui + Framer Motion
**Data Visualization:** React Flow + Recharts

*Justification:*
*   **Next.js:** Provides Server-Side Rendering (SSR) and React Server Components (RSC) to ensure the dashboard loads in <2 seconds (as per NFRs). It perfectly supports the full-stack nature of the MVP.
*   **shadcn/ui & Tailwind CSS:** Explicitly mentioned in the PRD (Phase 1). They allow for rapid development of a premium, accessible (WCAG 2.1 AA), and customizable dashboard interface without heavy runtime dependencies.
*   **React Flow & Recharts:** The PRD requires an "interactive node-based visualization" (Phase 4) and cost breakdown charts (Phase 6). React Flow is the industry standard for architecture diagrams, and Recharts handles complex line/bar charts for the cost tracker.

## 2. Backend & Background Processing
**Core API:** Next.js Server Actions & API Routes (TypeScript)
**Background Jobs/Workers:** Inngest or Trigger.dev

*Justification:*
*   **Next.js Server Actions:** Excellent for tight frontend-backend integration, such as fetching user repositories and modifying dashboard settings directly from the UI.
*   **Inngest / Trigger.dev:** Repo scanning (especially "Deep Scan" with AI), webhook processing from GitHub commits, and scheduled alerts (monthly emails, expiration polling) cannot run in synchronous API requests due to serverless timeout limits. These worker platforms provide reliable queues, retries, and event-driven triggers essential for CloudLens' alerts and scanning engine.

## 3. Database & ORM
**Database:** PostgreSQL (Managed: Neon or Supabase) with `pgvector` extension
**ORM:** Drizzle ORM

*Justification:*
*   **PostgreSQL + Drizzle ORM:** The PRD specifies this exact combination for Phase 1. Drizzle is lightweight, type-safe, and highly performant, making it ideal for the Next.js edge/serverless environment.
*   **pgvector:** Specifically requested in Phase 3 for the "RAG pipeline for service policy awareness". This allows the database to store and query vector embeddings for AI recommendations natively.

## 4. Authentication
**Provider:** NextAuth.js v5 (Auth.js)

*Justification:*
*   Explicitly defined in the MVP core (Phase 1). NextAuth seamlessly integrates with Next.js and handles the required GitHub OAuth flow ("sign in with GitHub account so that I can instantly connect my repositories") efficiently while keeping the authentication session secure.

## 5. AI Engine
**Models:** GPT-4o-mini / Gemini 1.5 Flash
**Integration Framework:** Vercel AI SDK

*Justification:*
*   **Models:** The PRD mandates maintaining an AI cost of `<$0.05 per user per month`. GPT-4o-mini and Gemini Flash offer the perfect balance of speed, low cost, and high context windows needed for "Deep Scanning" codebase file trees and suggesting cost optimizations.
*   **Vercel AI SDK:** Provides standardized adapters to switch between OpenAI and Google models seamlessly, along with tools for generating structured JSON outputs (useful for AI-enhanced service detection).

## 6. Deployment & Infrastructure
**Hosting:** Vercel
**CI/CD:** GitHub Actions
**Analytics & Monitoring:** PostHog + Sentry

*Justification:*
*   **Vercel:** As a Next.js application, Vercel provides the most frictionless deployment experience, zero-config CI/CD previews, and edge network caching to meet the 99.9% uptime SLA.
*   **PostHog:** Mentioned directly in the PRD's metrics section. It handles user analytics, WAU tracking, and onboarding funnel tracking without needing multiple disparate tools.
*   **Sentry:** Necessary to monitor application health and maintain the `<0.5% API error rate` KPI.

## 7. Additional Integrations
*   **Email:** Resend + React Email (for the required monthly email digests and beautifully styled developer communications).
*   **Payments (Future):** Stripe (for managing Pro/Team tiers as outlined in the monetization strategy).
