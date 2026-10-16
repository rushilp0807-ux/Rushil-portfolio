import { useMemo } from "react";

// Decorative only: seeded random walks that echo the Monte Carlo work. No data claims.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 600;
const H = 360;
const STEPS = 60;

export default function HeroPaths() {
  const paths = useMemo(() => {
    const rand = mulberry32(2029);
    return Array.from({ length: 36 }, () => {
      let v = 0;
      const pts: [number, number][] = [];
      for (let i = 0; i <= STEPS; i++) {
        if (i > 0) v += (rand() - 0.46) * 18;
        pts.push([(i / STEPS) * W, H / 2 - v]);
      }
      return pts;
    });
  }, []);

  const toD = (pts: [number, number][]) =>
    pts.map(([px, py], i) => `${i === 0 ? "M" : "L"}${px.toFixed(1)},${Math.max(8, Math.min(H - 8, py)).toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden className="h-full w-full">
      {paths.map((p, i) => (
        <path
          key={i}
          d={toD(p)}
          pathLength={1}
          fill="none"
          stroke={i % 9 === 0 ? "#ff5b1f" : "#2b50ff"}
          strokeOpacity={i % 9 === 0 ? 0.95 : 0.28}
          strokeWidth={i % 9 === 0 ? 2.2 : 1.2}
          className="draw-path"
          style={{ animationDelay: `${(i % 12) * 0.07}s` }}
        />
      ))}
    </svg>
  );
}
