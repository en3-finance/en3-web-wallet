# Web Wallet Reference Flow

This flow is a public, mock-only reference for a bank, fintech, remittance
company, or regulated digital-asset payment product evaluating En3 concepts. It
does not move real funds and does not connect to production custody, signing,
ledger, treasury, compliance, or RPC infrastructure.

## Demo Customer

- Program: North Harbor Pay.
- Customer: Amina Farouk, SMB payout operator.
- Account: North Harbor Pay - Operating Account.
- Asset: USDC on a sandbox network label.

## Account And Deposit Flow

1. A partner product identifies the customer in its own system.
2. The product backend maps that customer to an En3 wallet account identifier.
3. The web wallet displays the account overview, available payment balance,
   pending settlement amount, stablecoin asset card, and account support state.
4. The deposit section shows a sandbox deposit address and network label.
5. The UI labels the address as mock/reference-only and states that no real
   funds are accepted.

## Outgoing Payment Flow

1. The send panel displays a prepared outgoing payment draft.
2. The user reviews recipient, destination, amount, asset, network, memo,
   estimated fee, and settlement estimate.
3. A sandbox transaction simulation result is shown before any payment is
   represented as complete.
4. Policy, risk, and approval states route the mock payment to operations review.
5. The transaction history records the payment as `requires_approval`.

## Operations And Events Flow

1. Transaction history lists incoming and outgoing account activity.
2. The events timeline shows webhook-style events such as simulation completion,
   approval requirement, deposit settlement, and recovery-contact verification.
3. The support/recovery panel shows account support state without seed phrases,
   private keys, or custody operations.

## Powered By En3 API Note

The public UI demonstrates how a partner-facing app can consume En3-style wallet
orchestration, simulation, approval, audit, and webhook states. Production
cryptography, signing orchestration, policy enforcement, risk logic, ledger,
treasury, and deployments are private by design.
