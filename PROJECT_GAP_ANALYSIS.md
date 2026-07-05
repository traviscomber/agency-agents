# N3uralia AgencyOS — Comprehensive Gap Analysis & Action Plan
**Date:** July 5, 2026  
**Status:** Full context audit complete. Ready for Phase 2 implementation.

---

## Executive Summary

**Current State:**
- ✅ Brandbook exists (`lib/brandbook.ts`) — all design tokens defined
- ✅ Market analysis complete — Chile SMB positioning validated  
- ✅ Landing page structure in place (public pages exist)
- ✅ App pages built (20+ routes, basic UX framework)
- ✅ Help system added (tips, onboarding, guidance)
- ✅ Sharp-edge design applied (zero rounded corners)

**Key Gaps:**
1. **Brandbook not fully applied** — tokens defined but not consistently used in UI
2. **Public pages not redesigned** — missing N3uralia aesthetic application
3. **App pages lack native integration** — no database persistence, mocked data only
4. **No agent execution engine** — agents can't actually run
5. **Missing payment/billing logic** — Stripe integration incomplete
6. **Admin panel unstaffed** — only layout exists
7. **Authentication system incomplete** — basic auth, no session management

---

## Detailed Gap Map

### Phase 1: Foundation (COMPLETED ✅)
- [x] Brandbook tokens defined
- [x] Sharp-edge design applied (removed all rounded corners)
- [x] App UX improved (help tips, onboarding)
- [x] Chile market analysis documented

### Phase 2: Design System & Public Site (CRITICAL PATH)
**Status:** NOT STARTED — High impact, must complete before demos

#### 2.1 Design System Compliance
- [ ] Update `app/globals.css` to use brandbook tokens consistently
- [ ] Create `components/shared/Typography.tsx` — reusable heading components
- [ ] Create `components/shared/Button.tsx` — branded button variants
- [ ] Create `components/shared/Card.tsx` — sharp-edge card component
- [ ] Create `components/shared/Badge.tsx` — eyebrow labels and tags

**Files to create/update:**
```
lib/brandbook.ts → ALREADY DONE ✅
app/globals.css → NEEDS UPDATE
components/shared/Typography.tsx → NEW
components/shared/Button.tsx → UPDATE
components/shared/Card.tsx → UPDATE
components/shared/Badge.tsx → UPDATE
```

#### 2.2 Landing Page (`app/page.tsx`)
**Current:** Basic structure exists  
**Needed:** Full N3uralia aesthetic redesign

**Sections to rebuild:**
1. **Navbar** — Fixed dark, sage-teal pills, backdrop blur
2. **Hero** — Full viewport, centered, `font-light` headline
3. **How it becomes a system** — 3-column tab panel (scattered → layer → controlled)
4. **Implementation rhythm** — 4-col stat bar with accent line hover
5. **Agents grid** — Sharp-border cards, `gap-px` separator pattern
6. **Method section** — 01–04 steps, left mono column
7. **CTA section** — Dark panel (`#102624`)
8. **Footer** — Rounded-edge panel with link groups

**Impact:** Landing determines inbound messaging for Chile market

#### 2.3 Public Page Redesigns (HIGH PRIORITY)
| Page | Current | Needed | Impact |
|------|---------|--------|--------|
| `/pricing` | Basic layout | N3uralia plan cards + sharp grid | High (conversion) |
| `/agents` (public) | Exists | Detail + sharp border cards | High (discoverability) |
| `/login` | Functional | N3uralia dark aesthetic | Medium (UX) |
| `/signup` | Functional | N3uralia dark aesthetic | Medium (UX) |
| `/forgot-password` | Functional | N3uralia dark aesthetic | Low |
| `Privacy / Terms` | Placeholder | Actual legal content | Medium |

**Quick wins:**
- Login/signup pages: Apply dark theme + sage accent (1 hour each)
- Pricing page: Use plan card template from brandbook (2 hours)
- Public agents: Apply sharp-border card pattern (3 hours)

#### 2.4 Public Navbar & Footer
- [ ] Create `components/public/PublicNavbar.tsx` — brandbook-aligned
- [ ] Create `components/public/PublicFooter.tsx` — matching n3uralia footer
- [ ] Update `app/layout.tsx` to include footer globally

