import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { deliveryCadence } from '../data/site';

const NAVY = '#1e3a8a';

interface CadenceTooltipPayloadRow {
  value?: number | string;
  payload?: Record<string, unknown>;
}

interface CadenceTooltipProps {
  active?: boolean;
  payload?: CadenceTooltipPayloadRow[];
}

function CadenceTooltip({ active, payload }: CadenceTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0];
  const label = String(row.payload?.month ?? '');
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-label">{label}</span>
      <span className="chart-tooltip-value">
        {Number(row.value)} submissions
      </span>
    </div>
  );
}

/** Chart 2 — subtle area chart of the illustrative monthly submission cadence. */
export default function DeliveryCadenceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={deliveryCadence} margin={{ top: 8, right: 16, bottom: 4, left: -14 }}>
        <defs>
          <linearGradient id="cadenceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={NAVY} stopOpacity={0.18} />
            <stop offset="100%" stopColor={NAVY} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#eef0f3" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickLine={false}
          tickMargin={8}
        />
        <YAxis
          domain={[0, 4]}
          ticks={[0, 1, 2, 3, 4]}
          allowDecimals={false}
          tick={{ fill: '#6b7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CadenceTooltip />} />
        <Area
          type="monotone"
          dataKey="submissions"
          stroke={NAVY}
          strokeWidth={2}
          fill="url(#cadenceFill)"
          dot={{ r: 3.5, fill: '#ffffff', stroke: NAVY, strokeWidth: 2 }}
          activeDot={{ r: 5, fill: NAVY, stroke: '#ffffff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
