# API Contract Alignment

This repository does not expose a production En3 API implementation. It uses
mock JSON fixtures to make the web wallet reference app easy to compare with
En3 API, SDK, webhook, and control-plane concepts.

## Related Repositories

- `en3-api-spec`: Expected home for public API schemas and endpoint contracts.
- `en3-wallet-sdk`: Expected home for SDK examples and client integration helpers.
- `en3-reference-bank`: Expected home for partner-bank reference integration patterns.

The web wallet app references these repositories by name only. It does not
import private code, call private endpoints, or require live credentials.

## Mock Fixture Alignment

| Fixture | API concept | Notes |
| --- | --- | --- |
| `mock/user.json` | Partner customer profile and support state | Represents a customer already authenticated by a partner product. |
| `mock/wallet-state.json` | Wallet account, balances, deposit instructions | Uses sandbox labels and fake identifiers only. |
| `mock/policy-state.json` | Payment draft, simulation, risk, approval, audit, webhooks | Models control-plane states without real policy enforcement or vendor checks. |
| `mock/transactions.json` | Transaction lifecycle history | Demonstrates visible payment status language for users and operations teams. |

## Public Boundary

The mock contract intentionally excludes:

- Production custody or signing orchestration.
- Real ledger or treasury execution.
- Real risk, KYT, sanctions, or address-risk vendor integrations.
- Real RPC URLs, private endpoints, customer data, secrets, or deployment config.
- Claims of audited MPC/TSS, production readiness, live customers, or regulatory
  approval.

## Expected Integration Shape

1. A partner product authenticates the user and maps them to a wallet account.
2. A partner backend requests wallet state and payment status through En3 APIs.
3. The frontend presents balances, deposit instructions, payment drafts,
   simulation results, policy states, approvals, transaction history, support
   state, and webhook-derived updates.
4. Private En3 infrastructure handles production-only custody, signing, ledger,
   treasury, policy enforcement, and deployment responsibilities outside this
   public repo.
