import type { JudgeMetric } from '../types';

export function MetricCard({ metric }: { metric: JudgeMetric }) {
  return (
    <article className="metric-card">
      <div className="metric-topline">
        <span>{metric.name}</span>
        <strong>{metric.score}/100</strong>
      </div>
      <div className="meter" aria-label={`${metric.name} score ${metric.score}`}>
        <span style={{ width: `${metric.score}%` }} />
      </div>
      <p>{metric.proof}</p>
    </article>
  );
}
