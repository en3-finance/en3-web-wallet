# Data Model: White-Label Web Wallet Reference App

## DemoCustomer

- `id`: Stable mock user identifier.
- `name`: Demo customer display name.
- `customerType`: Partner-friendly customer category.
- `programName`: White-label program name.
- `accountStatus`: Display status for the account.
- `supportState`: Current support/recovery state.
- `relationshipManager`: Mock partner support contact label.

Validation: Must be clearly fake/demo data and must not contain real customer
information.

## WalletAccount

- `userId`: Links to `DemoCustomer.id`.
- `walletId`: Mock wallet account identifier.
- `accountLabel`: Partner-facing account name.
- `depositAddress`: Sandbox/reference address string.
- `depositNetwork`: Network label for the deposit flow.
- `balances`: List of `AssetBalance` records.
- `approvalState`: Current high-level approval state.

Validation: Deposit address must be labeled sandbox/reference. No private keys,
seed phrases, real RPC hosts, or production custody data are allowed.

## AssetBalance

- `asset`: Asset symbol displayed in the stablecoin card.
- `displayName`: Human-readable asset name.
- `network`: Sandbox network label.
- `available`: Available mock balance.
- `pending`: Pending mock balance.
- `settlement`: Mock settlement description.
- `status`: Reference-only asset state.

Validation: Amounts are strings in decimal currency format for display.

## PaymentDraft

- `id`: Mock outgoing payment identifier.
- `recipientName`: Recipient display name.
- `destinationAddress`: Mock destination address.
- `amount`: Mock outgoing amount.
- `asset`: Asset symbol.
- `network`: Network label.
- `memo`: Payment memo.
- `estimatedFee`: Mock fee estimate.
- `settlementEstimate`: Mock settlement estimate.

Validation: Must be presented as simulation/reference behavior, not a real
transaction submission.

## SimulationResult

- `id`: Mock simulation identifier.
- `status`: One of `ready`, `requires_approval`, `blocked`, or `failed`.
- `summary`: Partner-readable result.
- `checks`: List of named sandbox checks and outcomes.
- `nextStep`: Partner-readable operational next step.

State transitions: `ready` may proceed to review; `requires_approval` waits for
approval; `blocked` or `failed` stops the mock payment.

## PolicyState

- `policyId`: Mock policy identifier.
- `policyName`: Display name.
- `riskLevel`: Low, medium, or high display state.
- `approvalState`: Approval workflow state.
- `approverRole`: Mock role expected to review.
- `auditTrail`: List of audit-style control-plane events.
- `paymentDraft`: Associated `PaymentDraft`.
- `simulation`: Associated `SimulationResult`.
- `events`: List of `WebhookEvent` records.

Validation: Must not claim real compliance decisions, sanctions checks, KYT
verdicts, or vendor integrations.

## Transaction

- `id`: Mock transaction identifier.
- `direction`: `incoming` or `outgoing`.
- `asset`: Asset symbol.
- `amount`: Decimal display amount.
- `network`: Network label.
- `status`: Lifecycle state.
- `counterparty`: Sender or recipient display label.
- `createdAt`: ISO timestamp.
- `updatedAt`: ISO timestamp.
- `description`: Partner-readable lifecycle detail.

## WebhookEvent

- `id`: Mock event identifier.
- `type`: API/webhook event name.
- `timestamp`: ISO timestamp.
- `summary`: Partner-readable event summary.
- `relatedTransactionId`: Optional transaction identifier.

Validation: Events are examples only and must not imply production webhook
delivery or customer deployments.
