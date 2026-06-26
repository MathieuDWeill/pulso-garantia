#!/usr/bin/env bash
set -euo pipefail

# Codex/finalizer script.
# Requires Stellar CLI configured with a testnet identity.
# Example setup:
# stellar keys generate pulso-buyer --network testnet
# stellar keys fund pulso-buyer --network testnet

CONTRACT_DIR="contracts/escrow"
WASM_PATH="target/wasm32-unknown-unknown/release/pulso_escrow.wasm"
NETWORK="testnet"
SOURCE_ACCOUNT="${STELLAR_SOURCE_ACCOUNT:-pulso-buyer}"

printf "Building Soroban contract...\n"
(
  cd "$CONTRACT_DIR"
  cargo build --target wasm32-unknown-unknown --release
)

printf "Optimizing contract...\n"
stellar contract optimize --wasm "$CONTRACT_DIR/$WASM_PATH"

OPT_WASM="$CONTRACT_DIR/target/wasm32-unknown-unknown/release/pulso_escrow.optimized.wasm"

printf "Deploying to %s using %s...\n" "$NETWORK" "$SOURCE_ACCOUNT"
CONTRACT_ID=$(stellar contract deploy \
  --wasm "$OPT_WASM" \
  --source "$SOURCE_ACCOUNT" \
  --network "$NETWORK")

printf "Contract ID: %s\n" "$CONTRACT_ID"
printf "VITE_ESCROW_CONTRACT_ID=%s\n" "$CONTRACT_ID" >> apps/web/.env
