# Pulso Garantia

**Pulso Garantia** is a Stellar/Soroban escrow MVP for cross-border service payments in Latin America.

It is designed for the **NearX Stellar PULSO Hackathon**: 10 days, testnet deployment required, 3 customer discovery interviews required, and a live finalist pitch.

## One-liner

A trust layer for LATAM freelancers, agencies, and small exporters: the buyer funds an escrow, the seller delivers a milestone, and Soroban releases or routes the case through a transparent dispute path.

## Why this can win

Pulso Garantia is built around the judging criteria instead of treating them as afterthoughts.

| Criterion | How the repo addresses it |
| --- | --- |
| Integration depth | Escrow state, authorization, funding, release, refund/dispute paths live in Soroban. Stellar is the core settlement layer. |
| Technical complexity | Smart contract state machine, typed client boundary, testnet proof, audit checklist, event log, future token transfer hook. |
| Ecosystem impact | Uses Stellar for a common LATAM fintech pain: cross-border trust and USD-denominated service payments. |
| Customer validation | Interview scripts, persona hypotheses, scorecards, and evidence template are included. |
| Deployment quality | Scripts/checklists for testnet deploy, demo capture, and submission readiness are included. |

## Product narrative

LATAM freelancers and small service businesses often work across borders. Today they choose between two bad options:

1. ask for advance payment and lose buyers who do not trust them yet;
2. deliver first and risk late payment, partial payment, or no payment.

Pulso Garantia turns that trust gap into a verifiable workflow:

1. buyer and seller define a milestone;
2. buyer funds the escrow on Stellar testnet;
3. seller delivers;
4. buyer releases the funds;
5. if the milestone is not accepted before the deadline, the escrow can enter a dispute/refund path.

## Current status

This repo is intentionally structured for quick iteration with Codex:

- `apps/web`: Vite + React demo app with a polished hackathon story.
- `contracts/escrow`: Soroban Rust contract and tests.
- `docs`: pitch, demo script, architecture, interviews, submission checklist, Codex instructions.
- `scripts`: local helper scripts for submission readiness and demo data generation.

## Demo flow

Run the app and show:

1. market pain and user persona;
2. create an escrow for a real service milestone;
3. fund escrow;
4. display transaction proof / testnet placeholder;
5. release escrow;
6. explain that the contract controls the state transitions and authorization.

## Local setup

```bash
pnpm install
pnpm dev
```

For contract work:

```bash
cd contracts/escrow
cargo test
```

For submission checks:

```bash
pnpm check:submission
```

## Environment

Copy the example env file:

```bash
cp apps/web/.env.example apps/web/.env
```

Key variables:

```bash
VITE_STELLAR_NETWORK=testnet
VITE_ESCROW_CONTRACT_ID=
VITE_STELLAR_EXPLORER_BASE=https://stellar.expert/explorer/testnet/tx
```

## What Codex should finalize next

See [`docs/codex/CODEX_BRIEF.md`](docs/codex/CODEX_BRIEF.md). Priorities:

1. make the Soroban contract compile against the installed Stellar SDK version;
2. add real token transfer logic using the Stellar token contract client;
3. deploy to testnet and paste contract ID into `.env`;
4. generate TypeScript bindings and replace `stellarClient.ts` mock with real calls;
5. record the demo using `docs/demo-script.md`.

## Submission assets

- Pitch deck outline: `docs/pitch-outline.md`
- Slide-by-slide deck copy: `docs/pitch-deck/SLIDES.md`
- Demo script: `docs/demo-script.md`
- Interview plan: `docs/customer-discovery.md`
- Evidence log template: `docs/interviews/evidence-log.md`
- Final checklist: `docs/submission/final-checklist.md`

## License

MIT
