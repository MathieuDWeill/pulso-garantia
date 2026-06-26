# Codex brief — make Pulso Garantia submission-ready

You are finalizing a hackathon repo. Optimize for a working demo, readable code, and judging clarity.

## Goal

Ship a Stellar testnet demo for **Pulso Garantia**, a Soroban escrow for LATAM cross-border service payments.

## Non-negotiables

- Keep Stellar/Soroban load-bearing: no fake blockchain-only-in-README implementation.
- Preserve the demo story: buyer funds escrow, seller delivers milestone, buyer releases or disputes.
- Keep docs easy for judges to skim.
- Do not overbuild identity/KYC/on-ramp flows unless the core escrow works first.

## Priority order

1. **Contract compile + tests**
   - Run `cargo test` in `contracts/escrow`.
   - Fix Soroban SDK version mismatches.
   - Keep tests for create, fund, release, dispute, deadline refund.

2. **Token transfer**
   - Replace current status-only funding with token transfer calls.
   - `fund`: transfer buyer → contract.
   - `release`: transfer contract → seller.
   - `refund_after_deadline`: transfer contract → buyer.
   - Store token `Address`, not only `asset_code`, if needed.

3. **Testnet deployment**
   - Add exact deploy commands to `scripts/deploy-testnet.sh`.
   - Save contract ID in `apps/web/.env`.
   - Update README with transaction links.

4. **Frontend real integration**
   - Generate TypeScript bindings.
   - Replace `apps/web/src/stellarClient.ts` mock.
   - Show contract ID and transaction hash in UI.
   - Keep seeded demo scenarios for pitch stability.

5. **Submission polish**
   - Fill `docs/interviews/evidence-log.md` with three actual interviews.
   - Record 1-2 min video using `docs/demo-script.md`.
   - Update `docs/submission/final-checklist.md`.

## Acceptance criteria

- `pnpm build` passes.
- `cargo test` passes.
- Contract deployed to Stellar testnet.
- README has a contract ID and at least one transaction proof.
- Demo video can be recorded without explaining broken parts.

## Avoid

- Adding a database.
- Adding login before contract integration.
- Adding speculative AI features.
- Rewriting product positioning unless you improve hackathon score.
