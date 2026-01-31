"use client";

import { ROUTES } from "@/components/constants";
import {
  Equalizer,
  Help,
  UploadFile,
  Lock,
  FolderZip,
  TextSnippet,
  Security,
} from "../icons";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-white overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 text-primary flex items-center justify-center">
              <Equalizer className="text-[32px]!" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              VibeCheck
            </h2>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-surface-dark hover:bg-border-dark text-white px-4 py-2 transition-colors text-sm font-semibold border border-border-dark">
            <Help className="text-lg" />
            <span className="hidden sm:inline">How to Export</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="grow flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-green-900/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Headline */}
        <div className="text-center mb-10 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Ready to <span className="text-primary">vibe?</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Discover your chat personality. It&apos;s like Spotify Wrapped, but
            for your WhatsApp groups.
          </p>
        </div>

        {/* Drop-zone + floating file badges */}
        <div className="w-full max-w-3xl relative z-10">
          {/* Floating badge — archive.zip */}
          <div className="absolute -left-12 top-10 animate-float hidden lg:block pointer-events-none">
            <div className="bg-surface-dark border border-border-dark p-3 rounded-xl shadow-xl transform rotate-12 flex flex-col items-center gap-1">
              <FolderZip className="text-4xl text-primary/80" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Archive.zip
              </span>
            </div>
          </div>

          {/* Floating badge — chat.txt */}
          <div className="absolute -right-8 bottom-20 animate-float-delayed hidden lg:block pointer-events-none">
            <div className="bg-surface-dark border border-border-dark p-3 rounded-xl shadow-xl transform -rotate-6 flex flex-col items-center gap-1">
              <TextSnippet className="text-4xl text-primary/80" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Chat.txt
              </span>
            </div>
          </div>

          {/* Drop-zone card */}
          <div className="group relative rounded-3xl border-2 border-dashed border-primary/20 hover:border-primary/60 bg-surface-dark/40 hover:bg-surface-dark/60 transition-all duration-300 ease-out cursor-pointer overflow-hidden neon-glow">
            {/* Hover fill overlay */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative flex flex-col items-center justify-center px-6 py-20 sm:py-24 text-center">
              {/* Upload icon with glow */}
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-primary blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                <div className="relative bg-primary p-5 rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <UploadFile className="text-4xl text-background-dark font-bold" />
                </div>
              </div>

              <h3 className="text-xl sm:text-3xl font-bold text-white mb-3">
                Ready to vibe?
              </h3>
              <p className="text-slate-400 text-base mb-8">
                Upload your .zip or .txt file and let the magic happen.
              </p>

              <button
                className="relative overflow-hidden bg-primary hover:bg-primary-hover text-background-dark font-bold py-4 px-12 rounded-full transition-all shadow-lg hover:shadow-primary/40 active:scale-95 text-lg"
                onClick={() => router.push(ROUTES.ANALYSE)}
              >
                Start Analysis
              </button>

              <div className="mt-8 flex items-center justify-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest opacity-80">
                <Lock className="text-sm" />
                100% Private &amp; On-Device
              </div>
            </div>
          </div>
        </div>

        {/* Privacy card */}
        <div className="mt-12 max-w-2xl w-full px-4">
          <div className="glass-effect rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left hover:scale-[1.01] transition-transform">
            <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Security className="text-primary text-2xl" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">
                Privacy First
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Your chats are analyzed 100% locally in your browser. No data is
                ever sent to our servers, so your secrets stay yours.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-border-dark">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <span className="w-1 h-1 rounded-full bg-border-dark" />
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
          </div>
          <p className="text-xs text-slate-600">VibeCheck v1.0 © 2023</p>
        </div>
      </footer>
    </div>
  );
}
