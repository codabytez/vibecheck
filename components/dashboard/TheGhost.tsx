"use client";

import { formatResponseTime } from "@/components/dashboard/utils";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface ResponseTimeEntry {
  name: string;
  response_time: number;
}

interface TheGhostProps {
  responseTimeData: { data: ResponseTimeEntry[] } | null | undefined;
}

// ---------------------------------------------------------------------------
export default function TheGhost({ responseTimeData }: TheGhostProps) {
  if (!responseTimeData?.data)
    return (
      <div className="lg:col-span-4">
        <CardSkeleton />
      </div>
    );

  // The slowest responder is the last entry in the sorted list
  const ghost = responseTimeData.data[responseTimeData.data.length - 1];

  return (
    <div className="lg:col-span-4">
      <div className="bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col relative group">
        <button
          className="absolute top-6 right-6 text-white/30 hover:text-neon-green transition-colors opacity-0 group-hover:opacity-100"
          title="Snap this card"
        >
          {/* FileUpload icon imported via parent if needed; kept inline for isolation */}
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-3xl shadow-inner">
            👻
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter">THE GHOST</h3>
            <p className="text-[10px] text-neon-green font-black uppercase tracking-[0.2em]">
              Most Likely To Ignore You
            </p>
          </div>
        </div>

        {/* Avatar + name + response time */}
        <div className="flex-1 flex flex-col justify-center items-center text-center gap-4">
          <div className="w-24 h-24 rounded-full border-2 border-neon-green/20 p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ghost?.name}`}
              height={240}
              width={240}
              alt="Ghost avatar"
              className="w-full h-full rounded-full object-cover grayscale brightness-75"
            />
          </div>
          <div>
            <h4 className="text-2xl font-black tracking-tighter uppercase">
              {ghost?.name ?? "N/A"}
            </h4>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1 font-bold">
              Avg response:{" "}
              <span className="text-neon-green">
                {formatResponseTime(ghost?.response_time ?? 0)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
