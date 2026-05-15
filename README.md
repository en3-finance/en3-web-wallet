# en3-web-wallet

Public demo web wallet for EVM-compatible networks, designed to demonstrate en3 wallet infrastructure interfaces for financial institutions.

Status: Early public preview

## Overview

This repository will contain the public demo web wallet surface for en3. It is intended to demonstrate browser-based wallet interface flows, EVM-compatible network configuration, and documented platform API boundaries.

## Planned Stack

The planned stack is:

- Vite.
- React.
- TypeScript.
- viem/wagmi or equivalent EVM tooling.
- EVM-compatible chain configuration.
- Demo mode.
- Integration with en3 platform APIs through documented boundaries.

No production web wallet code has been added yet.

## What This Repository Contains

- Public demo web wallet documentation.
- Source placeholder structure.
- Web security notes.
- EVM network support notes.
- Demo scope and roadmap.

## What This Repository Does Not Contain

- Production MPC.
- Real custody backend.
- Compliance engine.
- Country-specific policy logic.
- Production customer deployments.
- Private policies.
- Backend secrets.
- Production endpoints.

## Enterprise Wallet Infrastructure Context

The web wallet is a demo interface for the broader en3 enterprise wallet infrastructure stack. Production custody, signing, compliance, policy, and release operations remain private.

## Public Demo And Integration Boundary

The public demo should use placeholders and documented API boundaries. It is not the proprietary production custody layer.

## Security And Custody Boundary

Browser wallet demos must not contain seed phrases, production keys, production custody logic, sensitive customer data, backend secrets, or private compliance material.

## Roadmap

- Add a Vite, React, and TypeScript scaffold.
- Add demo network selection.
- Add demo transaction review flow.
- Add documented platform API boundary examples.
- Add browser security checklist.

## Contact

Website: https://en3.finance

