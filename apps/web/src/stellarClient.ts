import type { Escrow, EscrowStatus } from './types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const network = import.meta.env.VITE_STELLAR_NETWORK ?? 'testnet';
export const contractId = import.meta.env.VITE_ESCROW_CONTRACT_ID ?? 'mock-contract-not-deployed-yet';

export function explorerUrl(txHash: string) {
  const base = import.meta.env.VITE_STELLAR_EXPLORER_BASE ?? 'https://stellar.expert/explorer/testnet/tx';
  return `${base}/${txHash}`;
}

function mockHash(prefix: EscrowStatus) {
  return `${prefix}-${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 8)}`;
}

export async function createEscrowOnStellar(escrow: Escrow): Promise<Escrow> {
  await sleep(450);
  return {
    ...escrow,
    contractId,
    txHash: mockHash(escrow.status),
  };
}

export async function disputeEscrowOnStellar(escrow: Escrow): Promise<Escrow> {
  await sleep(350);
  return {
    ...escrow,
    status: 'disputed',
    contractId,
    txHash: mockHash('disputed'),
  };
}

/**
 * Codex TODO: replace this mock module with generated TypeScript bindings.
 * Expected API:
 * - createEscrow({ buyer, seller, token, amount, milestone, deadlineLedger })
 * - fundEscrow(id)
 * - releaseEscrow(id)
 * - refundAfterDeadline(id)
 * - getEscrow(id)
 */
