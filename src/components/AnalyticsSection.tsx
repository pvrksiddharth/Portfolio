import { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { bidLifecycle } from '../data/site';
import DeliveryCadenceChart from './DeliveryCadenceChart';
import ComplianceDrawer from './ComplianceDrawer';

/** Lighter navy tints for the funnel bars, darkest = final stage. */
const stageShades = ['#1e3a8a', '#2546a0', '#2d52b3', '#3a60c0', '#4a70cc'];

interface ChartTooltipPayloadRow {
  value?: number | string;
  payload?: Record<string, unknown>;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadRow[];
  labelKey: string;
  unit: string;
}

function ChartTooltip({ active, payload, labelKey, unit }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0];
  const label = String(row.payload?.[labelKey] ?? '');
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-label">{label}</span>
      <span className="chart-tooltip-value">
        {Number(row.value)} {unit}
      </span>
    </div>
  );
}

export default function AnalyticsSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <section className="section" id="analytics" aria-labelledby="analytics-heading">
      <div className="container">
        <p className="section-label reveal">Process, Visualised</p>
        <h2 className="section-title reveal" id="analytics-heading">
          Operational Analytics &amp; Process
        </h2>
        <p className="section-intro reveal">
          Bid management is a funnel and a rhythm. The two charts below are
          illustrative views of how work moves through the lifecycle — from raw
          RFP requirements down to a submission-ready response — and what a
          steady submission cadence looks like over six months.
        </p>

        <div className="analytics-grid">
          {/* Chart 1 — Bid lifecycle funnel (horizontal bars) */}
          <figure className="chart-card reveal">
            <figcaption className="chart-head">
              <h3 className="chart-title">Bid Lifecycle Funnel</h3>
              <p className="chart-sub">
                Representative requirement workload per stage · one typical bid cycle
              </p>
            </figcaption>
            <div className="chart-body chart-body-bar">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bidLifecycle}
                  layout="vertical"
                  margin={{ top: 4, right: 28, bottom: 4, left: 8 }}
                  barCategoryGap="28%"
                >
                  <XAxis
                    type="number"
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="stage"
                    width={118}
                    tick={{ fill: '#4b5563', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(30, 58, 138, 0.05)' }}
                    content={<ChartTooltip labelKey="stage" unit="requirements tracked" />}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={22} isAnimationActive>
                    {bidLifecycle.map((_, i) => (
                      <Cell key={i} fill={stageShades[i % stageShades.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </figure>

          {/* Chart 2 — Delivery consistency (area) */}
          <figure className="chart-card reveal">
            <figcaption className="chart-head">
              <h3 className="chart-title">Delivery Consistency</h3>
              <p className="chart-sub">
                Major bid submissions per month · illustrative 6-month cadence (avg 2+)
              </p>
            </figcaption>
            <div className="chart-body">
              <DeliveryCadenceChart />
            </div>
          </figure>
        </div>

        <div className="analytics-actions reveal">
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => setDrawerOpen(true)}
            aria-haspopup="dialog"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M3 15h18M9 3v18" />
            </svg>
            View Sample Compliance Matrix
          </button>
          <span className="analytics-actions-note">
            Opens a side panel with a formatted clause / requirement / status excerpt.
          </span>
        </div>
      </div>

      <ComplianceDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </section>
  );
}
