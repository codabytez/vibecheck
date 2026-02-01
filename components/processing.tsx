"use client";

import Image from "next/image";
import { MessageSquare, Smile, Lightbulb, Heart } from "lucide-react";
import HERO_IMAGE from "@/public/assets/processing_hero_image.png";
import { NextPage } from "next";

export const Processing: NextPage<ProcessingProps> = ({
  progress,
  etaSeconds,
}) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-white overflow-x-hidden">
      {/* Fixed ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a1a0f_100%)]" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center max-w-2xl w-full gap-10">
          {/* Hero orb with floating badges */}
          <div className="relative flex items-center justify-center py-8">
            {/* Outer pulse glow */}
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl animate-pulse" />

            {/* Main circle */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-accent/30 bg-surface-dark flex items-center justify-center animate-neon-glow">
              {/* Spinning gradient sweep */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent/30 to-transparent animate-[spin_6s_linear_infinite] opacity-60" />
              {/* Hero image */}
              <Image
                src={HERO_IMAGE}
                width={500}
                height={500}
                alt="Abstract 3D geometric shape glowing green representing data processing"
                className="w-full h-full object-cover mix-blend-lighten opacity-90"
              />
            </div>

            {/* Floating badge — chat */}
            <div
              className="absolute -top-4 -right-8 p-3 rounded-2xl glass-panel-processing text-accent shadow-lg animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <MessageSquare className="text-2xl" />
            </div>

            {/* Floating badge — sentiment */}
            <div
              className="absolute -bottom-2 -left-8 p-3 rounded-2xl glass-panel-processing text-primary shadow-lg animate-bounce"
              style={{ animationDuration: "4s", animationDelay: "1s" }}
            >
              <Smile className="text-2xl" />
            </div>
          </div>

          {/* Headline + subtitle */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
              Reading the <span className="neon-text">tea leaves...</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-bold max-w-lg mx-auto leading-relaxed opacity-90">
              Hang tight! We&apos;re decoding your inside jokes and calculating
              the <span className="text-accent">vibe score</span>.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md space-y-4">
            <div className="flex justify-between items-end px-1">
              <span className="text-xs font-black text-accent uppercase tracking-[0.2em]">
                Analyzing Chat History
              </span>
              <span className="text-sm font-black text-white">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="h-4 w-full bg-surface-dark rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
              <div
                className="h-full bg-linear-to-r from-primary to-accent rounded-full relative neon-border-glow"
                style={{ width: `${Math.max(3, Math.min(progress, 100))}%` }}
              >
                <div className="absolute inset-0 shimmer-bar rounded-full" />
              </div>
            </div>

            <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest pt-2">
              Estimated time remaining: ~{Math.max(1, Math.round(etaSeconds))}{" "}
              seconds
            </p>
          </div>

          {/* Fun-fact cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-12">
            <div className="glass-panel-processing p-6 rounded-2xl flex items-start gap-4 transition-all hover:border-accent/40 hover:-translate-y-1">
              <div className="p-2 bg-primary/20 rounded-xl text-accent shrink-0">
                <Lightbulb className="text-[24px]" />
              </div>
              <div>
                <h4 className="text-white text-sm font-extrabold mb-1">
                  Did you know?
                </h4>
                <p className="text-slate-400 text-sm font-medium leading-snug">
                  The average person sends over 100 messages a day. You&apos;re
                  definitely above average.
                </p>
              </div>
            </div>

            <div className="glass-panel-processing p-6 rounded-2xl flex items-start gap-4 transition-all hover:border-accent/40 hover:-translate-y-1">
              <div className="p-2 bg-primary/20 rounded-xl text-accent shrink-0">
                <Heart className="text-[24px]" />
              </div>
              <div>
                <h4 className="text-white text-sm font-extrabold mb-1">
                  Fun Fact
                </h4>
                <p className="text-slate-400 text-sm font-medium leading-snug">
                  The &quot;Joy&quot; emoji 😂 is the most used emoji globally.
                  Let&apos;s see if it&apos;s yours too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
