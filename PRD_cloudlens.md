# ☁️ CloudLens — Product Requirements Document (PRD)

> **Version:** 1.0  
> **Date:** May 6, 2026  
> **Author:** CloudLens Product Team  
> **Status:** Draft — Awaiting Review

---

## 1. Product Vision

**CloudLens** is a developer intelligence platform that acts as a single pane of glass for every third-party cloud service a developer uses. It scans GitHub repositories, detects integrated services (databases, auth providers, hosting, payments, etc.), tracks costs, warns about expiring or forgotten subscriptions, and delivers AI-powered recommendations — all from one unified dashboard.

**Tagline:** *"A lens into every cloud service you use."*

---

## 2. Problem Statement

Modern developers integrate dozens of third-party services — Neon, Supabase, Clerk, AWS, Stripe, Vercel, Firebase, and more. Each has its own dashboard, billing cycle, free-tier limits, and expiry policies. This creates three critical problems:

| Problem | Impact |
|---|---|
| **Service Sprawl** | Developers lose track of which services are used in which projects. Forgotten services stay active and bill silently. |
| **Unexpected Costs** | Free-tier expirations, quota overages, and auto-renewals cause surprise charges that go unnoticed for months. |
| **No Unified View** | There is no single tool that aggregates service usage, health, cost, and risk across all projects. Developers must log into 10+ dashboards individually. |

### Real-World Scenarios

- A developer signs up for **Supabase Pro** for a hackathon, forgets about it, and gets billed $25/month for 6 months.
- A **Neon** free-tier database is paused after 7 days of inactivity — the developer's app silently breaks in production.
- An **AWS** service accumulates $200 in charges because the developer forgot to tear down a staging environment.

---

## 3. Target Users

### Primary Persona: Independent Developer ("Indie Dev")

- **Profile:** Full-stack developer working on 3–10 side projects
- **Pain:** Loses track of which services are running, gets surprise bills
- **Goal:** One dashboard to see everything, get warned before things go wrong

### Secondary Persona: Startup Engineer

- **Profile:** Engineer at a 2–15 person startup, manages infrastructure
- **Pain:** No visibility into total cloud spend across the team's projects
- **Goal:** Consolidate service tracking, reduce unnecessary costs

### Tertiary Persona: Engineering Manager

- **Profile:** Leads a team of 5–30 developers
- **Pain:** No audit trail of which services were set up by whom; offboarding is risky
- **Goal:** Org-wide service inventory, policy enforcement, offboarding checklists

---

## 4. Goals & Objectives

### Product Goals

| # | Goal | Measure |
|---|---|---|
| G1 | Eliminate surprise billing from forgotten services | Users report ≥50% reduction in unexpected charges |
| G2 | Provide a single dashboard for all third-party services | Users check fewer than 3 external dashboards per week (down from 10+) |
| G3 | Proactively warn before services expire or exceed limits | ≥80% of expiry/quota issues caught before impact |
| G4 | Deliver actionable AI recommendations for cost savings | Average user saves ≥$15/month within 3 months |
| G5 | Enable one-click navigation to cancel/manage any service | ≥90% of detected services have a working dashboard link |

### Business Objectives

| # | Objective | Target |
|---|---|---|
| B1 | Acquire 1,000 users within 3 months of launch | Organic + Product Hunt + Dev Twitter |
| B2 | Achieve 5% free → Pro conversion rate | By month 6 |
| B3 | Reach $10K MRR within 12 months | Via Pro + Team tiers |
| B4 | Maintain <$0.05 AI cost per user per month | Efficient model selection |

---

## 5. User Stories

### Epic 1: Authentication & Onboarding

| ID | Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-1.1 | As a developer, I want to sign in with my GitHub account so that I can instantly connect my repositories. | P0 | GitHub OAuth flow completes in <3 seconds; user lands on dashboard. |
| US-1.2 | As a new user, I want a guided onboarding tour so that I understand how to scan my first repo. | P1 | 3-step tooltip tour triggers on first login; can be skipped. |
| US-1.3 | As a user, I want to see my GitHub avatar and profile info so that I know I'm logged into the right account. | P0 | Avatar, username displayed in sidebar/header. |

### Epic 2: Repository Scanning & Service Detection

