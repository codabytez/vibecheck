"use client";

import { useMemo } from "react";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface WeeklyEntry {
  day: string;
  messages: number;
}

interface WeeklyRhythmProps {
  weeklyData: { data: WeeklyEntry[] } | null | undefined;
}

// ---------------------------------------------------------------------------
export default function WeeklyRhythm({ weeklyData }: WeeklyRhythmProps) {
  const processedWeeklyRhythm = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const rawData = weeklyData?.data || [];
    const maxVal = Math.max(...rawData.map((d) => d.messages), 1);

    return days.map((dayName) => {
      const found = rawData.find((d) => d.day.startsWith(dayName));
      const count = found?.messages || 0;

      let colorClass = "bg-white/5";
      if (count > 0) {
        if (count > maxVal * 0.8)
          colorClass = "bg-neon-green shadow-[0_0_20px_rgba(44,251,131,0.3)]";
        else if (count > maxVal * 0.6) colorClass = "bg-neon-green/80";
        else if (count > maxVal * 0.4) colorClass = "bg-neon-green/40";
        else if (count > maxVal * 0.2) colorClass = "bg-teal-accent/30";
        else colorClass = "bg-neon-green/10";
      }

      return { day: dayName, colorClass, count };
    });
  }, [weeklyData]);

  return (
    <div className="lg:col-span-12 bg-card-bg rounded-2xl p-8 md:p-10 neon-border-dashboard relative group">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black tracking-tighter">
            WEEKLY RHYTHM
          </h2>
          <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
            Group energy levels by day.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-white/40">
            <div className="w-3 h-3 rounded-sm bg-neon-green/5 border border-white/10" />{" "}
            Chill
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-white/40">
            <div className="w-3 h-3 rounded-sm bg-neon-green" /> Chaotic
          </div>
        </div>
      </div>

      {/* Day bars */}
      <div className="grid grid-cols-7 gap-2">
        {processedWeeklyRhythm.map((day) => (
          <div key={day.day} className="space-y-2 group/day">
            <span className="block text-center text-[10px] font-black uppercase text-white/30">
              {day.day}
            </span>
            <div
              className={`h-24 rounded transition-all duration-500 relative ${day.colorClass}`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/day:opacity-100 text-[10px] font-bold text-dark-green">
                {day.count}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
