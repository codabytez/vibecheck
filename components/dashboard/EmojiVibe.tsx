"use client";

import { Smile as Mood } from "lucide-react";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface EmojiEntry {
  emoji: string;
  count: number;
}

interface EmojiVibeProps {
  emojiData: { top_emojis: EmojiEntry[] } | null | undefined;
}

// ---------------------------------------------------------------------------
export default function EmojiVibe({ emojiData }: EmojiVibeProps) {
  if (!emojiData?.top_emojis)
    return (
      <div className="lg:col-span-6">
        <CardSkeleton />
      </div>
    );

  return (
    <div className="lg:col-span-6">
      <div className="bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col relative group">
        <h2 className="text-2xl font-black tracking-tighter mb-10 flex items-center gap-3">
          <Mood className="text-neon-green" />
          EMOJI VIBE
        </h2>

        {/* Podium */}
        <div className="flex items-end justify-center gap-8 h-56 mb-10">
          {emojiData.top_emojis.length >= 3 ? (
            <>
              {/* 2nd Place */}
              <div className="flex flex-col items-center gap-3 w-20">
                <span className="text-4xl">
                  {emojiData.top_emojis[1].emoji}
                </span>
                <div className="w-full bg-teal-accent/20 rounded-t-xl h-28 relative group-hover:bg-teal-accent/40 transition-colors border-t border-teal-accent/30">
                  <div className="absolute bottom-3 w-full text-center text-[10px] font-black uppercase text-teal-accent">
                    {emojiData.top_emojis[1].count}
                  </div>
                </div>
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                  #2
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center gap-3 w-28">
                <span className="text-7xl drop-shadow-[0_0_20px_rgba(44,251,131,0.4)]">
                  {emojiData.top_emojis[0].emoji}
                </span>
                <div className="w-full bg-neon-green rounded-t-xl h-40 relative shadow-[0_0_40px_rgba(44,251,131,0.3)]">
                  <div className="absolute bottom-3 w-full text-center text-xs font-black uppercase text-dark-green">
                    {emojiData.top_emojis[0].count}
                  </div>
                </div>
                <div className="text-xs font-black text-neon-green uppercase tracking-[0.2em] mt-1">
                  #1
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center gap-3 w-20">
                <span className="text-4xl">
                  {emojiData.top_emojis[2].emoji}
                </span>
                <div className="w-full bg-white/5 rounded-t-xl h-20 relative group-hover:bg-white/10 transition-colors border-t border-white/10">
                  <div className="absolute bottom-3 w-full text-center text-[10px] font-black uppercase text-white/40">
                    {emojiData.top_emojis[2].count}
                  </div>
                </div>
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                  #3
                </div>
              </div>
            </>
          ) : (
            <div className="text-white/40 self-center">
              Not enough emoji data
            </div>
          )}
        </div>

        {/* Pills row — BUG FIX: was previously rendered outside the conditional entirely */}
        <div className="flex flex-wrap gap-3 justify-center">
          {emojiData.top_emojis.slice(3, 7).map((e) => (
            <span
              key={e.emoji}
              className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60"
            >
              {e.emoji} {e.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
