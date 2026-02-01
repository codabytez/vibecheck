"use client";

import { useMemo } from "react";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface SentimentData {
  data?: unknown;
  average_sentiment?: number;
}

interface VibeCheckProps {
  sentimentData: SentimentData | null | undefined;
}

// ---------------------------------------------------------------------------
export default function VibeCheck({ sentimentData }: VibeCheckProps) {
  const vibeStats = useMemo(() => {
    let hype = 50,
      salty = 10,
      chill = 50;

    if (sentimentData?.data) {
      const avg = sentimentData.average_sentiment || 0;

      if (avg > 0.2) {
        hype = Math.min(50 + avg * 50, 100);
        chill = 60;
        salty = 10;
      } else if (avg < -0.2) {
        salty = Math.min(50 + Math.abs(avg) * 50, 100);
        hype = 20;
        chill = 30;
      } else {
        chill = 90;
        hype = 40;
        salty = 5;
      }
    }

    return {
      hype: Math.round(hype),
      salty: Math.round(salty),
      chill: Math.round(chill),
    };
  }, [sentimentData]);

  return (
    <div className="lg:col-span-12 bg-black rounded-3xl p-10 neon-border-dashboard relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-linear-to-br from-neon-green/5 to-teal-accent/5 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl text-center space-y-12">
        {/* Title */}
        <div>
          <h2 className="text-5xl font-black tracking-tighter uppercase mb-2">
            VIBE CHECK
          </h2>
          <p className="text-white/50 text-xs font-black uppercase tracking-[0.3em]">
            The overall mood profile of your group
          </p>
        </div>

        {/* Radar visual */}
        <div className="relative h-100 w-full flex items-center justify-center">
          {/* Background hexagon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-75 h-75 flex items-center justify-center border border-white/10 bg-white/5 clip-polygon" />
          </div>

          {/* SVG polygon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-75 h-75 drop-shadow-[0_0_25px_rgba(44,251,131,0.6)]"
              viewBox="0 0 100 100"
            >
              <polygon
                fill="rgba(44,251,131,0.4)"
                stroke="#2cfb83"
                strokeWidth="1"
                points="50,10 95,45 80,90 20,85 5,40"
              />
            </svg>
          </div>

          {/* Axis labels */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-black uppercase text-neon-green tracking-widest">
            Hype
          </div>
          <div className="absolute top-[40%] -right-2 text-sm font-black uppercase text-teal-accent tracking-widest">
            Chill
          </div>
          <div className="absolute bottom-8 right-8 text-sm font-black uppercase text-white/60 tracking-widest">
            Chaotic
          </div>
          <div className="absolute bottom-8 left-8 text-sm font-black uppercase text-red-500 tracking-widest">
            Salty
          </div>
          <div className="absolute top-[40%] -left-2 text-sm font-black uppercase text-yellow-400 tracking-widest">
            Wholesome
          </div>
        </div>

        {/* Dynamic stats row */}
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-1">
            <div className="text-4xl font-black">{vibeStats.hype}%</div>
            <div className="text-[10px] font-black uppercase text-neon-green tracking-widest">
              Hype Factor
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black">{vibeStats.salty}%</div>
            <div className="text-[10px] font-black uppercase text-red-500 tracking-widest">
              Salty Levels
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black">{vibeStats.chill}%</div>
            <div className="text-[10px] font-black uppercase text-teal-accent tracking-widest">
              Chill Index
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
