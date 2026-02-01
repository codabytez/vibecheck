"use client";

import { CloudUpload, HeartCrack as HeartBroken } from "lucide-react";

/* The source header uses the same bespoke wave SVG as the success page.
   Reuse the identical component here rather than duplicating inline. */
function VibeWaveLogo() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ErrorPage() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-x-hidden bg-emerald-deep text-white font-display">
      {/* ----------------------------------------------------------- Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 px-10 py-3 bg-emerald-deep/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-4 text-white">
          <div className="w-6 h-6 text-error">
            <VibeWaveLogo />
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
            VibeCheck
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              How it works
            </a>
            <a
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              FAQ
            </a>
          </div>
          <button className="flex min-w-30 cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-error text-white text-sm font-bold tracking-wide">
            Upload Chat
          </button>
        </div>
      </header>

      {/* -------------------------------------------------------- Background (mocked upload zone, blurred behind modal) */}
      <main className="flex-1 flex flex-col items-center justify-center p-10 opacity-30 grayscale">
        <div className="max-w-2xl w-full border-2 border-dashed border-white/20 rounded-xl p-20 flex flex-col items-center gap-6 bg-emerald-card/20">
          <CloudUpload className="text-6xl text-white/20" />
          <div className="text-center">
            <h3 className="text-2xl font-bold">
              Drop your WhatsApp export here
            </h3>
            <p className="text-white/50 mt-2">
              Personal data stays on your device.
            </p>
          </div>
        </div>
      </main>

      {/* --------------------------------------------------------- Modal overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-lg bg-emerald-card border border-white/10 rounded-xl shadow-error-glow overflow-hidden flex flex-col">
          {/* Glitch icon */}
          <div className="flex justify-center pt-10 pb-4">
            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center relative">
              <HeartBroken
                className="text-5xl text-white glitch-icon"
                data-icon="heart_broken"
              />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-white tracking-wider text-[28px] font-bold leading-tight px-8 text-center pb-2 pt-2 uppercase">
            File Not Recognized
          </h1>

          {/* Body */}
          <p className="text-white/80 text-lg font-normal leading-relaxed pb-8 pt-2 px-10 text-center">
            Our vibe-detectors are confused. We only speak{" "}
            <span className="text-error font-mono bg-error/10 px-1.5 py-0.5 rounded">
              .zip
            </span>{" "}
            and{" "}
            <span className="text-error font-mono bg-error/10 px-1.5 py-0.5 rounded">
              .txt
            </span>
            . <br className="hidden md:block" />
            Please upload a valid WhatsApp export to get your stats.
          </p>

          {/* Divider line */}
          <div className="w-full px-10 pb-4">
            <div className="w-full h-1 bg-linear-to-r from-transparent via-error/50 to-transparent opacity-50" />
          </div>

          {/* CTA button */}
          <div className="flex px-10 py-8 justify-center">
            <button className="w-full max-w-70 cursor-pointer flex items-center justify-center rounded-lg h-14 bg-error hover:bg-red-600 transition-all text-white text-lg font-bold shadow-[0_0_20px_rgba(242,13,13,0.3)]">
              Got it
            </button>
          </div>

          {/* Bottom accent stripe */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-error opacity-80" />
        </div>
      </div>
    </div>
  );
}