| ID | Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-2.1 | As a developer, I want to see a list of all my GitHub repos (public + private) so that I can choose which to scan. | P0 | All repos fetched via GitHub API; displayed with name, visibility, last commit date. |
| US-2.2 | As a developer, I want to click "Scan Now" on a repo so that CloudLens detects all third-party services used. | P0 | Scan completes within 30 seconds; detected services shown with confidence scores. |
| US-2.3 | As a developer, I want CloudLens to scan `package.json`, `requirements.txt`, config files, and import statements to detect services. | P0 | Detection rules cover dependency files, config files, import patterns, env vars, and CI/CD configs. |
| US-2.4 | As a developer, I want to see a confidence score for each detected service so I know how certain the detection is. | P1 | Confidence displayed as percentage; ≥0.8 = high, 0.5–0.8 = medium, <0.5 = low. |
| US-2.5 | As a developer, I want automatic re-scans when I push new commits so that my service inventory stays current. | P2 | Webhook-triggered rescan within 5 minutes of push. |
| US-2.6 | As a developer, I want an AI-enhanced "Deep Scan" option for repos where basic detection finds few services. | P2 | GPT-4o-mini analyzes file tree; catches services regex missed. |

### Epic 3: Dashboard & Service Inventory

| ID | Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-3.1 | As a developer, I want a dashboard showing all detected services across all repos with color-coded status indicators. | P0 | 🟢 Active/Healthy, 🟡 Warning (expiring soon), 🔴 Expired/Critical — at a glance. |
| US-3.2 | As a developer, I want to filter services by repo, category, or status so I can quickly find what I need. | P1 | Filters for: repo name, category (database, auth, hosting, etc.), status (active, warning, expired). |
| US-3.3 | As a developer, I want each service card to show: name, logo, category, start date, expiry date, estimated cost, and a direct link to its dashboard. | P0 | All fields populated; "Go to Dashboard" link opens service's management page. |
| US-3.4 | As a developer, I want to click through to a service's external dashboard to cancel or manage it directly. | P0 | Dashboard link works for ≥90% of supported services. |
| US-3.5 | As a developer, I want to see a per-project view that groups all services used in a single repository. | P1 | Project detail page shows service cards, architecture overview, and cost summary. |

### Epic 4: Alerts & Notifications

| ID | Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-4.1 | As a developer, I want to receive alerts when a service is about to expire so I can take action before it breaks. | P0 | Alert triggered 7 days, 3 days, and 1 day before expiry. |
| US-4.2 | As a developer, I want inactivity warnings when a repo hasn't been updated but has active paid services. | P0 | Alert when repo is inactive >30 days with active paid services. |
| US-4.3 | As a developer, I want to see how much extra cost I'm incurring from forgotten/unused services. | P0 | Dashboard shows "Wasted Spend" metric — sum of costs for inactive-repo services. |
| US-4.4 | As a developer, I want monthly email digests summarizing my service status, costs, and required actions. | P1 | Email sent on 1st of each month; includes: active services count, total cost, services needing attention. |
| US-4.5 | As a developer, I want in-app notifications with dismiss/snooze options. | P1 | Bell icon with badge count; actions: dismiss, snooze 7 days, mark resolved, "I cancelled this." |
| US-4.6 | As a developer, I want alerts when a service I use has a public outage. | P2 | Status page polling every 5 minutes; alert created for degraded/outage status. |

### Epic 5: Cost Tracking

| ID | Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-5.1 | As a developer, I want to see my total monthly "burn rate" across all services. | P1 | Aggregated monthly cost displayed on dashboard header. |
| US-5.2 | As a developer, I want a cost breakdown chart by service and by project. | P1 | Bar chart (by service) + line chart (trend over time). |
| US-5.3 | As a developer, I want to connect my service accounts (OAuth) so CloudLens can pull real billing data. | P2 | OAuth connection flow for Vercel, Supabase, and AWS (initial set). |
| US-5.4 | As a developer, I want AI-generated cost optimization suggestions. | P2 | Monthly AI analysis; e.g., "Downgrade Vercel Pro → Hobby, saving $20/mo." |

### Epic 6: AI-Powered Intelligence

| ID | Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-6.1 | As a developer, I want AI to suggest missing services in my stack (e.g., "You have a DB but no auth"). | P2 | Recommendations shown on project detail page. |
| US-6.2 | As a developer, I want AI to suggest consolidation when I use duplicate services across repos. | P2 | E.g., "You use Supabase in 2 repos and Neon in 1. Consolidate to save $25/mo." |
| US-6.3 | As a developer, I want AI to detect exposed API keys in my codebase and warn me. | P1 | Security alert created; severity = critical; links to affected file. |

### Epic 7: Team & Org Features (Future)

| ID | Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-7.1 | As an engineering manager, I want an org-wide service inventory across all team members' repos. | P3 | Org dashboard aggregates all members' detected services. |
| US-7.2 | As an engineering manager, I want an offboarding checklist when a developer leaves. | P3 | List of services to revoke access for, with direct links. |
| US-7.3 | As a team lead, I want policy enforcement to whitelist/blacklist certain services. | P3 | PR blocked if blacklisted service is detected (via GitHub Action). |

---

## 6. Feature List (by Phase)

### Phase 1 — MVP Core (Weeks 1–4)

