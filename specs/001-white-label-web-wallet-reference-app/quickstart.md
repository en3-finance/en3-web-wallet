# Quickstart: White-Label Web Wallet Reference App

## Prerequisites

- Node.js 20 or newer.
- npm 10 or newer.

## Local Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Demo Flow

1. Review the demo customer account overview and payment balance.
2. Inspect the stablecoin asset card and sandbox deposit address.
3. Review the outgoing payment draft and transaction simulation result.
4. Confirm the policy, risk, and approval state is labeled as mock/sandbox.
5. Inspect transaction history, webhook events, support/recovery state, and the
   "Powered by En3 API" architecture note.

## Public Boundary Validation

Confirm the app and mock files do not contain seed phrases, private keys, real
RPC URLs, production API hosts, real customer data, or production custody claims.
