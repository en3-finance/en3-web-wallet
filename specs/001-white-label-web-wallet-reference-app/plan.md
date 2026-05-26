# Implementation Plan: White-Label Web Wallet Reference App

**Branch**: `001-white-label-web-wallet-reference-app` | **Date**: 2026-05-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-white-label-web-wallet-reference-app/spec.md`

## Summary

Build a white-label web wallet reference app for banks, fintechs, and regulated
digital-asset payment products. The implementation will be a local Vite, React,
and TypeScript browser app under `apps/web-wallet`, powered only by mock JSON
data in `mock/`. It will demonstrate account overview, stablecoin balance,
deposit address, outgoing payment review, transaction simulation, policy/risk/
approval state, transaction history, support/recovery state, a simple events
timeline, and a partner-readable "Powered by En3 API" architecture note.

## Technical Context

**Language/Version**: TypeScript 5.x with React 18

**Primary Dependencies**: Vite, React, React DOM, Vitest

**Storage**: Static mock JSON files in `mock/`; no database, persistence, or
production API connection

**Testing**: Vitest for lightweight data/formatting validation; Vite build for
application validation

**Target Platform**: Local browser demo for desktop and mobile-width web views

**Project Type**: Web application reference app

**Performance Goals**: Local demo loads the primary account view in under 2
seconds on a typical developer machine after dependencies are installed

**Constraints**: No seed phrases, no private keys, no real funds, no real RPC,
no production custody claims, no fake vendor integrations, no secrets, and no
private deployment configuration

**Scale/Scope**: One demo customer, one deposit flow, one outgoing payment flow,
one transaction simulation state, and a small set of mock transactions/events

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Banking-Style Partner UX**: PASS. The UI will lead with account, payment,
  approval, support, and operations language instead of crypto-native framing.
- **Sandbox Truthfulness**: PASS. All balances, addresses, simulations, risk,
  approvals, transactions, and events are mock/reference data.
- **Public Boundary Security**: PASS. No keys, seed phrases, real RPC URLs,
  private endpoints, customer data, internal deployment config, or production
  signing/custody code will be added.
- **API-First Reference Alignment**: PASS. Docs and contracts describe mock data
  alignment to En3 API, SDK, webhook, and control-plane concepts without
  claiming live integrations.
- **Small, Testable Delivery**: PASS. The implementation is a small web app with
  build/test commands and focused docs.

Post-design re-check: PASS. Research, data model, contracts, and quickstart keep
all private production capabilities out of scope and preserve mock-only behavior.

## Project Structure

### Documentation (this feature)

```text
specs/001-white-label-web-wallet-reference-app/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── mock-data-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
.
├── apps/
│   └── web-wallet/
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       └── src/
│           ├── App.tsx
│           ├── main.tsx
│           ├── styles.css
│           └── lib/
│               ├── format.ts
│               └── format.test.ts
├── mock/
│   ├── policy-state.json
│   ├── transactions.json
│   ├── user.json
│   └── wallet-state.json
├── docs/
│   ├── api-contract-alignment.md
│   ├── reference-flow.md
│   └── screens.md
├── package.json
└── README.md
```

**Structure Decision**: Use the existing `apps/web-wallet` directory as the Vite
application root and expose root npm scripts for install, build, test, and dev
workflows. Keep mock data at repository root so docs, tests, and app code share
the same public sandbox fixtures.

## Complexity Tracking

No constitution violations or extra complexity exceptions are required.
