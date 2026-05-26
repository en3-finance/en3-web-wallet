# Feature Specification: White-Label Web Wallet Reference App

**Feature Branch**: `001-white-label-web-wallet-reference-app`

**Created**: 2026-05-26

**Status**: Draft

**Input**: User description: "Build a white-label web wallet reference app for banks, fintechs, and digital-asset payment products using En3 sandbox concepts."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Review Account And Payment Readiness (Priority: P1)

A fintech product manager or partner engineer opens the reference app and sees a
branded demo customer account with balances, stablecoin asset details, deposit
address, recent activity, and a clear "Powered by En3 API" architecture note.

**Why this priority**: The account overview is the first screen partners use to
understand how En3 wallet concepts map to familiar account and payment language.

**Independent Test**: Load the app with mock data and verify the account summary,
available balance, pending balance, stablecoin card, deposit address, recent
activity, support state, and architecture note are visible without requiring
private keys, seed phrases, real funds, or a real network.

**Acceptance Scenarios**:

1. **Given** a demo customer with mock wallet state, **When** the account overview
   loads, **Then** the user sees account status, payment balance, stablecoin
   details, and recent transactions in banking-style language.
2. **Given** the deposit section is visible, **When** the user reviews the
   deposit instructions, **Then** the app shows a sandbox deposit address,
   network, asset, and copy-style action without implying real funds or a live
   RPC connection.
3. **Given** the user wants integration context, **When** they review the
   architecture note, **Then** the app explains the En3 API, SDK, webhook, and
   control-plane boundaries as public reference concepts.

---

### User Story 2 - Simulate An Outgoing Payment (Priority: P2)

A partner evaluator starts a send payment flow, reviews destination, amount,
asset, memo, policy result, risk state, approval state, and a simulated outcome
before any transaction is treated as complete.

**Why this priority**: The send flow demonstrates how En3 sandbox transaction
simulation, policy, risk, and approval states can be presented in a regulated
payment product.

**Independent Test**: Use the outgoing payment panel to review a populated
payment request and confirm the app displays simulation, policy, risk, approval,
and expected next-step states without submitting real funds.

**Acceptance Scenarios**:

1. **Given** an outgoing payment draft, **When** the user reviews payment details,
   **Then** the app shows destination, asset, network, amount, memo, fees, and
   settlement estimate using mock data.
2. **Given** the payment requires approval, **When** the simulation result is
   shown, **Then** the app presents policy, risk, and approval status as sandbox
   control-plane states.
3. **Given** a non-technical fintech partner views the result, **When** they read
   the state labels, **Then** the labels avoid seed phrases, private keys, and
   crypto-trader terminology.

---

### User Story 3 - Inspect Operations And Recovery Timeline (Priority: P3)

A support or operations reviewer inspects transaction history, webhook/event
timeline, audit-style events, and recovery/support state for the demo account.

**Why this priority**: Operations visibility shows that wallet experiences need
support, status, and event transparency beyond the send and deposit screens.

**Independent Test**: Open the operations timeline and verify transactions,
webhook events, approval events, support status, and recovery guidance are
shown as mock/reference states with no production compliance or custody claims.

**Acceptance Scenarios**:

1. **Given** mock transaction history exists, **When** the operations view loads,
   **Then** the user sees transaction statuses ordered by recency with clear
   settlement and review states.
2. **Given** mock webhook events exist, **When** the user reviews the event
   timeline, **Then** the app shows event names, timestamps, and descriptions
   aligned to an API-first integration pattern.
3. **Given** the demo account has a support/recovery state, **When** the user
   views support details, **Then** the app provides partner-friendly guidance
   without exposing custody operations.

### Edge Cases

- Mock balance, user, policy, or transaction data is missing or malformed.
- A transaction is pending approval, rejected, failed simulation, settled, or
  awaiting webhook confirmation.
- The deposit address is unavailable in sandbox data.
- The user views the app on a narrow mobile screen.
- A partner searches for production-readiness, custody, compliance, or vendor
  claims in the public app.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST display one demo customer account with account name,
  customer type, account status, program name, and support/recovery status.
- **FR-002**: The app MUST display wallet balance information using payment and
  account language, including available balance, pending balance, asset, and
  network.
- **FR-003**: The app MUST display a stablecoin asset card with mock asset,
  network, settlement, and reference-only status details.
- **FR-004**: The app MUST display a sandbox deposit flow with a deposit address,
  network, asset, and clear no-real-funds labeling.
- **FR-005**: The app MUST display an outgoing payment flow with destination,
  amount, asset, network, memo, estimated fee, and settlement estimate from mock
  data.
- **FR-006**: The app MUST display a transaction simulation result before
  presenting any outgoing payment as complete.
- **FR-007**: The app MUST display policy, risk, and approval states for the
  outgoing payment using mock control-plane data.
- **FR-008**: The app MUST display transaction history with statuses and
  timestamps from mock transaction data.
- **FR-009**: The app MUST display a webhook/events timeline when simple mock
  event data is available.
- **FR-010**: The app MUST display support/recovery state without seed phrases,
  private keys, or custody operations.
- **FR-011**: The app MUST include a partner-readable "Powered by En3 API"
  architecture note describing SDK/API/webhook/control-plane boundaries.
- **FR-012**: The app MUST clearly label mock, sandbox, and reference-only
  behavior and MUST NOT claim production custody, live funds, real RPC access,
  live customers, vendor integrations, certifications, or regulatory approval.
- **FR-013**: The repository MUST include mock data files for wallet state,
  transactions, user, and policy state aligned to En3 sandbox concepts.
- **FR-014**: The repository MUST include README and docs covering the reference
  flow, screens, and API-contract alignment.
- **FR-015**: The implementation MUST provide a build command that passes for the
  reference app and add simple tests where practical.

### Key Entities *(include if feature involves data)*

- **Demo Customer**: A mock bank or fintech customer profile with account,
  program, segment, and support/recovery attributes.
- **Wallet Account**: A mock En3 wallet account with asset balances, deposit
  address, and account state.
- **Stablecoin Asset**: A mock payment asset with symbol, network, settlement
  characteristics, and display status.
- **Payment Draft**: A mock outgoing payment request including destination,
  amount, asset, memo, fee estimate, and settlement estimate.
- **Simulation Result**: A mock result that explains whether a payment may
  proceed, requires approval, or needs review.
- **Policy State**: Mock policy, risk, approval, and audit states for a payment.
- **Transaction**: A mock transaction history item with direction, status,
  timestamps, and lifecycle details.
- **Webhook Event**: A mock event representing integration callbacks or audit
  timeline updates.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time partner evaluator can identify the demo account,
  available payment balance, deposit address, and outgoing payment status in
  under 2 minutes.
- **SC-002**: The primary account, deposit, send, simulation, policy, history,
  events, support, and architecture sections are visible and understandable in a
  single local demo session.
- **SC-003**: The app can be built locally with one documented command and no
  production secrets or private environment variables.
- **SC-004**: A repository scan for common secret patterns returns no exposed
  tokens, private keys, real RPC URLs, or production API credentials.
- **SC-005**: At least one automated validation or test confirms formatting or
  display behavior for mock wallet/payment data.

## Assumptions

- The first implementation is a local browser demo rather than a production
  hosted application.
- Authentication is out of scope; the demo begins after a bank or fintech has
  identified the customer in its own product.
- All balances, addresses, policy states, risk states, approvals, transactions,
  and webhook events are mock sandbox data.
- The public repo links to related En3 repositories by name only and does not
  require live cross-repository dependencies.
- Mobile responsiveness is required for evaluation, but native mobile apps are
  out of scope for this feature.
