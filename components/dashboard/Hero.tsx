"use client";
import React from "react";
import { Share2 as Share } from "lucide-react";
import HERO_BG from "@/public/assets/dashboard_hero_bg.png";
import { format } from "date-fns";

type Props = {
  summaryData: any;
  chosenInsight: string;
};

const Hero: React.FC<Props> = ({ summaryData, chosenInsight }) => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden min-h-112.5 flex items-center justify-center p-8 text-center group neon-border-dashboard">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 group-hover:scale-105 opacity-40"
        style={{
          backgroundImage: `linear-gradient(rgba(4,13,8,0.8) 0%, rgba(4,13,8,0.6) 100%), url("${HERO_BG.src}")`,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-dashboard-bg via-transparent to-transparent z-0" />
      <div className="relative z-10 flex flex-col items-center gap-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-green/10 backdrop-blur-md border border-neon-green/20 text-[10px] font-black uppercase tracking-[0.2em] text-neon-green mb-2">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          {summaryData?.start_date && summaryData?.end_date
            ? `${format(new Date(summaryData.start_date), "MMM d, yyyy")} – ${format(new Date(summaryData.end_date), "MMM d, yyyy")}`
            : "Vibe Report"}
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] neon-glow-text">
          {summaryData?.group_activity_label || ""}
        </h1>
        <p className="md:text-lg text-white/70 font-medium max-w-xl mt-4">
          {chosenInsight}
        </p>
        <div className="pt-8">
          <button className="flex items-center justify-center rounded-full h-14 px-10 bg-neon-green text-dark-green hover:scale-105 transition-all text-sm font-black uppercase tracking-widest gap-2 shadow-[0_0_30px_rgba(44,251,131,0.4)]">
            <Share className="text-xl" />
            Share Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
