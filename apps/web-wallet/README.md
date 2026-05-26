# Web Wallet Reference App

This directory contains the Vite, React, and TypeScript implementation for the
public En3 white-label web wallet reference app.

## Scope

The app demonstrates:

- Demo customer account overview.
- Payment balance and stablecoin asset card.
- Sandbox deposit address.
- Outgoing payment review.
- Transaction simulation result.
- Policy, risk, approval, and audit states.
- Transaction history.
- Webhook/event timeline.
- Support and recovery state.
- Powered by En3 API architecture note.

All app state is loaded from mock JSON files at the repository root. The app does
not connect to real funds, real RPC, production APIs, private endpoints, custody,
signing, ledger, treasury, compliance vendors, or customer deployments.

## Commands

From the repository root:

```bash
npm install
npm run dev
npm test
npm run build
```

From this directory after dependencies are installed at the root:

```bash
npm run dev
npm run test
npm run build
```

## Implementation Notes

- `src/App.tsx` renders the reference account and payment flows.
- `src/styles.css` contains the banking-style responsive UI.
- `src/lib/format.ts` contains display helpers for amounts, timestamps, labels,
  and mock references.
- `src/lib/format.test.ts` provides lightweight validation for display behavior.
