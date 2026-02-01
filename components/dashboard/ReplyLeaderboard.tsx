"use client";

import { Zap } from "lucide-react";
import { formatResponseTime } from "@/components/dashboard/utils";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface ResponseTimeEntry {
  name: string;
  response_time: number;
}

interface ReplyLeaderboardProps {
  responseTimeData: { data: ResponseTimeEntry[] } | null | undefined;
}

// ---------------------------------------------------------------------------
export default function ReplyLeaderboard({
  responseTimeData,
}: ReplyLeaderboardProps) {
  if (!responseTimeData?.data)
    return (
      <div className="lg:col-span-4">
        <CardSkeleton />
      </div>
    );

  return (
    <div className="lg:col-span-4">
      <div className="bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col relative group">
        <h3 className="text-xl font-black tracking-tighter uppercase mb-6 flex items-center gap-2">
          <Zap className="text-neon-green" />
          Reply Leaderboard
        </h3>
        <div className="space-y-4 flex-1">
          {responseTimeData.data.slice(0, 4).map((entry, idx) => {
            const isTop = idx === 0;
            const isLast = idx === 3;

            return (
              <div
                key={entry.name}
                className={[
                  "flex items-center justify-between p-3 rounded-lg",
                  isTop
                    ? "bg-neon-green/5 border border-neon-green/10"
                    : "bg-white/5",
                  isLast ? "opacity-60" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-black ${isTop ? "text-neon-green" : "text-white/40"}`}
                  >
                    #{idx + 1}
                  </span>
                  <span className="font-bold">{entry.name}</span>
                </div>
                {isTop ? (
                  <span className="text-[10px] font-black uppercase bg-neon-green text-dark-green px-2 py-0.5 rounded">
                    {formatResponseTime(entry.response_time)}
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase text-white/40">
                    {formatResponseTime(entry.response_time)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
