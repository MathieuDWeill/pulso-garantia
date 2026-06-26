import { AlertTriangle, CheckCircle2, Clock, FileText, ShieldCheck, WalletCards } from 'lucide-react';
import { useMemo, useState } from 'react';
import { InterviewPanel } from './components/InterviewPanel';
import { MetricCard } from './components/MetricCard';
import { demoEscrows, discoveryInterviews, judgeMetrics } from './data/demoData';
import { createEscrowOnStellar, disputeEscrowOnStellar, explorerUrl, network } from './stellarClient';
import type { Escrow, EscrowStatus } from './types';
import './styles.css';

const steps: { status: EscrowStatus; label: string }[] = [
  { status: 'draft', label: 'Created' },
  { status: 'funded', label: 'Funded' },
  { status: 'released', label: 'Released' },
];

function statusIndex(status: EscrowStatus) {
  if (status === 'draft') return 0;
  if (status === 'funded' || status === 'disputed') return 1;
  return 2;
}

function statusLabel(status: EscrowStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function App() {
  const [escrow, setEscrow] = useState<Escrow>(demoEscrows[0]);
  const [busy, setBusy] = useState(false);

  const proof = useMemo(() => escrow.txHash ? explorerUrl(escrow.txHash) : undefined, [escrow.txHash]);

  async function transition(nextStatus: EscrowStatus) {
    setBusy(true);
    const updated = await createEscrowOnStellar({ ...escrow, status: nextStatus });
    setEscrow(updated);
    setBusy(false);
  }

  async function disputeEscrow() {
    setBusy(true);
    const updated = await disputeEscrowOnStellar(escrow);
    setEscrow(updated);
    setBusy(false);
  }

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Stellar PULSO Hackathon · {network}</p>
          <h1>Escrow cross-border pour services LATAM.</h1>
          <p className="lede">
            Pulso Garantia aide freelances, agences et clients à travailler entre pays LATAM sans choisir entre paiement risqué,
            confiance aveugle ou délais bancaires. Stellar devient la preuve programmable que l’argent est réservé.
          </p>
          <div className="actions">
            <button onClick={() => transition('funded')} disabled={busy || escrow.status !== 'draft'}>
              <WalletCards size={18} /> Fund escrow
            </button>
            <button onClick={() => transition('released')} disabled={busy || escrow.status !== 'funded'} className="secondary">
              <ShieldCheck size={18} /> Release funds
            </button>
            <button onClick={disputeEscrow} disabled={busy || escrow.status !== 'funded'} className="ghost">
              <AlertTriangle size={18} /> Dispute
            </button>
          </div>
        </div>
        <div className="card scorecard">
          <p>Hackathon score focus</p>
          <strong>Integration depth + validation</strong>
          <span>Contract state, testnet tx proof, 3 interviews, pitch-ready story.</span>
        </div>
      </section>

      <section className="selector card">
        <p className="eyebrow">Choose demo scenario</p>
        <div className="scenario-row">
          {demoEscrows.map((item) => (
            <button
              key={item.id}
              className={item.id === escrow.id ? 'scenario active' : 'scenario'}
              onClick={() => setEscrow(item)}
            >
              <strong>{item.title}</strong>
              <span>{item.amount} {item.asset} · {item.countryPair}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid">
        <article className="card escrow-card">
          <div className="card-header">
            <FileText />
            <div>
              <p className="muted">Escrow #{escrow.id} · <span className={`pill ${escrow.status}`}>{statusLabel(escrow.status)}</span></p>
              <h2>{escrow.title}</h2>
            </div>
          </div>
          <dl>
            <div><dt>Amount</dt><dd>{escrow.amount} {escrow.asset}</dd></div>
            <div><dt>Route</dt><dd>{escrow.countryPair}</dd></div>
            <div><dt>Buyer</dt><dd>{escrow.buyer}</dd></div>
            <div><dt>Seller</dt><dd>{escrow.seller}</dd></div>
            <div><dt>Milestone</dt><dd>{escrow.milestone}</dd></div>
            <div><dt>Deadline</dt><dd>{escrow.deadline}</dd></div>
          </dl>
          {proof && <a className="proof" href={proof} target="_blank" rel="noreferrer">Transaction proof: {escrow.txHash}</a>}
        </article>

        <article className="card">
          <h2>Contract state machine</h2>
          <div className="timeline">
            {steps.map((step, index) => {
              const done = index <= statusIndex(escrow.status);
              return (
                <div className={`step ${done ? 'done' : ''}`} key={step.status}>
                  {done ? <CheckCircle2 /> : <Clock />}
                  <span>{step.label}</span>
                </div>
              );
            })}
            {escrow.status === 'disputed' && <div className="step warning"><AlertTriangle /><span>Disputed</span></div>}
          </div>
          <p className="muted">
            Codex next step: replace the mock client with generated Soroban bindings and show the live contract ID here.
          </p>
        </article>
      </section>

      <section className="metrics-grid">
        {judgeMetrics.map((metric) => <MetricCard metric={metric} key={metric.name} />)}
      </section>

      <InterviewPanel interviews={discoveryInterviews} />

      <section className="card close">
        <p className="eyebrow">Pitch close</p>
        <h2>We are not building another wallet. We are building a trust primitive for LATAM service commerce on Stellar.</h2>
      </section>
    </main>
  );
}
