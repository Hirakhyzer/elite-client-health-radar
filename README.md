# Elite Client Health & Renewal Radar

A white, black, and `#f4af00` gold React client-success workspace for **Elite Era Development L.L.C.** It calculates account health, churn risk, renewal confidence, retention actions, and expansion opportunities from real delivery, support, finance, relationship, and adoption signals.

## Workflow

```text
Client onboarding and delivery
→ Support, finance, adoption, and meeting signals
→ Account health score and churn risk
→ Save plan or proactive success plan
→ Renewal forecast and expansion recommendation
→ Client-safe account review
```

## What it calculates

- Account health score from delivery schedule, delay days, pending approvals, support tickets, critical tickets, overdue invoices, invoice balance, satisfaction, contact recency, and adoption
- Health condition: **Healthy**, **Watch**, **At risk**, or **Critical**
- Churn risk: **Low**, **Medium**, or **High**
- Renewal timing and probability-adjusted retention forecast
- Expansion signal and recommended value-add offers
- Account-specific recovery plan for support, finance, delivery, relationship, and adoption problems

## Features

- Founder command center for portfolio health, retention revenue, risk, and expansion pipeline
- Interactive client account workspace
- Editable account controls that recalculate health instantly
- Meeting notes, relationship sentiment, account actions, owners, and due dates
- Tailored client save plans
- Renewal and expansion radar
- Client-safe account review that hides internal scores, churn calculations, financial exposure, and team information
- TXT, JSON, and print/PDF account reports
- Saved client-review snapshots
- Local browser storage
- Responsive Elite Era design
- Unit tests and GitHub Actions build workflow

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal, usually `http://localhost:5173`.

## Run tests

```bash
npm test
```

## Project structure

```text
src/
  data.js             Client account, service, meeting, and action data
  engine.js           Health, churn, renewal, expansion, and save-plan logic
  App.jsx             State, persistence, exports, and workflow actions
  views/              Dashboard, accounts, renewals, client review, reports
  styles.css          Shared white/black/gold design imports
```

## Production note

This is a functional browser prototype. Production deployment should add secure authentication, server-enforced role permissions, a database, audit logs, client portal access controls, CRM and invoice integrations, support-ticket sync, notification workflows, and integration with Elite OS.

---

## Author

Made by **Hira Khyzer**

Developed as part of the **Elite Era Development L.L.C** project portfolio.

Brand color: `#f4af00`
