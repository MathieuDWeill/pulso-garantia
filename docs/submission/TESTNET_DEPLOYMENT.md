# Stellar Testnet Deployment Proof

## Contract ID

CBFVX5YPCJA4L5BPLWNXOQUU4YB25ZZY3IHQQSD73MMNSX7ZUC2DXEII

## Stellar Lab contract explorer

https://lab.stellar.org/r/testnet/contract/CBFVX5YPCJA4L5BPLWNXOQUU4YB25ZZY3IHQQSD73MMNSX7ZUC2DXEII

## Deploy transaction

https://stellar.expert/explorer/testnet/tx/3ea2956cd9670b2f286f53c58d18901ea5d124fe2778b194facad0a7435952a1

## WASM upload transaction

https://stellar.expert/explorer/testnet/tx/62e1922874f39d9bd136fab6ecab2d00a189e4fe8d499ede2c0c1d671a9fdf21

## Network

Stellar Testnet

## Status

Deployed successfully.

## Contract functions visible in Stellar Lab

- create
- fund
- release
- open_dispute
- resolve_dispute
- refund_after_deadline
- get

## Local validation

```bash
cd contracts/escrow
cargo test
cargo build --target wasm32-unknown-unknown --release
```

Result:

- 3 tests passed
- WASM generated: `contracts/escrow/target/wasm32-unknown-unknown/release/pulso_escrow.wasm`
- Contract deployed to Stellar testnet