**Impact:** Sets visual tone for entire site

---

### Phase 3: Backend & Data Integration (FOUNDATION FOR APP)
**Status:** NOT STARTED — Required before agents can execute

#### 3.1 Database Schema & Supabase Setup
**Current:** Mocked data in `lib/data/mock-store.ts`  
**Needed:** Real Supabase tables

**Tables required:**
```sql
-- Users & Auth
users (id, email, name, plan, created_at)
sessions (id, user_id, token, expires_at)

-- Projects & Runs
projects (id, user_id, name, description, type, status, created_at)
project_steps (id, project_id, order, name, agent_id, config)
agent_runs (id, project_id, step_id, agent_id, status, input, output, created_at)

-- Agents
agents (id, slug, name, division, description, replacement_score, supervision_level)
agent_configs (id, agent_id, parameters, pricing)

-- Saved Outputs
saved_outputs (id, user_id, run_id, title, data, created_at)

-- Billing
subscriptions (id, user_id, plan, stripe_id, status, current_period_end)
usage_logs (id, user_id, agent_id, runs, tokens_used, created_at)
```

**Action:**
1. [ ] Create Supabase project
2. [ ] Define schema
3. [ ] Set up RLS policies
4. [ ] Create seed data for Chile agents
5. [ ] Update `lib/types.ts` to match real schema

#### 3.2 API Routes & Server Actions
**Current:** No real API  
**Needed:** Server actions for data mutations

**Routes/actions required:**
```
POST /api/auth/login → validate credentials
POST /api/auth/signup → create user
POST /api/projects → create/list projects
POST /api/runs → execute agent
GET /api/runs/[id] → get run details
POST /api/outputs → save output
GET /api/usage → get user usage
```

**Quick path:** Use Server Actions (Next.js) instead of REST API

#### 3.3 Authentication (Better Auth or Supabase Auth)
**Current:** Mock auth in `MOCK_USER`  
**Needed:** Real session management

**Stack choice:**
- Option A: **Better Auth on Neon** (recommended by v0)
- Option B: **Supabase Auth** (integrated with DB)
- Option C: **Auth.js** (OSS, flexible)

**Minimum viable:**
- Session storage
- Protected routes
- User context provider
- Logout flow

---

### Phase 4: Agent Execution Engine (CORE PRODUCT)
**Status:** NOT STARTED — Cannot be MVP without this

#### 4.1 Agent Runner Architecture
**Current:** Agents are static profiles, no execution  
**Needed:** Actual agent execution with I/O

**Required:**
1. **Agent definition schema** — parameters, inputs, outputs, tools
2. **Execution orchestrator** — queue, run manager, error handling
3. **Tool/capability system** — agents can call external APIs
4. **Result storage** — outputs persisted, searchable

**Example flow:**
```
User clicks "Run Twin Cobranza" 
  → Validates input (account data)
  → Queues job
  → Agent receives context
  → Calls external APIs (CRM, email, etc.)
  → Returns result
  → Result saved + displayed
```

#### 4.2 Chile-Specific Agent Implementations
**Current:** Agents exist as data only  
**Needed:** Working implementations

**Priority order:**
1. **Twin Cobranza Pyme** (86% market fit, 4,200 addressable)
2. **Twin Compliance Laboral** (Gap, 6,500 addressable)
3. **Twin Analista Licitaciones** (81% fit, 1,800 addressable)
4. **Twin Tesorera/CFO** (Gap, 3,500 addressable)
5. **Twin Reclutador Operativo** (79% fit, 1,500 addressable)

**Each agent needs:**
- Clear input schema (account, amounts, templates, etc.)
- LLM prompt + tools (email, CRM API, document generation)
- Output format (email draft, action plan, compliance report)
- Success metrics (replacement score, supervision %)
- Testing framework

---

### Phase 5: Marketplace & Monetization
**Status:** NOT STARTED — Revenue-critical

#### 5.1 Stripe Integration
**Current:** `useStripe()` hooks exist, no real processing  
**Needed:** Complete payment flow

**Required:**
- [ ] Product setup in Stripe (plans: Starter $99/mo, Pro $299/mo, Custom)
- [ ] Webhook handlers (subscription events)
- [ ] Checkout flow (create billing session)
- [ ] Invoice management
- [ ] Usage-based billing (for overage runs)

