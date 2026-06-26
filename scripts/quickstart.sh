#!/usr/bin/env bash
set -euo pipefail

corepack enable
corepack prepare pnpm@9.12.0 --activate
pnpm install
cp -n apps/web/.env.example apps/web/.env || true
pnpm build
echo
echo "OK. Run: pnpm dev"
