# En3 Web Wallet

Status: public reference / sandbox artifact. This repository is intended to document and demonstrate the En3 integration surface. Production cryptography, signing orchestration, policy enforcement, risk logic, ledger infrastructure, treasury execution, and customer deployments are private by design.

## What This Repo Is

`en3-web-wallet` is a white-label web wallet reference app for banks, fintechs, and digital-asset payment products using En3 APIs.

## Who It Is For

This repo is for product, engineering, and diligence teams that need to understand browser-based wallet flows for an En3-powered product.

## What It Demonstrates

- Account overview.
- Wallet balance.
- Deposit address display.
- Send stablecoin flow.
- Transaction status.
- Risk and approval states.
- Support and recovery states.
- "Powered by En3 API" architecture.

## Intentionally Out Of Scope

This repo does not contain production signing, wallet custody, policy enforcement, risk logic, ledger infrastructure, treasury execution, real customer data, private endpoints, or production deployment material.

## Reference Docs

- [Reference flow](docs/reference-flow.md)
- [Screens](docs/screens.md)
- [App skeleton](apps/web-wallet/README.md)

## Related En3 Repositories

- `en3-docs`
- `en3-api-spec`
- `en3-wallet-sdk`
- `en3-admin-console`
- `en3-reference-bank`
- `en3-mobile-wallet`
- `en3-chain-integrations`
