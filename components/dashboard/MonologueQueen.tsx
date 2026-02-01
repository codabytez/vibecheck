"use client";

import { Megaphone } from "lucide-react";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface MonologueEntry {
  name: string;
  consecutive_messages: number;
}

interface MonologueQueenProps {
  monologuesData: { data: MonologueEntry[] } | null | undefined;
}

// ---------------------------------------------------------------------------
export default function MonologueQueen({
  monologuesData,
}: MonologueQueenProps) {
  if (!monologuesData?.data)
    return (
      <div className="lg:col-span-4">
        <CardSkeleton />
      </div>
    );

  const queen = monologuesData.data[0];

  return (
    <div className="lg:col-span-4">
      <div className="bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col justify-between relative group transition-all hover:bg-dark-green">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <Megaphone className="text-neon-green text-4xl" />
            <span className="text-[10px] font-black text-neon-green uppercase tracking-widest bg-neon-green/10 px-2 py-1 rounded">
              Yap God
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-black tracking-tighter">
              THE MONOLOGUE QUEEN
            </h3>
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
              Most consecutive messages
            </p>
          </div>
          <div className="flex items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full border-2 border-neon-green/30 p-1 bg-white/5 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=monologue-queen"
                height={64}
                width={64}
                alt="Monologue Queen avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-3xl font-black text-white leading-none">
                {queen?.name || "N/A"}
              </p>
              <p className="text-neon-green font-bold text-sm">
                {queen?.consecutive_messages || 0} Messages in a row
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-white/40 italic">
          &quot;She literally treats the group chat like her personal
          diary.&quot;
        </p>
      </div>
    </div>
  );
}
