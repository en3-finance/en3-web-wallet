# En3 Web Wallet

Status: public reference / sandbox artifact. This repository demonstrates a
white-label web wallet reference app for banks, fintechs, remittance companies,
and regulated digital-asset payment products evaluating En3 sandbox concepts.

Production cryptography, signing orchestration, policy enforcement, risk logic,
ledger infrastructure, treasury execution, and customer deployments are private
by design.

## What This Repo Is

`en3-web-wallet` is a browser reference app that shows how an En3-powered
product can present account and payment flows using familiar banking language.
It is API-first in shape, but all current data is checked-in mock JSON.

The demo includes:

- Account overview and payment balance.
- Stablecoin asset card.
- Sandbox deposit address.
- Outgoing payment review.
- Transaction simulation result.
- Policy, risk, and approval state.
- Transaction history.
- Support and recovery state.
- Webhook/event timeline.
- "Powered by En3 API" architecture note.

## What This Repo Is Not

This repo does not contain production signing, wallet custody, real funds, real
RPC access, policy enforcement, risk logic, compliance vendor integrations,
ledger infrastructure, treasury execution, real customer data, private
endpoints, or production deployment material.

It does not claim production readiness, audited MPC/TSS, live customers,
partnerships, certifications, regulatory approval, or vendor integrations.

## Local Run

Prerequisites:

- Node.js 20 or newer.
- npm 10 or newer.

Install and start the reference app:

```bash
npm install
npm run dev
```

Build and test:

```bash
npm test
npm run build
```

## Demo Flow

1. Review the North Harbor Pay demo account overview.
2. Check the available USDC payment balance and pending settlement amount.
3. Inspect the stablecoin asset card and sandbox deposit address.
4. Review the outgoing payment draft and simulation result.
5. Confirm the policy, risk, and approval state routes the mock payment to
   operations review.
6. Inspect transaction history, webhook-style events, support/recovery state,
   and the Powered by En3 API architecture note.

## Mock Data

- `mock/user.json`
- `mock/wallet-state.json`
- `mock/policy-state.json`
- `mock/transactions.json`

These files are public sandbox fixtures only. Do not add secrets, real RPC URLs,
customer data, private endpoints, production custody material, or internal
deployment configuration.

## Reference Docs

- [Reference flow](docs/reference-flow.md)
- [Screens](docs/screens.md)
- [API contract alignment](docs/api-contract-alignment.md)
- [Security policy](SECURITY.md)

## Related En3 Repositories

- `en3-docs`
- `en3-api-spec`
- `en3-wallet-sdk`
- `en3-admin-console`
- `en3-reference-bank`
- `en3-mobile-wallet`
- `en3-chain-integrations`
