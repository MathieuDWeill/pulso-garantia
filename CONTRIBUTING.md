# Contributing

This repo is optimized for fast hackathon iteration.

## Workflow

1. Keep the core demo working.
2. Prefer small PRs.
3. Update docs when changing the demo story.
4. Run checks before submitting:

```bash
pnpm build
pnpm check:submission
cd contracts/escrow && cargo test
```

## Product principle

Stellar must be load-bearing. If a feature does not improve the Stellar demo, customer validation, or pitch clarity, defer it.
