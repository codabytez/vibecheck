"use client";

import { BarChart2 } from "lucide-react";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface MsgLengthEntry {
  name: string;
  avg_length: number;
}

interface AvgMessageLengthProps {
  msgLengthData: { data: MsgLengthEntry[] } | null | undefined;
}

// ---------------------------------------------------------------------------
export default function AvgMessageLength({
  msgLengthData,
}: AvgMessageLengthProps) {
  if (!msgLengthData?.data)
    return (
      <div className="lg:col-span-6">
        <CardSkeleton />
      </div>
    );

  const maxVal = Math.max(...msgLengthData.data.map((d) => d.avg_length), 1);

  return (
    <div className="lg:col-span-6">
      <div className="bg-card-bg rounded-2xl p-8 neon-border-dashboard relative group">
        <h3 className="text-xl font-black tracking-tighter uppercase mb-8 flex items-center gap-2">
          <BarChart2 className="text-neon-green" />
          Average Message Length
        </h3>
        <div className="flex items-end justify-between h-32 gap-4">
          {msgLengthData.data.slice(0, 5).map((bar, idx) => {
            const heightPct = Math.max((bar.avg_length / maxVal) * 100, 10);
            const color =
              idx % 2 === 0 ? "bg-neon-green/40" : "bg-teal-accent/30";
            const labelColor =
              idx % 2 === 0 ? "text-neon-green" : "text-teal-accent";

            return (
              <div
                key={bar.name}
                className="flex flex-col justify-end gap-2 flex-1 group/bar h-full"
              >
                <div
                  className={`w-full ${color} hover:brightness-125 transition-all rounded-t relative`}
                  style={{ height: `${heightPct}%` }}
                >
                  <div
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold ${labelColor} opacity-50 group-hover/bar:opacity-100 transition-opacity uppercase`}
                  >
                    {Math.round(bar.avg_length)} word
                    {bar.avg_length !== 1 ? "s" : ""}
                  </div>
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase truncate max-w-12.5">
                  {bar.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
