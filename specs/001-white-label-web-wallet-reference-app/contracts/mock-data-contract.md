# Mock Data Contract

This contract describes the checked-in public mock data consumed by the
white-label web wallet reference app. It is not a production API contract and
does not represent live En3 infrastructure.

## Files

- `mock/user.json`: Demo customer profile and support/recovery state.
- `mock/wallet-state.json`: Mock wallet account, deposit address, balances, and
  account-level state.
- `mock/policy-state.json`: Mock outgoing payment draft, simulation result,
  policy/risk/approval state, audit trail, and webhook events.
- `mock/transactions.json`: Mock transaction history.

## Shared Rules

- All identifiers MUST be fake and prefixed or named as demo/mock/reference data.
- No secrets, seed phrases, private keys, real RPC URLs, production API hosts,
  private endpoints, customer data, or vendor credentials may appear.
- Amounts SHOULD be represented as decimal strings for display stability.
- Timestamps MUST use ISO 8601 strings.
- Status labels MUST be understandable to non-Web3 fintech partners.

## `mock/user.json`

Required fields:

- `id`
- `name`
- `customerType`
- `programName`
- `accountStatus`
- `supportState`
- `supportSummary`
- `relationshipManager`

## `mock/wallet-state.json`

Required fields:

- `userId`
- `walletId`
- `accountLabel`
- `depositAddress`
- `depositNetwork`
- `approvalState`
- `balances[]`

Each balance requires:

- `asset`
- `displayName`
- `network`
- `available`
- `pending`
- `settlement`
- `status`

## `mock/policy-state.json`

Required fields:

- `policyId`
- `policyName`
- `riskLevel`
- `approvalState`
- `approverRole`
- `paymentDraft`
- `simulation`
- `auditTrail[]`
- `events[]`

The payment draft requires `recipientName`, `destinationAddress`, `amount`,
`asset`, `network`, `memo`, `estimatedFee`, and `settlementEstimate`.

The simulation requires `status`, `summary`, `checks[]`, and `nextStep`.

Events require `id`, `type`, `timestamp`, and `summary`.

## `mock/transactions.json`

Each transaction requires:

- `id`
- `direction`
- `asset`
- `amount`
- `network`
- `status`
- `counterparty`
- `createdAt`
- `updatedAt`
- `description`
