"use client";
import React from "react";

export const CardSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 animate-pulse">
      <div className="h-6 bg-white/10 rounded w-1/3 mb-4" />
      <div className="grid gap-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-3 bg-white/8 rounded" />
        ))}
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => (
  <div className="relative w-full rounded-3xl overflow-hidden min-h-112.5 flex items-center justify-center p-8 text-center group neon-border-dashboard animate-pulse">
    <div className="h-6 bg-white/10 rounded w-1/4 mb-4" />
    <div className="h-12 bg-white/8 rounded w-3/4 mt-4" />
    <div className="h-4 bg-white/6 rounded w-1/2 mt-6" />
  </div>
);

export default {};
