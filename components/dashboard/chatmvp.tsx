"use client";

import { Camera as PhotoCamera, Gem as WorkspacePremium } from "lucide-react";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface MessageVolumeEntry {
  name: string;
  messages: number;
}

interface ChatMVPProps {
  messageVolumeData: { data: MessageVolumeEntry[] } | null | undefined;
  totalDays: number;
}

// ---------------------------------------------------------------------------
export default function ChatMVP({
  messageVolumeData,
  totalDays,
}: ChatMVPProps) {
  if (!messageVolumeData?.data)
    return (
      <div className="lg:col-span-8">
        <CardSkeleton />
      </div>
    );

  const topMessages = messageVolumeData.data[0]?.messages ?? 0;
  const days = Math.max(1, totalDays);
  const avg = Math.round(topMessages / days);

  let comment = "";
  if (avg === 0) comment = "Is this chat even alive? 🦗";
  else if (avg <= 3) comment = "Super chill — minimal chatter.";
  else if (avg <= 15) comment = "Steady vibes.";
  else if (avg <= 50) comment = "Things are popping.";
  else if (avg <= 200) comment = "Maybe go outside!";
  else comment = "Absolute chaos! 🔥";

  return (
    <div className="lg:col-span-8">
      <div className="bg-card-bg rounded-2xl neon-border-dashboard overflow-hidden flex flex-col md:flex-row relative group">
        {/* Snap button */}
        <div className="absolute top-6 right-6 z-20">
          <button className="flex items-center gap-2 bg-neon-green text-dark-green px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl">
            <PhotoCamera className="text-sm" />
            Snap MVP
          </button>
        </div>

        {/* Left panel — hero image */}
        <div className="md:w-2/5 h-80 md:h-auto relative">
          <div
            className="absolute inset-0 bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lubmVyfGVufDB8fDB8fHww")',
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-dark-green via-dark-green/40 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="bg-neon-green text-dark-green text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">
              🏆 1st Place
            </span>
            <h3 className="text-white text-4xl font-black tracking-tighter leading-none">
              {messageVolumeData.data[0]?.name || "Loading..."}
            </h3>
            <p className="text-neon-green text-xs font-bold mt-1">
              Most messages sent
            </p>
          </div>
        </div>

        {/* Right panel — stats */}
        <div className="p-8 md:p-10 flex-1 flex flex-col justify-center gap-8 bg-dark-green/50">
          <div>
            <h2 className="text-3xl font-black tracking-tighter mb-2 flex items-center gap-3">
              THE CHAT MVP
              <WorkspacePremium className="text-neon-green text-2xl" />
            </h2>
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
              Carried the conversation on their back.
            </p>
          </div>

          <div className="space-y-6">
            {/* 1st Place Bar */}
            {messageVolumeData.data[0] && (
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                  <span>Messages Sent</span>
                  <span className="text-neon-green">
                    {messageVolumeData.data[0].messages.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2.5 p-0.5 border border-white/5">
                  <div className="bg-neon-green h-full rounded-full shadow-[0_0_10px_rgba(44,251,131,0.5)] w-full" />
                </div>
              </div>
            )}

            {/* 2nd Place Bar */}
            {messageVolumeData.data[1] && (
              <div className="space-y-3 opacity-60">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                  <span>{messageVolumeData.data[1].name} (2nd Place)</span>
                  <span>
                    {messageVolumeData.data[1].messages.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div className="bg-teal-accent/50 h-full rounded-full w-[30%]" />
                </div>
              </div>
            )}

            {/* 3rd Place Bar */}
            {messageVolumeData.data[2] && (
              <div className="space-y-3 opacity-40">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                  <span>{messageVolumeData.data[2].name} (3rd Place)</span>
                  <span>
                    {messageVolumeData.data[2].messages.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div className="bg-teal-accent/30 h-full rounded-full w-[15%]" />
                </div>
              </div>
            )}
          </div>

          {/* Generated comment */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/5">
            <p className="italic text-white/80 text-sm leading-relaxed">
              &quot;{topMessages.toLocaleString()} messages sent. That&apos;s
              roughly {avg.toLocaleString()} messages a day. {comment}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
