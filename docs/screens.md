# Reference Screens

Screens use banking-style account and payment language and must remain
understandable to non-Web3 fintech partners. All screen data comes from mock JSON
fixtures.

| Screen | Demonstrates | Mock source |
| --- | --- | --- |
| Account Overview | Demo customer, program, account status, available balance, pending settlement, and stablecoin asset card. | `mock/user.json`, `mock/wallet-state.json` |
| Deposit | Sandbox deposit address, asset, network, and no-real-funds label. | `mock/wallet-state.json` |
| Send Payment | Recipient, destination, amount, memo, estimated fee, and settlement estimate. | `mock/policy-state.json` |
| Transaction Simulation | Pre-submit simulation result with checks and next operational step. | `mock/policy-state.json` |
| Policy / Risk / Approval | Mock policy name, risk state, approval state, reviewer role, and audit events. | `mock/policy-state.json` |
| Transaction History | Incoming/outgoing activity, settlement, review, and failed simulation states. | `mock/transactions.json` |
| Webhooks / Events | Webhook-style event timeline for simulation, approval, deposit, and support states. | `mock/policy-state.json` |
| Support / Recovery | Account recovery contact state and partner support guidance without custody operations. | `mock/user.json` |
| Powered by En3 API | API, SDK, webhook, control-plane, and private-boundary architecture note. | Static app copy |

## Demo Flow For Screenshots

1. Start the app with `npm run dev`.
2. Capture the top account overview and no-real-funds notice.
3. Capture the deposit card and outgoing payment review.
4. Capture the policy/approval panel and transaction history.
5. Capture the webhook timeline and Powered by En3 API note.

Screenshots must not be edited to imply live funds, real RPC access, production
custody, vendor integrations, certifications, customers, or regulatory approval.
