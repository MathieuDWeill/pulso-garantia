# Architecture

## Components

```text
Buyer/Seller browser
  ↓
React demo app
  ↓
Generated Soroban TypeScript client
  ↓
Stellar testnet RPC
  ↓
Pulso Escrow contract
  ↓
Stellar token contract / asset settlement
```

## Current implementation

The frontend currently uses a mock `stellarClient.ts` to preserve a stable pitch demo before testnet credentials are added. The contract already models escrow state and authorization.

## Target implementation

1. Contract stores buyer, seller, arbiter, token, amount, milestone, deadline, status.
2. Buyer signs `create` and `fund`.
3. Funding transfers token balance from buyer to contract.
4. Release transfers token balance from contract to seller.
5. Refund transfers token balance from contract to buyer.
6. Events expose created/funded/released/disputed/refunded transitions.

## Why Stellar is essential

Without Stellar, this is just a project management workflow. With Stellar/Soroban, the money reservation and release rules become inspectable and enforceable on testnet.

## Security assumptions for MVP

- Buyer and seller wallet addresses are known.
- Arbiter address is configured at escrow creation.
- Contract does not solve real-world legal enforcement.
- Token transfer must be tested with testnet assets only.

## Risks

| Risk | Mitigation |
| --- | --- |
| Contract compile mismatch | Codex should align SDK and CLI versions first. |
| Token transfer complexity | Keep state-only demo if needed, but clearly mark transfer TODO. |
| Demo network failure | Keep seeded mock flow as fallback; show screenshots/testnet links. |
| Weak customer evidence | Conduct 3 interviews and add links before submission. |
