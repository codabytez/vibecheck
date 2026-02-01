"use client";

import { Clock } from "lucide-react";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface RoleEntry {
  name: string;
  count: number;
}

interface ConversationRolesData {
  starters: RoleEntry[];
  enders: RoleEntry[];
}

interface DailyRhythmProps {
  rolesData: ConversationRolesData | null | undefined;
}

// ---------------------------------------------------------------------------
export default function DailyRhythm({ rolesData }: DailyRhythmProps) {
  if (!rolesData)
    return (
      <div className="lg:col-span-4">
        <CardSkeleton />
      </div>
    );

  return (
    <div className="lg:col-span-4">
      <div className="bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col justify-between relative group transition-all hover:bg-dark-green">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black tracking-tighter uppercase">
              Daily Rhythm
            </h3>
            <Clock className="text-teal-accent" />
          </div>

          <div className="space-y-6">
            {/* Starters */}
            <div className="flex items-center gap-4">
              <div className="text-center w-12">
                <span className="text-xs font-black text-white/40 uppercase">
                  Start
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-black uppercase text-neon-green mb-1">
                  The Initiators
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                    ☀️
                  </div>
                  <span className="font-bold">
                    {rolesData?.starters[0]?.name || "N/A"}
                  </span>
                  <span className="text-xs text-white/30">
                    {rolesData?.starters[0]?.count ?? 0}x
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                    ☀️
                  </div>
                  <span className="font-bold">
                    {rolesData?.starters[1]?.name || "N/A"}
                  </span>
                  <span className="text-xs text-white/30">
                    {rolesData?.starters[1]?.count ?? 0}x
                  </span>
                </div>
              </div>
            </div>

            {/* Enders */}
            <div className="flex items-center gap-4">
              <div className="text-center w-12">
                <span className="text-xs font-black text-white/40 uppercase">
                  End
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-black uppercase text-teal-accent mb-1">
                  The Closer
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                    🌙
                  </div>
                  <span className="font-bold">
                    {rolesData?.enders[0]?.name || "N/A"}
                  </span>
                  <span className="text-xs text-white/30">
                    {rolesData?.enders[0]?.count ?? 0}x
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                    🌙
                  </div>
                  <span className="font-bold">
                    {rolesData?.enders[1]?.name || "N/A"}
                  </span>
                  {/* BUG FIX: was rolesData?.enders[2].count — should be index [1] */}
                  <span className="text-xs text-white/30">
                    {rolesData?.enders[1]?.count ?? 0}x
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
