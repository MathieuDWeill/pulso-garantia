export type EscrowStatus = 'draft' | 'funded' | 'released' | 'refunded' | 'disputed';

export type Escrow = {
  id: string;
  title: string;
  buyer: string;
  seller: string;
  buyerCountry: 'Brazil' | 'Argentina' | 'Colombia';
  sellerCountry: 'Brazil' | 'Argentina' | 'Colombia';
  amount: number;
  asset: 'USDC' | 'XLM';
  countryPair: string;
  milestone: string;
  deadline: string;
  status: EscrowStatus;
  txHash?: string;
  contractId?: string;
  interviewSignal?: 'weak' | 'medium' | 'strong';
};

export type DiscoveryInterview = {
  persona: string;
  country: string;
  currentWorkflow: string;
  pain: string;
  quote: string;
  signal: 'weak' | 'medium' | 'strong';
};

export type JudgeMetric = {
  name: string;
  score: number;
  proof: string;
};
