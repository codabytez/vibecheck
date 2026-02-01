"use client";

import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface LongestMessage {
  length: number;
  preview: string;
  author: string;
}

interface GreatWallOfTextProps {
  longestMessage: LongestMessage | null | undefined;
}

// ---------------------------------------------------------------------------
export default function GreatWallOfText({
  longestMessage,
}: GreatWallOfTextProps) {
  if (!longestMessage)
    return (
      <div className="lg:col-span-8">
        <CardSkeleton rows={6} />
      </div>
    );

  return (
    <div className="lg:col-span-8">
      <div className="bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col md:flex-row gap-8 relative overflow-hidden group">
        {/* Left — stats */}
        <div className="md:w-1/2 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[10px] font-black text-red-500 rounded uppercase tracking-widest">
            Record Broken
          </div>
          <h3 className="text-3xl font-black tracking-tighter leading-none">
            THE GREAT WALL OF TEXT
          </h3>
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
            Longest single message ever sent
          </p>
          <div className="pt-4">
            <div className="text-5xl font-black text-neon-green tracking-tighter">
              {longestMessage.length.toLocaleString()}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              Characters in one go
            </p>
          </div>
        </div>

        {/* Right — preview */}
        <div className="md:w-1/2 bg-dark-green rounded-xl p-4 border border-white/5 relative">
          {/* Background watermark text */}
          <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden text-[8px] leading-tight font-mono text-neon-green whitespace-pre-wrap p-4">
            {longestMessage.preview || "Lorem ipsum..."}
          </div>
          {/* Foreground content */}
          <div className="relative z-10 h-full flex flex-col justify-end">
            <p className="text-xs font-bold text-white/70 italic line-clamp-4">
              &quot;{longestMessage.preview || "..."}&quot;
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${longestMessage.author}`}
                  height={24}
                  width={24}
                  alt="Author avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-[10px] font-black uppercase text-neon-green">
                Sent by {longestMessage.author || "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
