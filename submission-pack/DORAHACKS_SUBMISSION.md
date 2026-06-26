# DoraHacks Submission Draft

## Project name
Pulso Garantia

## Short description
A Stellar/Soroban escrow platform for cross-border service payments in Latin America.

## Long description
Pulso Garantia helps freelancers, agencies, and small exporters get paid safely for cross-border work. The buyer funds an escrow, the seller delivers a milestone, and Soroban enforces release, refund, or dispute state transitions. Stellar is the core payment and settlement layer, making the transaction transparent, programmable, and testnet-verifiable.

## Problem
Cross-border service payments in LATAM often rely on trust, manual bank transfers, expensive platforms, or informal agreements. This creates friction for new buyers and risk for sellers.

## Solution
Pulso Garantia introduces a lightweight escrow flow:
1. Buyer and seller agree on milestone terms.
2. Buyer funds escrow.
3. Seller delivers.
4. Buyer releases funds.
5. If something goes wrong, the escrow enters a dispute/refund path.

## Stellar integration
The escrow state machine is implemented as a Soroban smart contract. The contract stores escrow records, validates participant authorization, emits events, and controls release/refund/dispute transitions.

## Current status
MVP prototype with frontend demo, Soroban contract, tests, submission docs, interview plan, and deployment script.

## Future roadmap
- Real token transfers using Stellar assets
- Arbitration partner workflow
- Fiat on/off-ramp integrations
- Reputation score for sellers
- Milestone-based escrow for agencies
- Mainnet pilot with service exporters

## Links
- GitHub:
- Live demo:
- Demo video:
- Pitch deck:
- Testnet contract:
- Interview evidence:
