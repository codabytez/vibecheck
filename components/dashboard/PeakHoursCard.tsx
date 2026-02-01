"use client";

import { useMemo } from "react";
import { Camera as PhotoCamera } from "lucide-react";
import Heatmap from "@/components/dashboard/Heatmap";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface PeakHourEntry {
  hour: number;
  messages: number;
}

interface PeakHoursCardProps {
  peakHoursData: { data: PeakHourEntry[] } | null | undefined;
}

// ---------------------------------------------------------------------------
export default function PeakHoursCard({ peakHoursData }: PeakHoursCardProps) {
  const heatmapRows = useMemo(() => {
    if (!peakHoursData?.data || peakHoursData.data.length === 0) {
      return [{ day: " ", cells: Array(24).fill(0) }];
    }

    const maxMessages = Math.max(
      ...peakHoursData.data.map((h) => h.messages),
      1
    );

    const getTier = (messages: number) => {
      if (messages === 0) return 0;
      const ratio = messages / maxMessages;
      if (ratio >= 0.8) return 5;
      if (ratio >= 0.6) return 4;
      if (ratio >= 0.4) return 3;
      if (ratio >= 0.2) return 2;
      return 1;
    };

    const hourlyTiers = Array(24)
      .fill(0)
      .map((_, hour) => {
        const hourData = peakHoursData.data.find((h) => h.hour === hour);
        return hourData ? getTier(hourData.messages) : 0;
      });

    return [{ day: "AVG", cells: hourlyTiers }];
  }, [peakHoursData]);

  if (!peakHoursData?.data)
    return (
      <div className="lg:col-span-12">
        <CardSkeleton rows={6} />
      </div>
    );

  return (
    <div className="lg:col-span-12">
      <div className="bg-card-bg rounded-2xl p-8 md:p-10 neon-border-dashboard relative group">
        <button className="absolute top-8 right-8 flex items-center gap-2 bg-white/5 hover:bg-neon-green hover:text-dark-green px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
          <PhotoCamera className="text-sm" />
          Snap Heatmap
        </button>
        <h2 className="text-3xl font-black tracking-tighter mb-2">
          PEAK HOURS
        </h2>
        <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
          When the chat is actually lit. 🔥
        </p>
        <Heatmap heatmapRows={heatmapRows} />
      </div>
    </div>
  );
}
