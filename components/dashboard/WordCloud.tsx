"use client";

import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props — only needs a truthy signal that msgLengthData loaded
// ---------------------------------------------------------------------------
interface WordCloudProps {
  hasData: boolean;
}

// ---------------------------------------------------------------------------
export default function WordCloud({ hasData }: WordCloudProps) {
  if (!hasData)
    return (
      <div className="lg:col-span-6">
        <CardSkeleton rows={5} />
      </div>
    );

  return (
    <div className="lg:col-span-6">
      <div className="bg-black rounded-2xl p-8 shadow-2xl neon-border-dashboard flex flex-col relative overflow-hidden group">
        {/* Decorative blurred orbs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-neon-green/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <h2 className="text-2xl font-black tracking-tighter mb-6 z-10">
          WE SAY THIS A LOT...
        </h2>

        {/* Static word cloud — NOTE: replace with real data when a word-cloud API/hook is available */}
        <div className="flex-1 flex flex-wrap content-center justify-center gap-x-6 gap-y-4 relative z-10 p-6">
          <span className="text-5xl font-black text-neon-green -rotate-3 uppercase tracking-tighter neon-glow-text">
            BRUH
          </span>
          <span className="text-2xl font-bold text-white/80 uppercase tracking-widest">
            literally
          </span>
          <span className="text-3xl font-black text-white/40 uppercase">
            LMAO
          </span>
          <span className="text-6xl font-black text-white rotate-2 tracking-tighter uppercase">
            DEAD
          </span>
          <span className="text-xl font-bold text-teal-accent uppercase tracking-[0.2em]">
            gym?
          </span>
          <span className="text-4xl font-black text-white/20 uppercase tracking-tighter">
            bet
          </span>
          <span className="text-2xl font-medium text-white/60 uppercase">
            tonight
          </span>
        </div>
      </div>
    </div>
  );
}
