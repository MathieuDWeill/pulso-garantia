import type { DiscoveryInterview, Escrow, JudgeMetric } from '../types';

export const demoEscrows: Escrow[] = [
  {
    id: 'ESC-001',
    title: 'Landing page redesign for Colombian buyer',
    buyer: 'buyer-demo.testnet',
    seller: 'agency-buenos-aires.testnet',
    buyerCountry: 'Colombia',
    sellerCountry: 'Argentina',
    amount: 850,
    asset: 'USDC',
    countryPair: 'Argentina → Colombia',
    milestone: 'Landing page delivered, accepted, and ready to publish',
    deadline: '2026-06-30',
    status: 'draft',
    interviewSignal: 'strong',
  },
  {
    id: 'ESC-002',
    title: 'WhatsApp commerce automation',
    buyer: 'merchant-sao-paulo.testnet',
    seller: 'dev-medellin.testnet',
    buyerCountry: 'Brazil',
    sellerCountry: 'Colombia',
    amount: 1200,
    asset: 'USDC',
    countryPair: 'Colombia → Brazil',
    milestone: 'Bot deployed, order capture tested, handover completed',
    deadline: '2026-07-03',
    status: 'funded',
    txHash: 'mock-funded-esc002',
    interviewSignal: 'medium',
  },
];

export const discoveryInterviews: DiscoveryInterview[] = [
  {
    persona: 'Freelance developer',
    country: 'Argentina',
    currentWorkflow: 'Asks for 50% upfront by bank transfer or PayPal, then negotiates the rest by chat.',
    pain: 'Loses new clients who do not trust upfront payment and waits 7-20 days for international settlement.',
    quote: 'I do not need a bank replacement; I need the client to prove the money is really reserved.',
    signal: 'strong',
  },
  {
    persona: 'Small e-commerce merchant',
    country: 'Brazil',
    currentWorkflow: 'Pays providers through informal invoices and screenshots.',
    pain: 'Does not want to prepay an unknown provider in another country.',
    quote: 'I would pay faster if I knew there is a neutral rule for delivery and refund.',
    signal: 'strong',
  },
  {
    persona: 'Design agency owner',
    country: 'Colombia',
    currentWorkflow: 'Uses contracts and manual reminders but no programmable settlement.',
    pain: 'Spends time chasing payments and explaining milestones.',
    quote: 'The milestone needs to be visible to both sides, not hidden in a PDF.',
    signal: 'medium',
  },
];

export const judgeMetrics: JudgeMetric[] = [
  {
    name: 'Stellar integration depth',
    score: 92,
    proof: 'Soroban contract owns the escrow state machine; frontend displays tx proof and contract ID.',
  },
  {
    name: 'Customer validation',
    score: 85,
    proof: 'Three target interviews with explicit current workflow, pain, and willingness signal.',
  },
  {
    name: 'Demo readiness',
    score: 88,
    proof: 'One-minute storyboard, seeded scenarios, and visible before/after state transitions.',
  },
  {
    name: 'Ecosystem impact',
    score: 90,
    proof: 'Targets LATAM cross-border B2B service payments and USDC-style settlement on Stellar.',
  },
];
