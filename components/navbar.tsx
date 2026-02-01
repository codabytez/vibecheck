"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { ROUTES } from "./constants";
import { HelpCircle, Sliders } from "lucide-react";

export const ExternalNavbar: NextPage = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-border/50 bg-emerald-deep/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-10">
            <a
              className="text-sm font-semibold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
              href={ROUTES.HOW_IT_WORKS}
            >
              How it works
            </a>
            <a
              className="text-sm font-semibold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
              href={ROUTES.PRIVACY_POLICY}
            >
              Privacy
            </a>
            <a
              className="text-sm font-semibold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
              href="#"
            >
              GitHub
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              className="hidden sm:flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-emerald-deep hover:bg-accent transition-all shadow-primary-glow"
              onClick={() => router.push(ROUTES.UPLOAD)}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export const UploadNavbar: NextPage = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <button className="flex items-center justify-center gap-2 rounded-lg bg-surface-dark hover:bg-border-dark text-white px-4 py-2 transition-colors text-sm font-semibold border border-border-dark">
          <HelpCircle className="text-lg" />
          <span className="hidden sm:inline">How to Export</span>
        </button>
      </div>
    </header>
  );
};

export const DashboardNavbar: NextPage = () => {
  return (
    <div className="w-full border-b border-white/5 sticky top-0 z-50 bg-dashboard-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between h-16">
          <Logo />
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
                href={ROUTES.PRIVACY_POLICY}
              >
                Privacy
              </a>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <button
      className="flex items-center gap-3"
      onClick={() => window.location.replace("/")}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-emerald-deep shadow-primary-glow">
        <Sliders className="text-2xl font-bold" />
      </div>
      <span className="text-2xl font-extrabold tracking-tight text-white">
        VibeCheck
      </span>
    </button>
  );
};
