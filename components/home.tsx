"use client";
import {
  ShieldCheck,
  Timer,
  UploadCloud as UploadFile,
  Smile as SentimentSatisfied,
  Clock as Schedule,
  MessageSquare as Forum,
  Calendar as CalendarMonth,
  Smartphone as PhoneIphone,
  Smartphone as Android,
  Laptop as LaptopMac,
  Monitor as DesktopWindows,
} from "lucide-react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { ROUTES } from "./constants";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-250 hero-glow opacity-80 pointer-events-none animate-pulse-slow" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
            <ShieldCheck className="text-sm text-primary" />

            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              100% Client-Side Processing
            </span>
          </div>
          <h1 className="max-w-4xl text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            <span className="text-white">Your Chats,</span> <br />
            <span className="text-gradient">Unwrapped.</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
            Turn your WhatsApp exports into beautiful insights.
            <span className="block text-white font-medium mt-2">
              Private, fast, and fun. No data ever leaves your device.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center">
            <button
              className="h-16 px-12 rounded-full neon-button text-emerald-deep font-extrabold text-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              onClick={() => router.push(ROUTES.UPLOAD)}
            >
              <UploadFile className="font-bold" />
              Get Started
            </button>
            {/* <button className="h-16 px-12 rounded-full glass-panel text-white font-bold text-lg hover:bg-emerald-border/40 transition-all flex items-center justify-center border-primary/20">
              View Demo
            </button> */}
          </div>

          {/* Preview Cards */}
          <div className="relative mt-24 w-full max-w-5xl h-80 hidden md:block">
            <div className="absolute left-4 top-10 w-64 glass-panel rounded-3xl p-6 transform -rotate-6 hover:rotate-0 transition-all duration-500 hover:z-10 cursor-default border-emerald-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <SentimentSatisfied className="text-sm fill-current" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Top Emojis
                </span>
              </div>
              <div className="flex justify-between items-end mb-4">
                <span className="text-4xl">😂</span>
                <span className="text-2xl opacity-80">🔥</span>
                <span className="text-xl opacity-60">💀</span>
                <span className="text-lg opacity-40">❤️</span>
              </div>
              <div className="h-1.5 w-full bg-emerald-border rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[75%] shadow-primary-glow" />
              </div>
            </div>

            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-80 glass-panel rounded-3xl p-6 z-0 hover:z-10 hover:scale-105 transition-all duration-500 border-emerald-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Schedule className="text-sm fill-current" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Night Owl Score
                </span>
              </div>
              <div className="flex items-end gap-2 h-24 w-full">
                <div className="flex-1 bg-emerald-border rounded-t-lg h-[20%]" />
                <div className="flex-1 bg-primary/30 rounded-t-lg h-[40%]" />
                <div className="flex-1 bg-primary/60 rounded-t-lg h-[80%]" />
                <div className="flex-1 bg-primary rounded-t-lg h-full shadow-primary-glow" />
                <div className="flex-1 bg-primary/50 rounded-t-lg h-[60%]" />
                <div className="flex-1 bg-emerald-border rounded-t-lg h-[30%]" />
              </div>
              <p className="mt-4 text-xs text-center text-primary font-bold">
                MOST ACTIVE: 2:00 AM 🦉
              </p>
            </div>

            <div className="absolute right-4 top-16 w-64 glass-panel rounded-3xl p-6 transform rotate-6 hover:rotate-0 transition-all duration-500 hover:z-10 cursor-default border-emerald-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                  <Timer className="text-sm fill-current" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Reply Time
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">You</span>
                  <span className="text-primary font-bold">2m 30s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Them</span>
                  <span className="text-white font-bold">4h 12m</span>
                </div>
                <div className="pt-3 border-t border-emerald-border">
                  <p className="text-xs text-red-400 font-medium">
                    Verdict: You&apos;re being ghosted. 👻
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-32 bg-emerald-deep relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Deep Insights
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl">
              We analyze your metadata to bring you fun, shareable stats about
              your relationships without ever reading your secrets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-4xl bg-emerald-card border border-emerald-border hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform shadow-primary-glow-sm">
                <SentimentSatisfied className="text-3xl fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Sentiment Analysis
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Are you positive vibes only or a bit spicy? See how the tone of
                your conversation shifts over time.
              </p>
            </div>
            <div className="p-8 rounded-4xl bg-emerald-card border border-emerald-border hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform shadow-primary-glow-sm">
                <Forum className="text-3xl fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                The Chatterbox
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Who sends the most messages? Who writes essays and who replies
                with &quot;k&quot;? Settle the debate once and for all.
              </p>
            </div>
            <div className="p-8 rounded-4xl bg-emerald-card border border-emerald-border hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform shadow-primary-glow-sm">
                <CalendarMonth className="text-3xl fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Timeline Journey
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Visualize your relationship from the first &quot;Hello&quot; to
                today. Spot the gaps and the marathon talking sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Export Section */}
      <section className="py-32 bg-emerald-deep">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
            <h2 className="text-5xl font-extrabold text-white mb-6">
              How to export your chats
            </h2>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-10">
              CHOOSE YOUR PLATFORM
            </p>
            <div className="flex flex-wrap gap-12 border-b border-emerald-border pb-4">
              <button className="flex flex-col items-center gap-2 group relative">
                <PhoneIphone className="text-primary group-hover:scale-110 transition-transform" />
                <span className="text-primary font-bold text-sm">iOS</span>
                <div className="absolute -bottom-4.25 left-0 right-0 h-1 bg-primary rounded-full" />
              </button>
              <button className="flex flex-col items-center gap-2 group text-slate-500 hover:text-slate-300 transition-all">
                <Android className="group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm">Android</span>
              </button>
              <button className="flex flex-col items-center gap-2 group text-slate-500 hover:text-slate-300 transition-all">
                <LaptopMac className="group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm">Mac</span>
              </button>
              <button className="flex flex-col items-center gap-2 group text-slate-500 hover:text-slate-300 transition-all">
                <DesktopWindows className="group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm">PC</span>
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-12 relative">
              <div className="absolute left-6 top-4 bottom-4 w-0.5 timeline-line opacity-30" />
              <div className="flex gap-8 relative z-10">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-emerald-deep flex items-center justify-center font-extrabold text-lg shadow-primary-glow">
                  1
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-2xl mb-2">
                    Open Chat Info
                  </h4>
                  <p className="text-slate-400 text-lg">
                    Tap the contact name or group subject at the top of your
                    chat.
                  </p>
                </div>
              </div>
              <div className="flex gap-8 relative z-10">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-emerald-deep flex items-center justify-center font-extrabold text-lg shadow-primary-glow">
                  2
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-2xl mb-2">
                    Tap Export Chat
                  </h4>
                  <p className="text-slate-400 text-lg">
                    Scroll all the way to the bottom to find the{" "}
                    <strong className="text-primary">Export Chat</strong>{" "}
                    option.
                  </p>
                </div>
              </div>
              <div className="flex gap-8 relative z-10">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-emerald-deep flex items-center justify-center font-extrabold text-lg shadow-primary-glow">
                  3
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-2xl mb-2">
                    Select &apos;Without Media&apos;
                  </h4>
                  <p className="text-slate-400 text-lg">
                    This ensures a small file size and keeps the analysis
                    lightning fast.
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-center sticky top-32">
              <div className="relative w-72 h-145 bg-black rounded-[3.5rem] border-12 border-emerald-card shadow-2xl overflow-hidden ring-1 ring-emerald-border/50">
                <div className="absolute top-0 left-0 right-0 h-10 bg-emerald-card flex justify-center items-center z-20">
                  <div className="w-24 h-5 bg-black rounded-full" />
                </div>
                <div className="w-full h-full bg-emerald-deep pt-14 px-5 flex flex-col">
                  <div className="flex items-center gap-4 mb-8 pb-4 border-b border-emerald-border">
                    <div className="w-12 h-12 rounded-full bg-emerald-border" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-28 bg-emerald-border rounded" />
                      <div className="h-2 w-16 bg-emerald-border/50 rounded" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 w-full bg-emerald-card rounded-2xl border border-emerald-border" />
                    <div className="h-12 w-full bg-emerald-card rounded-2xl border border-emerald-border" />
                    <div className="h-12 w-full bg-primary rounded-2xl flex items-center px-4 shadow-primary-glow">
                      <span className="text-emerald-deep text-sm font-extrabold">
                        Export Chat
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto mb-6 bg-emerald-card rounded-3xl p-5 border border-emerald-border shadow-2xl">
                    <div className="text-center text-slate-500 text-[11px] mb-4">
                      Attaching media will generate a larger archive.
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="h-11 w-full bg-emerald-deep rounded-xl text-xs flex items-center justify-center text-slate-300 border border-emerald-border">
                        Attach Media
                      </div>
                      <div className="h-11 w-full bg-primary/10 rounded-xl text-xs flex items-center justify-center text-primary font-bold border border-primary/40">
                        Without Media
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-deep">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-[3rem] bg-emerald-card border border-emerald-border p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-emerald-deep shadow-accent-glow mb-10 group-hover:scale-110 transition-transform">
                <UploadFile className="text-4xl font-bold" />
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                Ready to vibe?
              </h2>
              <p className="text-slate-400 text-xl mb-12 max-w-lg">
                Upload your .zip or .txt file and let the magic happen.
              </p>
              <button
                className="h-18 px-14 rounded-full neon-button text-emerald-deep font-extrabold text-xl hover:scale-105 active:scale-95 transition-all"
                onClick={() => router.push(ROUTES.UPLOAD)}
              >
                Start Analysis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Badge */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40 bg-emerald-deep/90 backdrop-blur-md border border-emerald-border rounded-full px-4 py-2 flex items-center gap-3 text-xs shadow-2xl">
        <span className="flex items-center gap-1 text-white font-display">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />{" "}
          1.2M Vibes Checked
        </span>
        <button
          className="bg-primary text-emerald-deep font-bold px-3 py-1 rounded-full text-[10px] hover:scale-105 transition-transform font-display"
          onClick={() => router.push(ROUTES.UPLOAD)}
        >
          TRY NOW
        </button>
      </div>
    </div>
  );
};

export default Home;