#### 5.2 Billing Page (`/app/billing`)
**Current:** Mock invoices  
**Needed:** Real subscription + invoice display

#### 5.3 Usage Metering
**Current:** Mock usage stats  
**Needed:** Actual run counting + rate limiting

---

### Phase 6: Admin Panel & Operations
**Status:** NOT STARTED — Needed for day-1 support

#### 6.1 Admin Dashboard (`/admin`)
**Current:** Layout only  
**Needed:** Full operator toolkit

**Pages required:**
- `/admin/users` — Search, view, suspend accounts
- `/admin/agents` — Monitor agent health, performance
- `/admin/runs` — View all runs, debug issues
- `/admin/billing` — Revenue reporting, refunds
- `/admin/settings` — Feature flags, system config

#### 6.2 Monitoring & Observability
**Current:** None  
**Needed:** Error tracking, run analytics

**Minimum:**
- Agent execution logs (per run)
- Error aggregation (by agent, by user)
- Success rates (daily, weekly)
- Revenue dashboard

---

## Implementation Priority & Timeline

### Critical Path (MVP Launch)
**Week 1:** Design system + public site  
**Week 2:** Database + auth  
**Week 3:** One working agent (Cobranza)  
**Week 4:** Billing + launch  

### Phased Rollout
**Phase 0 (NOW):** Finish this analysis → 1 hour
**Phase 1 (Days 1-2):** Public site redesign → 16 hours  
**Phase 2 (Days 3-5):** Database + auth → 24 hours  
**Phase 3 (Days 6-8):** Agent runner + Cobranza → 32 hours  
**Phase 4 (Days 9-10):** Billing + testing → 16 hours  
**Phase 5 (Day 11):** Admin panel (basic) → 8 hours  

**Total MVP:** ~96 hours (12 days at 8h/day)

---

## Detailed Task Breakdown

### IMMEDIATE (Next 4 hours)

#### Task 1: Design System Components
```
components/shared/Typography.tsx
- H1Hero, H2Section, H3, Eyebrow, BodyText components
- Use brandbook tokens
- Export variants for dark/light

components/shared/Button.tsx  
- Update with BTN_PRIMARY, BTN_SECONDARY variants
- Remove any rounded-* classes
- Add hover states

components/shared/Card.tsx
- Dark card (CARD_DARK)
- Light card (CARD_LIGHT)
- No border-radius
- Apply shadow patterns from brandbook

components/shared/Badge.tsx
- Eyebrow label variant
- Tag/pill variant
- Use accent colors
```

**Expected output:** 4 ready-to-use components, shareable across all pages

#### Task 2: Update globals.css
```
- Replace current CSS vars with brandbook mappings
- Remove any gradient backgrounds (flat colors only)
- Ensure :root uses OKLCH values matching brandbook
- Test across all pages (should be visual-only change)
```

### NEXT PHASE (Days 2-3)

#### Task 3: Redesign Landing Page
```
app/page.tsx → Full reconstruction
- Hero section (centered, font-light, 100vh)
- How-it-works (3-col tabs or scroll)
- Agents grid (sharp-border cards, gap-as-border)
- Method section (01–04 steps)
- CTA section (dark panel)
- Footer

Estimated: 8 hours
Success metric: Matches n3uralia.com aesthetic
```

#### Task 4: Quick UI Wins
```
- Login page → dark theme (1h)
- Signup page → dark theme (1h)
- Pricing page → plan cards (2h)
- Public agents page → sharp borders (2h)

Total: 6 hours
Impact: All public-facing pages look professional
```

#### Task 5: Database & Supabase
```
- Create Supabase project
- Define schema (5 tables min)
- Create seed data (Chile agents)
- Update lib/types.ts
- Create data fetchers

Estimated: 12 hours
Success metric: Can fetch real agents + projects from DB
```

### CRITICAL PATH (Days 4-7)

#### Task 6: Authentication System
```
- Implement Better Auth or Supabase Auth
- Protected routes middleware
- Session management
- User context provider
- Login/logout/register flows

Estimated: 16 hours
Success metric: Real user accounts + session persistence
```

