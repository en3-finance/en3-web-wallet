# Research: White-Label Web Wallet Reference App

## Decision: Use Vite, React, and TypeScript for the reference app

**Rationale**: The repository already describes a planned Vite, React, and
TypeScript app. This stack keeps the app lightweight, easy to run locally, and
familiar to partner engineering teams reviewing a web reference implementation.

**Alternatives considered**: A static HTML/CSS demo would reduce dependencies but
would make typed mock-data alignment and future UI testing weaker. A larger app
framework would add routing and server concepts that are unnecessary for this
single-screen reference demo.

## Decision: Keep all state in checked-in mock JSON files

**Rationale**: The public repo must not connect to real funds, real RPC,
production APIs, vendor systems, or private deployments. Mock JSON fixtures make
the public/private boundary explicit and easy to review.

**Alternatives considered**: A local mock server was considered, but it would
increase setup and imply API behavior beyond the scope of a reference UI. Inline
mock objects were rejected because separate files better align with the requested
`mock/` contract and API-spec review workflow.

## Decision: Model policy, risk, approval, and events as sandbox control-plane data

**Rationale**: Partners need to understand how En3 payment orchestration can
surface decision states without exposing production policy enforcement or risk
logic. A mock control-plane fixture can show state names and timelines safely.

**Alternatives considered**: Implementing real policy evaluation was rejected
because production policy enforcement and risk logic are private by design.

## Decision: Test simple data/formatting behavior with Vitest

**Rationale**: A small public reference app benefits from quick validation that
mock amounts and labels render predictably. Vitest keeps tests fast and aligned
with the Vite stack.

**Alternatives considered**: Full browser E2E tests were deferred because this
feature is a small MVP and CI browser dependencies may make public validation
less reliable.