- [ ] GitHub OAuth sign-in (NextAuth.js v5)
- [ ] PostgreSQL database with Drizzle ORM
- [ ] Repository listing from GitHub API
- [ ] Service detection engine (dependency files, config files, imports, env vars, CI/CD)
- [ ] Confidence scoring system
- [ ] Dashboard UI with service cards and status indicators
- [ ] shadcn/ui component library integration
- [ ] "Scan Now" button with real-time progress
- [ ] Responsive design + loading/error states
- [ ] Landing page

### Phase 2 — Smart Alerts & Warnings (Weeks 5–8)

- [ ] Inactivity alerts (cross-reference repo activity with service policies)
- [ ] Expiry warnings (trial end dates, free-tier time limits)
- [ ] Quota/limit warnings (estimated or real usage vs. known limits)
- [ ] Service outage alerts (status page polling)
- [ ] In-app notification center (bell icon, badge, dismiss/snooze)
- [ ] Email digest (monthly, configurable to daily/weekly)
- [ ] Slack webhook integration
- [ ] Direct "Go to Dashboard" action on every alert

### Phase 3 — AI Intelligence (Weeks 9–12)

- [ ] AI-enhanced service detection (GPT-4o-mini fallback for low-confidence scans)
- [ ] Smart recommendations (missing services, consolidation, migration paths)
- [ ] Security scanning (exposed keys/secrets detection)
- [ ] RAG pipeline for service policy awareness (pgvector + embeddings)
- [ ] Cost optimization suggestions

### Phase 4 — Visual Architecture Map (Weeks 13–15)

- [ ] Auto-generated service dependency diagrams (React Flow)
- [ ] Interactive node-based visualization with status colors
- [ ] Click-to-detail side panel
- [ ] Export as PNG/SVG

### Phase 5 — CLI & GitHub Action (Weeks 16–18)

- [ ] `@cloudlens/cli` npm package (scan local projects, detect `.env` secrets)
- [ ] `cloudlens/action` GitHub Action (PR comments, policy enforcement)
- [ ] API token management for CLI/CI integration

### Phase 6 — Cost Tracker & Burn Rate (Weeks 19–22)

- [ ] Unified cost dashboard (bar/line charts)
- [ ] Service account OAuth connections for real billing data
- [ ] Budget alerts and projections
- [ ] Cost comparison tool (e.g., Supabase Pro vs. Neon Pro)

### Phase 7 — Teams, Gamification & Enterprise (Weeks 23–28)

- [ ] Organization management with role-based access
- [ ] Service ownership tagging and audit logs
- [ ] Developer offboarding checklists
- [ ] Health score (0–100) and achievement badges
- [ ] SSO (SAML) for enterprise
- [ ] Shareable profile cards

---

## 7. Information Architecture

```
CloudLens App
├── Landing Page (public)
│   ├── Hero with value proposition
│   ├── Features overview
│   ├── Pricing table
│   └── "Sign in with GitHub" CTA
│
├── Dashboard (authenticated)
│   ├── Overview
│   │   ├── Total services count (by status: 🟢🟡🔴)
│   │   ├── Monthly burn rate
│   │   ├── Wasted spend metric
│   │   └── Recent alerts summary
│   │
│   ├── Repositories
│   │   ├── Repo list (with scan status, last scanned date)
│   │   └── Repo Detail → services, architecture map, cost
│   │
│   ├── Services
│   │   ├── All services grid (filterable by repo/category/status)
│   │   └── Service Detail → detection evidence, cost, dashboard link
│   │
│   ├── Alerts
│   │   ├── Active alerts (sortable by severity)
│   │   └── Alert history
│   │
│   ├── Costs
│   │   ├── Monthly breakdown (chart)
│   │   ├── Per-service costs
│   │   └── AI savings suggestions
│   │
│   ├── AI Insights
│   │   ├── Recommendations feed
│   │   └── Security findings
│   │
│   └── Settings
│       ├── Connected accounts (OAuth)
│       ├── Notification preferences
│       ├── Email digest frequency
│       └── API tokens (for CLI/CI)
```

---

## 8. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Dashboard loads in <2 seconds; repo scan completes in <30 seconds for repos with ≤500 files. |
| **Scalability** | Support 10,000 users with 100,000 total repos without degradation. |
| **Security** | GitHub tokens encrypted at rest; no source code stored permanently; SOC 2 compliance planned for enterprise tier. |
| **Privacy** | Source code is analyzed in-memory and never persisted. Only metadata (service names, file paths, confidence) is stored. |
| **Availability** | 99.9% uptime SLA for Pro/Team tiers. |
| **Accessibility** | WCAG 2.1 AA compliance for all UI components. |
| **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions). |

---

## 9. Success Metrics & KPIs

### Activation Metrics

