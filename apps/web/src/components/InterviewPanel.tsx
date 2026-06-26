import { MessageSquareQuote } from 'lucide-react';
import type { DiscoveryInterview } from '../types';

export function InterviewPanel({ interviews }: { interviews: DiscoveryInterview[] }) {
  return (
    <section className="card discovery">
      <div className="section-heading">
        <p className="eyebrow">Customer discovery</p>
        <h2>3 interviews, 3 workflows, one repeated trust gap.</h2>
      </div>
      <div className="interview-grid">
        {interviews.map((item) => (
          <article className="interview" key={`${item.persona}-${item.country}`}>
            <div className="quote-icon"><MessageSquareQuote size={18} /></div>
            <h3>{item.persona}</h3>
            <p className="muted">{item.country} · signal: {item.signal}</p>
            <p><strong>Today:</strong> {item.currentWorkflow}</p>
            <p><strong>Pain:</strong> {item.pain}</p>
            <blockquote>“{item.quote}”</blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}
