"use client";
import React from "react";

const HEAT_CLASSES = [
  "bg-neon-green/5",
  "bg-neon-green/10",
  "bg-neon-green/20",
  "bg-teal-accent/30",
  "bg-neon-green/60",
  "bg-neon-green",
];

type Row = { day: string; cells: number[] };

type Props = {
  heatmapRows: Row[];
};

const Heatmap: React.FC<Props> = ({ heatmapRows }) => {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-200 flex flex-col gap-3">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-14 mb-4">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>11 PM</span>
        </div>
        {heatmapRows.map((row) => (
          <div key={row.day} className="flex gap-6 items-center">
            <span className="w-8 text-[10px] font-black text-white/40 uppercase">
              {row.day}
            </span>
            <div className="flex-1 grid grid-cols-24 gap-1.5 h-10">
              {row.cells.map((tier, i) => (
                <div
                  key={i}
                  className={[
                    "rounded-sm",
                    HEAT_CLASSES[tier],
                    tier === 5 ? "shadow-[0_0_15px_rgba(44,251,131,0.5)]" : "",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
