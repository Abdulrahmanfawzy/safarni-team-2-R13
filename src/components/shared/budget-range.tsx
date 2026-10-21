"use client";

import { useId } from "react";

interface BudgetRangeProps {
  min: number;
  max: number;
  low: number;
  high: number;
  step?: number;
  onChange: (range: { min: number; max: number }) => void;
}

 
const SHAPE = [
  4, 5, 7, 10, 14, 18, 16, 13, 17, 24, 32, 38, 34, 28, 22, 18, 15, 13, 12, 10,
  9, 8, 7, 6, 5, 4, 3, 3, 2, 2,
];

function buildPath(values: number[]) {
  const peak = Math.max(...values);
  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * 100,
    y: 40 - (v / peak) * 38,
  }));

  let d = `M${pts[0].x},40 L${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const midX = (pts[i].x + pts[i + 1].x) / 2;
    const midY = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q${pts[i].x},${pts[i].y} ${midX},${midY}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last.x},${last.y} L${last.x},40 Z`;
  return d;
}

const PATH = buildPath(SHAPE);

export default function BudgetRange({
  min,
  max,
  low,
  high,
  step = 50,
  onChange,
}: BudgetRangeProps) {
  const clipId = `clip-${useId().replace(/:/g, "")}`;

  const span = max - min;
  const lowPct = ((low - min) / span) * 100;
  const highPct = ((high - min) / span) * 100;

   
  const lowOnTop = low > max - span * 0.1;

  return (
    <div>
      <div className="px-[7px]">
        <div className="relative h-[130px]">
          {/* area chart */}
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="absolute left-0 top-0 h-[112px] w-full"
            aria-hidden="true"
          >
            <defs>
              <clipPath id={clipId}>
                <rect x={lowPct} y="0" width={Math.max(highPct - lowPct, 0)} height="40" />
              </clipPath>
            </defs>
            <path d={PATH} fill="#C3DDFD" />
            <path d={PATH} fill="#A4CAFE" clipPath={`url(#${clipId})`} />
          </svg>

          {/* base line + selected segment */}
          <div className="absolute bottom-[9px] left-0 h-[2px] w-full bg-blue-200" />
          <div
            className="absolute bottom-[9px] h-[2px] bg-blue-500"
            style={{ left: `${lowPct}%`, width: `${Math.max(highPct - lowPct, 0)}%` }}
          />

          {/* handles */}
          <input
            type="range"
            aria-label="Minimum price"
            min={min}
            max={max}
            step={step}
            value={low}
            onChange={(e) =>
              onChange({ min: Math.min(Number(e.target.value), high), max: high })
            }
            className="range-thumb"
            style={{ zIndex: lowOnTop ? 5 : 3 }}
          />
          <input
            type="range"
            aria-label="Maximum price"
            min={min}
            max={max}
            step={step}
            value={high}
            onChange={(e) =>
              onChange({ min: low, max: Math.max(Number(e.target.value), low) })
            }
            className="range-thumb"
            style={{ zIndex: 4 }}
          />
        </div>
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-600">
        <span className="flex flex-col gap-1">
          Min <b className="text-sm text-gray-900">${low}</b>
        </span>
        <span className="flex flex-col items-end gap-1">
          Max <b className="text-sm text-gray-900">${high}</b>
        </span>
      </div>
    </div>
  );
}