#### Task 7: Agent Runner MVP
```
- Define agent execution schema
- Create run orchestrator
- Implement Cobranza agent
  - LLM integration (OpenAI/Anthropic)
  - Input validation
  - Prompt engineering
  - Result formatting
- Connect to database

Estimated: 24 hours
Success metric: Can execute one agent end-to-end
```

#### Task 8: Billing Integration
```
- Stripe account setup
- Create subscription products
- Implement checkout flow
- Webhook handlers
- Usage tracking
- Invoice display

Estimated: 12 hours
Success metric: Can purchase plan and see charge
```

---

## Success Metrics by Phase

| Metric | Target | Deadline |
|--------|--------|----------|
| Public pages match N3uralia aesthetic | 100% | Day 3 |
| Real user authentication | Working | Day 5 |
| One agent (Cobranza) executes end-to-end | Yes | Day 7 |
| Stripe checkout functional | Yes | Day 8 |
| Admin dashboard basic view | Live | Day 11 |
| Chile market messaging consistent across site | 100% | Day 11 |

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Agent LLM integration delays | HIGH | Pre-build Cobranza prompt, use GPT-4 first |
| Database schema changes | MEDIUM | Design schema in doc before Supabase setup |
| Stripe sandbox testing takes time | MEDIUM | Use Stripe testing cards early, parallel testing |
| Auth complexity | MEDIUM | Use Better Auth (simpler than custom) |
| Design inconsistency | LOW | Reference brandbook in every PR |

---

## Dependencies & Blockers

**None currently blocking.** All resources available:
- Brandbook defined ✅
- Market research complete ✅
- Design system tokens ready ✅
- Codebase structured ✅

**External dependencies:**
- Supabase project creation (5 min, user action)
- Stripe account setup (10 min, user action)
- OpenAI API key (already exists in env)

---

## What to Build Next (Ranked by Impact)

### 🔴 Critical (Blocking MVP)
1. **Design system components** (4h) — Unblocks all page redesigns
2. **Landing page redesign** (8h) — Sets market positioning
3. **Database schema** (4h) — Unblocks app functionality
4. **Authentication** (16h) — Unblocks user separation
5. **Agent execution engine** (24h) — Core product
6. **Stripe integration** (12h) — Enables revenue

### 🟡 Important (Post-MVP)
7. Admin dashboard — Operations
8. Agent #2 (Compliance) — Market coverage
9. Agent #3 (Licitaciones) — Market coverage
10. Usage analytics — Product insights

### 🟢 Nice-to-have (Polish)
11. Dark/light theme toggle — UX
12. API documentation — Developer experience
13. Email notifications — Engagement
14. Agent templates — Extensibility

---

## Recommended First Step

**RIGHT NOW (next 1 hour):**

1. Create design system components (Typography, Button, Card, Badge)
2. Update globals.css to consistently use brandbook
3. Test across 3 pages (landing, agents, login)

**Then (next 8 hours):**

4. Redesign landing page using new components
5. Update login/signup/pricing pages

**By EOD Day 2:**

6. Set up Supabase + create schema
7. Implement basic auth

This creates a **solid foundation** for agent execution work in week 2.

---

## Files Summary

### Existing & Complete ✅
- `lib/brandbook.ts` — Design tokens
- `app/page.tsx` — Landing (structure, needs redesign)
- `components/app/*` — Help system
- `CHILE_MARKET_ANALYSIS.md` — Market context
- `APP_UX_IMPROVEMENTS.md` — Help system documentation

### Need Creation 🆕
- `components/shared/Typography.tsx`
- `components/shared/Badge.tsx`
- `app/app/database-setup.ts` (Supabase schema)
- `lib/auth-client.ts` (Auth integration)
- `lib/agent-runner.ts` (Execution engine)
- `app/admin/*` (Admin pages)

### Need Redesign 🔄
- `app/page.tsx` (Landing)
- `app/login/page.tsx`
- `app/signup/page.tsx`
- `app/pricing/page.tsx`
- `app/agents/page.tsx` (public)
- `app/layout.tsx` (add footer)
- `app/globals.css` (use brandbook)

---

**Next action:** Start Phase 2.1 — Design System Components (4 hours)
