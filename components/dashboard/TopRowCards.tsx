"use client";

import {
  Upload as FileUpload,
  Flame as LocalFireDepartment,
  Check,
} from "lucide-react";
import { getChaosLevel } from "@/components/dashboard/utils";
import StatCard from "@/components/dashboard/StatCard";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props — mirrors the shape consumed from useGetDashboardSummary
// ---------------------------------------------------------------------------
interface SummaryData {
  total_messages?: number;
  total_days?: number;
  start_date?: string;
  end_date?: string;
  messages_per_day?: number;
  unique_participants?: number;
  peak_hour?: number;
}

interface TopRowCardsProps {
  summaryData: SummaryData | null | undefined;
}

// ---------------------------------------------------------------------------
// Active-days percentage helper (kept local — only used here)
// ---------------------------------------------------------------------------
const getActiveDaysPct = (summaryData: SummaryData): number => {
  const active = summaryData?.total_days || 0;
  const startRaw = summaryData?.start_date;
  const endRaw = summaryData?.end_date;

  if (startRaw && endRaw) {
    const s = new Date(startRaw);
    const e = new Date(endRaw);
    if (!isNaN(s.getTime()) && !isNaN(e.getTime())) {
      const msPerDay = 24 * 60 * 60 * 1000;
      const totalDays = Math.floor((e.getTime() - s.getTime()) / msPerDay) + 1;
      if (totalDays > 0)
        return Math.min(100, Math.round((active / totalDays) * 100));
    }
  }

  return active > 0 ? 100 : 0;
};

// ---------------------------------------------------------------------------
export default function TopRowCards({ summaryData }: TopRowCardsProps) {
  const chaos = getChaosLevel(summaryData);

  return (
    <>
      {/* ----- Total Messages (col 4) ----- */}
      <div className="lg:col-span-4">
        <StatCard
          title="Total Messages"
          action={
            <button
              className="absolute top-6 right-6 text-white/30 hover:text-neon-green transition-colors opacity-0 group-hover:opacity-100"
              title="Snap this card"
            >
              <FileUpload />
            </button>
          }
        >
          <div className="flex items-end gap-3">
            <p className="text-5xl font-black tracking-tighter">
              {(summaryData?.total_messages || 0).toLocaleString()}
            </p>
          </div>
        </StatCard>
      </div>

      {/* ----- Active Days (col 4) ----- */}
      <div className="lg:col-span-4">
        {summaryData ? (
          <div className="bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col justify-between h-full relative group transition-all hover:bg-dark-green">
            <button
              className="absolute top-6 right-6 text-white/30 hover:text-neon-green transition-colors opacity-0 group-hover:opacity-100"
              title="Snap this card"
            >
              <FileUpload />
            </button>
            <div className="flex flex-col gap-2">
              <p className="text-neon-green/60 text-xs font-black uppercase tracking-widest">
                Active Days
              </p>
              <div className="flex items-end gap-3">
                <p className="text-5xl font-black tracking-tighter text-white">
                  {summaryData?.total_days || 0}
                </p>
                <span className="text-neon-green text-xs font-black mb-1.5 flex items-center bg-neon-green/10 px-2 py-0.5 rounded">
                  <Check className="text-sm" /> {getActiveDaysPct(summaryData)}%
                </span>
              </div>
            </div>
            <div className="mt-8 flex gap-1.5 h-1.5 w-full">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full ${i < 4 ? "bg-neon-green" : "bg-neon-green/20"}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <CardSkeleton />
        )}
      </div>

      {/* ----- Chaos Level (col 4) ----- */}
      <div className="lg:col-span-4">
        {summaryData ? (
          <div className="bg-linear-to-br from-neon-green to-teal-accent rounded-2xl p-8 shadow-[0_0_30px_rgba(44,251,131,0.2)] flex flex-col justify-between h-full relative group text-dark-green">
            <button
              className="absolute top-6 right-6 text-dark-green/40 hover:text-dark-green transition-colors opacity-0 group-hover:opacity-100"
              title="Snap this card"
            >
              <FileUpload />
            </button>
            <div className="flex flex-col gap-2">
              <p className="text-dark-green/60 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <LocalFireDepartment className="text-lg" />
                Chaos Level
              </p>
              <p className="text-6xl font-black tracking-tighter">
                {chaos.percentage}%
              </p>
            </div>
            <p className="text-xs font-black uppercase tracking-widest mt-4">
              {chaos.description}
            </p>
          </div>
        ) : (
          <CardSkeleton />
        )}
      </div>
    </>
  );
}
