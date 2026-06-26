# Pulso Garantia — Jury One-Pager

## One-liner
Pulso Garantia is a Stellar/Soroban escrow layer for cross-border service payments in Latin America.

## Problem
Freelancers, agencies, and small exporters in LATAM often work cross-border without a trusted payment workflow. Buyers fear paying upfront. Sellers fear delivering first and not getting paid.

## Solution
A buyer creates and funds an escrow. The seller delivers a milestone. The buyer releases funds, or the escrow enters a transparent refund/dispute path.

## Why Stellar
Stellar is not decorative here. It is the settlement layer. Soroban controls the escrow state machine, authorization, release/refund logic, and public proof of payment state.

## Target users
- Freelancers selling services abroad
- Small agencies working with foreign clients
- Digital service exporters
- Cross-border buyers who need delivery assurance

## Demo
1. Create escrow
2. Fund escrow on testnet
3. Show contract-backed state
4. Release payment
5. Show transaction proof / explorer link

## Hackathon fit
- Stellar integration depth: escrow logic in Soroban
- Technical complexity: contract state machine, events, authorization, dispute path
- Ecosystem impact: cross-border trust + USD-denominated service payments
- Customer discovery: 3 interviews required and logged
- Deployment: testnet contract ID and app demo

## What we will submit
- Public repo
- Live demo link
- Testnet contract ID
- Demo video
- Pitch deck
- Interview evidence folder

## Live Stellar Testnet Deployment

Pulso Garantia includes a live Soroban smart contract deployed on Stellar testnet.

- Contract ID: `CBFVX5YPCJA4L5BPLWNXOQUU4YB25ZZY3IHQQSD73MMNSX7ZUC2DXEII`
- Stellar Lab: https://lab.stellar.org/r/testnet/contract/CBFVX5YPCJA4L5BPLWNXOQUU4YB25ZZY3IHQQSD73MMNSX7ZUC2DXEII
- Deploy transaction: https://stellar.expert/explorer/testnet/tx/3ea2956cd9670b2f286f53c58d18901ea5d124fe2778b194facad0a7435952a1
- WASM upload transaction: https://stellar.expert/explorer/testnet/tx/62e1922874f39d9bd136fab6ecab2d00a189e4fe8d499ede2c0c1d671a9fdf21

The contract interface is visible in Stellar Lab and exposes the escrow state machine functions: `create`, `fund`, `release`, `open_dispute`, `resolve_dispute`, `refund_after_deadline`, and `get`.

