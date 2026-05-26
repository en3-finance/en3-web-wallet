<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template principle 1 placeholder -> Banking-Style Partner UX
- Template principle 2 placeholder -> Sandbox Truthfulness
- Template principle 3 placeholder -> Public Boundary Security
- Template principle 4 placeholder -> API-First Reference Alignment
- Template principle 5 placeholder -> Small, Testable Delivery
Added sections:
- Public Repository Constraints
- Development Workflow
Removed sections:
- Placeholder template guidance
Templates requiring updates:
- .specify/templates/plan-template.md - reviewed, no update required
- .specify/templates/spec-template.md - reviewed, no update required
- .specify/templates/tasks-template.md - reviewed, no update required
Follow-up TODOs:
- None
-->
# En3 Web Wallet Constitution

## Core Principles

### I. Banking-Style Partner UX
The reference app MUST present wallet capabilities through account, payment,
approval, support, and operations language that a bank, fintech, remittance
company, or regulated payment product can understand. It MUST NOT use
crypto-trader framing, seed phrase recovery, private-key handling, speculative
asset language, or production custody claims. The rationale is that this public
repo exists to explain En3 sandbox concepts to non-Web3 fintech partners.

### II. Sandbox Truthfulness
Public flows MUST be labeled and implemented as mock, sandbox, demo, or
reference behavior unless production code in this repository proves otherwise.
The app MUST NOT imply real funds, real RPC access, real customer deployments,
live vendor integrations, audited MPC/TSS, regulatory approval, or production
readiness. The rationale is to keep public material accurate and diligence-safe.

### III. Public Boundary Security
The repository MUST NOT contain seed phrases, private keys, access tokens,
production API hosts, real RPC URLs, customer data, internal deployment
configuration, or private partner information. Production cryptography, signing
orchestration, policy enforcement, risk logic, ledger infrastructure, treasury
execution, and customer deployment code are private by design. The rationale is
to keep the public repo useful without exposing sensitive systems.

### IV. API-First Reference Alignment
Reference UI, mock data, contracts, and docs MUST describe an API-first En3
integration surface: SDK/API/webhooks, wallet orchestration, policy and approval
states, audit events, and sandbox transaction simulation. Compliance-readiness
interfaces MAY be shown as mock boundaries, but the repo MUST NOT invent fake
vendor integrations or credentials. The rationale is to make the reference app
easy to align with En3 API specifications and partner integration reviews.

### V. Small, Testable Delivery
Changes MUST favor small, working, testable increments over broad unfinished
scaffolding. Useful existing docs and files MUST be preserved. Builds or tests
MUST run when available, and lightweight automation MAY be added only when it is
likely to pass in a public repository. The rationale is to keep the reference
surface maintainable and credible.

## Public Repository Constraints

- The app MUST use mock JSON or documented sandbox examples for balances,
  addresses, policy states, risk states, approvals, transactions, and webhooks.
- Any unsupported or private capability MUST be explicitly labeled private,
  mock, sandbox, demo, or intentionally out of scope.
- Documentation MUST avoid live customers, pilots, partnerships, regulatory
  approvals, certifications, fundraising context, private partner names, and
  deck-sensitive material.
- SECURITY.md MUST exist and preserve the public/private boundary.

## Development Workflow

- Start each feature with Spec Kit artifacts: spec, plan, tasks, and analysis
  before implementation.
- Keep implementation paths and task files traceable to user stories and
  functional requirements.
- Add or update README and docs for public-facing behavior.
- Run build, tests, and a simple secret scan before final commit when tooling is
  available.

## Governance

This constitution supersedes conflicting feature specs, plans, task lists, and
implementation choices in this repository. Amendments require an explicit
constitution update that records the semantic version change and reviews
dependent templates or guidance docs. Version changes follow semantic versioning:
MAJOR for incompatible governance changes, MINOR for new or materially expanded
principles, and PATCH for clarifications. Every Spec Kit plan and implementation
review MUST verify compliance with these principles before work is considered
complete.

**Version**: 1.0.0 | **Ratified**: 2026-05-26 | **Last Amended**: 2026-05-26