| Metric | Target | Measurement |
|---|---|---|
| Sign-up → first scan | ≥60% within 5 minutes | Event tracking |
| Repos scanned per user (week 1) | ≥3 repos | Database query |
| Onboarding completion rate | ≥75% | Funnel analytics |

### Engagement Metrics

| Metric | Target | Measurement |
|---|---|---|
| Weekly Active Users (WAU) | 40% of total users | PostHog |
| Dashboard visits per week | ≥2 per active user | PostHog |
| Alert interaction rate | ≥50% (dismissed, snoozed, or acted on) | Database query |
| Email digest open rate | ≥35% | Resend analytics |

### Value Metrics

| Metric | Target | Measurement |
|---|---|---|
| Services detected per user | ≥8 across all repos | Database query |
| Forgotten services identified | ≥2 per user within 30 days | Alert data |
| Estimated cost savings surfaced | ≥$15/user/month | AI insight data |
| User-reported surprise bills (post-CloudLens) | ≥50% reduction (survey) | Quarterly NPS survey |

### Business Metrics

| Metric | Target | Timeline |
|---|---|---|
| Total registered users | 1,000 | Month 3 |
| Free → Pro conversion | 5% | Month 6 |
| Monthly Recurring Revenue | $10,000 | Month 12 |
| Net Promoter Score (NPS) | ≥50 | Month 6 |
| Churn rate (Pro users) | <5% monthly | Ongoing |

### Technical Health Metrics

| Metric | Target |
|---|---|
| Detection accuracy (precision) | ≥90% (confirmed by user feedback) |
| Detection recall | ≥80% (caught by AI fallback + user reports) |
| False positive rate | <10% |
| API error rate | <0.5% |
| Average scan duration | <15 seconds |
| AI cost per user per month | <$0.05 |

---

## 10. Monetization

| Tier | Price | Limits |
|---|---|---|
| **Free** | $0/mo | 5 repos, basic detection, 1 connected account, weekly digest |
| **Pro** | $12/mo | Unlimited repos, AI insights, cost tracking, all alert channels, CLI |
| **Team** | $24/user/mo | Org features, offboarding, policy enforcement, audit logs, SSO |
| **Enterprise** | Custom | On-prem scanner, custom integrations, SLA, dedicated support |

---

## 11. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| GitHub API rate limiting | High | Scans delayed | Implement caching, batch requests, use conditional requests (ETags) |
| Low detection accuracy | Medium | User distrust | Combine regex + AI; allow user corrections; feedback loop improves rules |
| Users concerned about code privacy | High | Low adoption | Clearly communicate: no code stored, only metadata; open-source scanner |
| Service dashboard links break | Medium | Reduced utility | Maintain a curated service directory; community contributions |
| AI costs escalate at scale | Low | Margin pressure | Use GPT-4o-mini / Gemini Flash; cache repeated analyses; batch processing |

---

## 12. Timeline Summary

| Phase | Weeks | Deliverable |
|---|---|---|
| **Phase 1 — MVP** | 1–4 | GitHub login, repo scanning, service detection, dashboard |
| **Phase 2 — Alerts** | 5–8 | Expiry/inactivity warnings, email digests, status monitoring |
| **Phase 3 — AI** | 9–12 | Smart recommendations, security scanning, enhanced detection |
| **Phase 4 — Arch Map** | 13–15 | Interactive visual service dependency diagrams |
| **Phase 5 — CLI/CI** | 16–18 | CLI tool, GitHub Action, PR integration |
| **Phase 6 — Costs** | 19–22 | Unified cost dashboard, budget alerts, optimization tips |
| **Phase 7 — Teams** | 23–28 | Org management, gamification, enterprise features |

**MVP → Production: ~4 weeks | Full Platform: ~7 months**

---

## 13. Open Questions

> **⚠️ IMPORTANT — These items need stakeholder decisions before implementation proceeds:**

1. **Service cancellation flow** — Should CloudLens attempt direct API cancellation (risky, requires deep OAuth integration per service) or always redirect to the service's own dashboard?
2. **Private repo scanning** — What privacy guarantees and disclosures are needed for scanning private repository code?
3. **Email frequency defaults** — Should the default digest be monthly (as requested) or weekly (higher engagement)?
4. **Supported services at launch** — Which 20 services should be in the initial detection ruleset? (Proposed: Supabase, Neon, Clerk, AWS, Vercel, Firebase, Stripe, Netlify, PlanetScale, MongoDB Atlas, Auth0, Cloudflare, Railway, Render, DigitalOcean, Twilio, SendGrid, Resend, Sentry, PostHog)
5. **Mobile experience** — Is a responsive web app sufficient, or is a native mobile app needed for push notifications?

---

> *Built with 🔍 by the CloudLens team — "A lens into every cloud service you use."*
