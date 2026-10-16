import { useId } from "react";

export type Series = { label: string; values: number[]; color: string; dashed?: boolean };

type Props = {
  series: Series[];
  summary: string; // read aloud by screen readers
  format?: (n: number) => string;
  referenceLine?: { value: number; label: string };
};

const W = 640;
const H = 240;
const PAD = { l: 52, r: 96, t: 14, b: 30 };
const GRID = "#223f9e";
const TEXT = "#a9b8e6";

function niceTicks(min: number, max: number, count = 4) {
  const span = max - min || 1;
  const raw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  const start = Math.floor(min / step) * step;
  const ticks: number[] = [];
  // Always end on a tick at or above the data maximum so nothing is clipped.
  for (let v = start; ; v += step) {
    ticks.push(Number(v.toFixed(6)));
    if (v >= max - step * 0.001) break;
  }
  return ticks;
}

// Drawn for dark royal-blue panels.
export default function LineChart({ series, summary, format = (n) => String(n), referenceLine }: Props) {
  const id = useId();
  const all = series.flatMap((s) => s.values).concat(referenceLine ? [referenceLine.value] : []);
  const ticks = niceTicks(Math.min(...all), Math.max(...all));
  const yMin = ticks[0];
  const yMax = ticks[ticks.length - 1];
  const n = Math.max(...series.map((s) => s.values.length));
  const x = (i: number) => PAD.l + (i / Math.max(1, n - 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + (1 - (v - yMin) / (yMax - yMin || 1)) * (H - PAD.t - PAD.b);
  const xTicks = [0, Math.round((n - 1) / 3), Math.round(((n - 1) * 2) / 3), n - 1];
  const font = "Inter, sans-serif";

  return (
    // On phones the chart keeps a readable width and scrolls inside its card.
    <div className="-mx-2 overflow-x-auto px-2" tabIndex={0} role="group" aria-label="Chart, scrollable">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-t`} className="h-auto w-full min-w-[540px]">
        <title id={`${id}-t`}>{summary}</title>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={1} />
            <text x={PAD.l - 8} y={y(t) + 4} textAnchor="end" fontSize={11} fill={TEXT} fontFamily={font}>
              {format(t)}
            </text>
          </g>
        ))}
        {xTicks.map((i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize={11} fill={TEXT} fontFamily={font}>
            {i + 1}
          </text>
        ))}
        {referenceLine && (
          <g>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(referenceLine.value)}
              y2={y(referenceLine.value)}
              stroke={TEXT}
              strokeDasharray="4 4"
              strokeWidth={1}
            />
            <text x={W - PAD.r + 6} y={y(referenceLine.value) + 4} fontSize={11} fill={TEXT} fontFamily={font}>
              {referenceLine.label}
            </text>
          </g>
        )}
        {series.map((s) => {
          const d = s.values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
          const last = s.values.length - 1;
          return (
            <g key={s.label}>
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={2.25}
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray={s.dashed ? "5 4" : undefined}
              />
              <circle cx={x(last)} cy={y(s.values[last])} r={4} fill={s.color} />
              <text x={x(last) + 10} y={y(s.values[last]) + 4} fontSize={12} fontWeight={600} fill={s.color} fontFamily={font}>
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
