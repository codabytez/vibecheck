"use client";

import {
  Analytics,
  Share,
  TrendingUp,
  Check,
  LocalFireDepartment,
  FileUpload,
  WorkspacePremium,
  Mood,
  VerifiedUser,
  PhotoCamera,
} from "../icons";
import Image from "next/image";
import HERO_BG from "@/public/assets/dashboard_hero_bg.png";
import MVP_PHOTO from "@/public/assets/mvp_photo.png";
import GHOST_AVATAR from "@/public/assets/ghost_avatar.png";

/* ---------------------------------------------------------------------------
   Heatmap data — each row is one day, each cell is one hour (24 cols).
   Values: 0-5 = intensity tiers mapped to opacity classes below.
--------------------------------------------------------------------------- */
const HEATMAP_ROWS: { day: string; cells: number[] }[] = [
  {
    day: "Mon",
    cells: [
      0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 1, 0, 0, 0, 1, 2, 4, 5, 5, 5, 5, 4, 2, 0,
    ],
  },
  {
    day: "Fri",
    cells: [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5,
    ],
  },
  {
    day: "Sat",
    cells: [
      5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4,
    ],
  },
];

const HEAT_CLASSES = [
  "bg-neon-green/5",
  "bg-neon-green/10",
  "bg-neon-green/20",
  "bg-teal-accent/30",
  "bg-neon-green/60",
  "bg-neon-green",
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dashboard-bg text-white font-display overflow-x-hidden selection:bg-neon-green selection:text-dark-green">
      {/* ----------------------------------------------------------------- Header */}
      <div className="w-full border-b border-white/5 sticky top-0 z-50 bg-dashboard-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 text-neon-green">
                <Analytics className="text-3xl" />
              </div>
              <h2 className="text-xl font-extrabold tracking-tighter">
                VIBECHECK
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-6">
                <a
                  className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-neon-green transition-colors"
                  href="#"
                >
                  GitHub
                </a>
                <a
                  className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-neon-green transition-colors"
                  href="#"
                >
                  Privacy
                </a>
              </div>
              <button className="flex items-center justify-center rounded-full h-9 px-6 bg-neon-green hover:brightness-110 transition-all text-dark-green text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(44,251,131,0.3)]">
                Donate
              </button>
            </div>
          </header>
        </div>
      </div>

      {/* --------------------------------------------------------------- Main */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ------------------------------------------------- Hero / title card */}
        <div className="relative w-full rounded-3xl overflow-hidden min-h-112.5 flex items-center justify-center p-8 text-center group neon-border-dashboard">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 group-hover:scale-105 opacity-40"
            style={{
              backgroundImage: `linear-gradient(rgba(4,13,8,0.8) 0%, rgba(4,13,8,0.6) 100%), url("${HERO_BG}")`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-dashboard-bg via-transparent to-transparent z-0" />

          <div className="relative z-10 flex flex-col items-center gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-green/10 backdrop-blur-md border border-neon-green/20 text-[10px] font-black uppercase tracking-[0.2em] text-neon-green mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              2023 Vibe Report
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] neon-glow-text">
              THE LATE NIGHT CREW
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-medium max-w-xl mt-4">
              You guys really need to sleep more. Here&apos;s what went down in
              the group chat this year. 🍻
            </p>
            <div className="pt-8">
              <button className="flex items-center justify-center rounded-full h-14 px-10 bg-neon-green text-dark-green hover:scale-105 transition-all text-sm font-black uppercase tracking-widest gap-2 shadow-[0_0_30px_rgba(44,251,131,0.4)]">
                <Share className="text-xl" />
                Share Full Report
              </button>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-min">
          {/* --- Total Messages */}
          <div className="lg:col-span-4 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col justify-between h-full relative group transition-all hover:bg-dark-green">
            <button
              className="absolute top-6 right-6 text-white/30 hover:text-neon-green transition-colors opacity-0 group-hover:opacity-100"
              title="Snap this card"
            >
              <FileUpload />
            </button>
            <div className="flex flex-col gap-2">
              <p className="text-neon-green/60 text-xs font-black uppercase tracking-widest">
                Total Messages
              </p>
              <div className="flex items-end gap-3">
                <p className="text-5xl font-black tracking-tighter">42,069</p>
                <span className="text-neon-green text-xs font-black mb-1.5 flex items-center bg-neon-green/10 px-2 py-0.5 rounded">
                  <TrendingUp className="text-sm" /> 12%
                </span>
              </div>
            </div>
            <div className="mt-8 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-neon-green w-[75%] rounded-full shadow-[0_0_10px_rgba(44,251,131,0.5)]" />
            </div>
          </div>

          {/* --- Active Days */}
          <div className="lg:col-span-4 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col justify-between h-full relative group transition-all hover:bg-dark-green">
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
                  365
                </p>
                <span className="text-neon-green text-xs font-black mb-1.5 flex items-center bg-neon-green/10 px-2 py-0.5 rounded">
                  <Check className="text-sm" /> 100%
                </span>
              </div>
            </div>
            <div className="mt-8 flex gap-1.5 h-1.5 w-full">
              <div className="flex-1 bg-neon-green rounded-full" />
              <div className="flex-1 bg-neon-green rounded-full" />
              <div className="flex-1 bg-neon-green rounded-full" />
              <div className="flex-1 bg-neon-green rounded-full" />
              <div className="flex-1 bg-neon-green/20 rounded-full" />
              <div className="flex-1 bg-neon-green/20 rounded-full" />
            </div>
          </div>

          {/* --- Chaos Level */}
          <div className="lg:col-span-4 bg-linear-to-br from-neon-green to-teal-accent rounded-2xl p-8 shadow-[0_0_30px_rgba(44,251,131,0.2)] flex flex-col justify-between h-full relative group text-dark-green">
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
              <p className="text-6xl font-black tracking-tighter">99%</p>
            </div>
            <p className="text-xs font-black uppercase tracking-widest mt-4">
              Basically a dumpster fire. 🔥
            </p>
          </div>

          {/* --- Chat MVP */}
          <div className="lg:col-span-8 bg-card-bg rounded-2xl neon-border-dashboard overflow-hidden flex flex-col md:flex-row relative group">
            <div className="absolute top-6 right-6 z-20">
              <button className="flex items-center gap-2 bg-neon-green text-dark-green px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl">
                <PhotoCamera className="text-sm" />
                Snap MVP
              </button>
            </div>

            {/* Photo half */}
            <div className="md:w-2/5 h-80 md:h-auto relative">
              <div
                className="absolute inset-0 bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                style={{ backgroundImage: `url("${MVP_PHOTO}")` }}
              />
              <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-dark-green via-dark-green/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-neon-green text-dark-green text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">
                  🏆 1st Place
                </span>
                <h3 className="text-white text-4xl font-black tracking-tighter leading-none">
                  SARAH
                </h3>
                <p className="text-neon-green text-xs font-bold mt-1">
                  @sarah_spams
                </p>
              </div>
            </div>

            {/* Stats half */}
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center gap-8 bg-dark-green/50">
              <div>
                <h2 className="text-3xl font-black tracking-tighter mb-2 flex items-center gap-3">
                  THE CHAT MVP
                  <WorkspacePremium className="text-neon-green text-2xl" />
                </h2>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                  She carried the conversation on her back.
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                    <span>Messages Sent</span>
                    <span className="text-neon-green">14,203</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2.5 p-0.5 border border-white/5">
                    <div className="bg-neon-green h-full rounded-full shadow-[0_0_10px_rgba(44,251,131,0.5)] w-full" />
                  </div>
                </div>
                <div className="space-y-3 opacity-40">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                    <span>Mike (2nd Place)</span>
                    <span>4,102</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className="bg-teal-accent/50 h-full rounded-full w-[30%]" />
                  </div>
                </div>
              </div>
              <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                <p className="italic text-white/80 text-sm leading-relaxed">
                  &quot;14,000 messages sent. That&apos;s roughly 38 messages a
                  day. Maybe go outside?&quot;
                </p>
              </div>
            </div>
          </div>

          {/* --- The Ghost */}
          <div className="lg:col-span-4 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col relative group">
            <button
              className="absolute top-6 right-6 text-white/30 hover:text-neon-green transition-colors opacity-0 group-hover:opacity-100"
              title="Snap this card"
            >
              <FileUpload />
            </button>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-3xl shadow-inner">
                👻
              </div>
              <div>
                <h3 className="font-black text-xl tracking-tighter">
                  THE GHOST
                </h3>
                <p className="text-[10px] text-neon-green font-black uppercase tracking-[0.2em]">
                  Most Likely To Ignore You
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-center gap-4">
              <div className="w-24 h-24 rounded-full border-2 border-neon-green/20 p-1">
                <Image
                  src={GHOST_AVATAR}
                  height={240}
                  width={240}
                  alt="Dave avatar"
                  className="w-full h-full rounded-full object-cover grayscale brightness-75"
                />
              </div>
              <div>
                <h4 className="text-2xl font-black tracking-tighter uppercase">
                  DAVE
                </h4>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1 font-bold">
                  Avg response:{" "}
                  <span className="text-neon-green">3 Business Days</span>
                </p>
              </div>
            </div>
          </div>

          {/* --- Peak Hours heatmap */}
          <div className="lg:col-span-12 bg-card-bg rounded-2xl p-8 md:p-10 neon-border-dashboard relative group">
            <button className="absolute top-8 right-8 flex items-center gap-2 bg-white/5 hover:bg-neon-green hover:text-dark-green px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
              <PhotoCamera className="text-sm" />
              Snap Heatmap
            </button>
            <h2 className="text-3xl font-black tracking-tighter mb-2">
              PEAK HOURS
            </h2>
            <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
              When the chat is actually lit. 🔥
            </p>

            <div className="w-full overflow-x-auto pb-4">
              <div className="min-w-200 flex flex-col gap-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-14 mb-4">
                  <span>12 AM</span>
                  <span>6 AM</span>
                  <span>12 PM</span>
                  <span>6 PM</span>
                  <span>11 PM</span>
                </div>
                {HEATMAP_ROWS.map((row) => (
                  <div key={row.day} className="flex gap-6 items-center">
                    <span className="w-8 text-[10px] font-black text-white/40 uppercase">
                      {row.day}
                    </span>
                    <div className="flex-1 grid grid-cols-24 gap-1.5 h-10">
                      {row.cells.map((tier, i) => {
                        const isTop =
                          tier === 5 && row.day === "Mon" && i === 19;
                        return (
                          <div
                            key={i}
                            className={[
                              "rounded-sm",
                              HEAT_CLASSES[tier],
                              tier === 5
                                ? "shadow-[0_0_15px_rgba(44,251,131,0.5)]"
                                : "",
                              isTop
                                ? "flex items-center justify-center text-dark-green text-[8px] font-black"
                                : "",
                            ].join(" ")}
                          >
                            {isTop && "TOP"}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- Emoji Vibe */}
          <div className="lg:col-span-6 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col relative group">
            <h2 className="text-2xl font-black tracking-tighter mb-10 flex items-center gap-3">
              <Mood className="text-neon-green" />
              EMOJI VIBE
            </h2>
            <div className="flex items-end justify-center gap-8 h-56 mb-10">
              <div className="flex flex-col items-center gap-3 w-20">
                <span className="text-4xl">💀</span>
                <div className="w-full bg-teal-accent/20 rounded-t-xl h-28 relative group-hover:bg-teal-accent/40 transition-colors border-t border-teal-accent/30">
                  <div className="absolute bottom-3 w-full text-center text-[10px] font-black uppercase text-teal-accent">
                    2.4k
                  </div>
                </div>
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                  #2
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 w-28">
                <span className="text-7xl drop-shadow-[0_0_20px_rgba(44,251,131,0.4)]">
                  😂
                </span>
                <div className="w-full bg-neon-green rounded-t-xl h-40 relative shadow-[0_0_40px_rgba(44,251,131,0.3)]">
                  <div className="absolute bottom-3 w-full text-center text-xs font-black uppercase text-dark-green">
                    4.1k
                  </div>
                </div>
                <div className="text-xs font-black text-neon-green uppercase tracking-[0.2em] mt-1">
                  #1
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 w-20">
                <span className="text-4xl">🍆</span>
                <div className="w-full bg-white/5 rounded-t-xl h-20 relative group-hover:bg-white/10 transition-colors border-t border-white/10">
                  <div className="absolute bottom-3 w-full text-center text-[10px] font-black uppercase text-white/40">
                    900
                  </div>
                </div>
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                  #3
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {["❤️ 450", "👀 320", "🤡 210", "🔥 190"].map((tag) => (
                <span
                  key={tag}
                  className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* --- Word Cloud */}
          <div className="lg:col-span-6 bg-black rounded-2xl p-8 shadow-2xl neon-border-dashboard flex flex-col relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-neon-green/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-accent/10 rounded-full blur-[100px] pointer-events-none" />
            <h2 className="text-2xl font-black tracking-tighter mb-6 z-10">
              WE SAY THIS A LOT...
            </h2>
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
              <span className="text-3xl font-black text-neon-green/70 uppercase tracking-tight">
                gaming
              </span>
              <span className="text-4xl font-black text-white uppercase tracking-tighter">
                facts
              </span>
              <span className="text-sm font-bold text-white/30 uppercase tracking-[0.3em]">
                actually
              </span>
              <span className="text-5xl font-black text-teal-accent/30 -rotate-1 uppercase tracking-tighter">
                NO CAP
              </span>
              <span className="text-xl font-black text-neon-green uppercase tracking-widest">
                hop on
              </span>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------- Footer / privacy */}
        <div className="mt-16 border-t border-white/5 pt-12 flex flex-col items-center text-center gap-6 pb-12">
          <div className="flex items-center gap-3 px-6 py-3 bg-neon-green/10 border border-neon-green/20 rounded-full text-neon-green text-xs font-black uppercase tracking-widest">
            <VerifiedUser className="text-lg" />
            Analyzed locally on your device. Zero data uploaded.
          </div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
            Generated with ⚡️ by VibeCheck.{" "}
            <a
              className="text-neon-green hover:underline decoration-2 underline-offset-4"
              href="#"
            >
              Star us on GitHub
            </a>
          </p>
        </div>
      </main>

      {/* ------------------------------------------------- Mobile share FAB */}
      <div className="fixed bottom-8 right-8 lg:hidden z-40">
        <button className="w-16 h-16 rounded-full bg-neon-green text-dark-green shadow-[0_0_30px_rgba(44,251,131,0.5)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
          <Share className="text-3xl font-bold" />
        </button>
      </div>
    </div>
  );
}
