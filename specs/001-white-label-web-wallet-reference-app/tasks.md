# Tasks: White-Label Web Wallet Reference App

**Input**: Design documents from `/specs/001-white-label-web-wallet-reference-app/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Include lightweight Vitest coverage because the feature request asks
for simple tests where practical.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic web app structure

- [x] T001 Create root npm scripts and dependency manifest in package.json
- [x] T002 Create web wallet package metadata in apps/web-wallet/package.json
- [x] T003 Configure Vite and TypeScript in apps/web-wallet/vite.config.ts and apps/web-wallet/tsconfig.json
- [x] T004 Create browser entry files in apps/web-wallet/index.html and apps/web-wallet/src/main.tsx
- [x] T005 Verify ignore patterns for Node, build output, logs, secrets, and editor files in .gitignore

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared mock data, data helpers, and app shell required by all stories

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create demo customer fixture in mock/user.json
- [x] T007 Update wallet account fixture in mock/wallet-state.json
- [x] T008 Update transaction history fixture in mock/transactions.json
- [x] T009 Create policy, simulation, approval, and webhook fixture in mock/policy-state.json
- [x] T010 Create formatting helpers and tests in apps/web-wallet/src/lib/format.ts and apps/web-wallet/src/lib/format.test.ts
- [x] T011 Create base app layout and styling foundation in apps/web-wallet/src/App.tsx and apps/web-wallet/src/styles.css

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Review Account And Payment Readiness (Priority: P1) MVP

**Goal**: Show the demo account overview, stablecoin balance, deposit address,
support state, and architecture note.

**Independent Test**: Run the app and verify account overview, balance, asset
card, sandbox deposit address, support state, and "Powered by En3 API" note are
visible with mock-only labels.

### Tests for User Story 1

- [x] T012 [P] [US1] Add account and balance formatting assertions in apps/web-wallet/src/lib/format.test.ts

### Implementation for User Story 1

- [x] T013 [US1] Implement account overview, balance summary, and stablecoin asset card in apps/web-wallet/src/App.tsx
- [x] T014 [US1] Implement sandbox deposit address and support/recovery sections in apps/web-wallet/src/App.tsx
- [x] T015 [US1] Implement Powered by En3 API architecture note in apps/web-wallet/src/App.tsx
- [x] T016 [US1] Style account, deposit, support, and architecture sections in apps/web-wallet/src/styles.css

**Checkpoint**: User Story 1 is independently demoable

---

## Phase 4: User Story 2 - Simulate An Outgoing Payment (Priority: P2)

**Goal**: Show outgoing payment details with simulation, policy, risk, and
approval states before any payment is represented as complete.

**Independent Test**: Review the payment panel and confirm destination, amount,
asset, network, memo, fee, settlement estimate, simulation result, policy state,
risk state, approval state, and next step are visible as sandbox data.

### Tests for User Story 2

- [x] T017 [P] [US2] Add simulation and approval label assertions in apps/web-wallet/src/lib/format.test.ts

### Implementation for User Story 2

- [x] T018 [US2] Implement outgoing payment draft panel in apps/web-wallet/src/App.tsx
- [x] T019 [US2] Implement transaction simulation result and checks in apps/web-wallet/src/App.tsx
- [x] T020 [US2] Implement policy, risk, approval, and audit state display in apps/web-wallet/src/App.tsx
- [x] T021 [US2] Style payment, simulation, and control-plane sections in apps/web-wallet/src/styles.css

**Checkpoint**: User Story 2 is independently demoable

---

## Phase 5: User Story 3 - Inspect Operations And Recovery Timeline (Priority: P3)

**Goal**: Show transaction history, webhook/event timeline, audit-style events,
and recovery/support state.

**Independent Test**: Review the operations section and confirm transaction
history, event timeline, approval events, and recovery guidance are shown as
mock/reference states.

### Tests for User Story 3

- [x] T022 [P] [US3] Add transaction and event display assertions in apps/web-wallet/src/lib/format.test.ts

### Implementation for User Story 3

- [x] T023 [US3] Implement transaction history in apps/web-wallet/src/App.tsx
- [x] T024 [US3] Implement webhook/events timeline in apps/web-wallet/src/App.tsx
- [x] T025 [US3] Style transaction history and event timeline in apps/web-wallet/src/styles.css

**Checkpoint**: All user stories are independently demoable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, validation, and public repository safeguards

- [x] T026 [P] Update reference flow documentation in docs/reference-flow.md
- [x] T027 [P] Update screen documentation in docs/screens.md
- [x] T028 [P] Create API contract alignment documentation in docs/api-contract-alignment.md
- [x] T029 Update root README with local run instructions and demo flow in README.md
- [x] T030 Update app README with implementation notes in apps/web-wallet/README.md
- [x] T031 Run npm install to create lockfile in package-lock.json
- [x] T032 Run tests and build from package.json scripts
- [x] T033 Run public secret scan for requested patterns across the repository
- [x] T034 Create final implementation report in CODEX_REPORT.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies.
- Foundational (Phase 2): Depends on Setup completion and blocks all stories.
- User Stories (Phase 3+): Depend on Foundational completion.
- Polish (Phase 6): Depends on desired user stories being complete.

### User Story Dependencies

- User Story 1 (P1): Starts after Foundational; MVP scope.
- User Story 2 (P2): Starts after Foundational and uses policy-state fixture.
- User Story 3 (P3): Starts after Foundational and uses transaction/event fixtures.

### Parallel Opportunities

- Documentation tasks T026, T027, and T028 can run in parallel.
- Test additions T012, T017, and T022 touch the same file and must be sequenced
  during a single implementer run despite being logically independent.
- User stories can be assigned independently after Foundational completion, but
  this implementation will complete them in priority order.

## Implementation Strategy

### MVP First

1. Complete setup and foundational tasks.
2. Complete User Story 1 and validate the account/deposit overview.
3. Add User Story 2 payment simulation and approval state.
4. Add User Story 3 operations timeline.
5. Run tests, build, docs review, and secret scan before final commit.
