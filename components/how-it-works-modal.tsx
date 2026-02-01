"use client";

import { useState, Fragment } from "react";
import {
  X as Close,
  Shield as ShieldLock,
  MessageCircle as ChatBubble,
  Share as IosShare,
  Paperclip as AttachFileOff,
} from "lucide-react";

function VibeWaveLogo() {
  return (
    <svg
      className="w-8 h-8"
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

// ---------------------------------------------------------------------------
// Per-platform step definitions — keeps the JSX clean and makes it trivial
// to add Android / Desktop content later.
// ---------------------------------------------------------------------------
const STEPS = {
  iOS: [
    {
      icon: ChatBubble,
      title: "Open Chat & Tap Name",
      body: "Open the WhatsApp chat you want to analyze and tap the contact or group name at the top.",
    },
    {
      icon: IosShare,
      title: "Select 'Export Chat'",
      body: "Scroll down to the bottom of the Contact Info page and tap the 'Export Chat' button.",
    },
    {
      icon: AttachFileOff,
      title: "Choose 'Without Media'",
      body: null, // uses custom JSX with the highlighted phrase
    },
  ],
  Android: [
    {
      icon: ChatBubble,
      title: "Open Chat & Tap Menu",
      body: "Open the WhatsApp chat you want to analyze and tap the three-dot menu in the top right.",
    },
    {
      icon: IosShare,
      title: "Select 'Export Chat'",
      body: "Tap 'Export Chat' from the dropdown menu that appears.",
    },
    {
      icon: AttachFileOff,
      title: "Choose 'Without Media'",
      body: null,
    },
  ],
  Desktop: [
    {
      icon: ChatBubble,
      title: "Open Chat on Desktop",
      body: "Open WhatsApp Web or the desktop app and navigate to the chat you want to analyze.",
    },
    {
      icon: IosShare,
      title: "Click the Chat Options",
      body: "Click the three-dot menu or chat info icon at the top of the conversation.",
    },
    {
      icon: AttachFileOff,
      title: "Export Without Media",
      body: null,
    },
  ],
} as const;

type Platform = keyof typeof STEPS;
const PLATFORMS: Platform[] = ["iOS", "Android", "Desktop"];

export default function HowItWorksPage() {
  const [active, setActive] = useState<Platform>("iOS");
  const steps = STEPS[active];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-dark font-display text-white">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-0" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-200 bg-background-dark border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        {/* --------------------------------------------------------- Header */}
        <header className="flex items-center justify-between border-b border-border-dark px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 text-primary">
              <VibeWaveLogo />
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">
              How to Export Your Chat
            </h2>
          </div>
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-white/5 hover:bg-white/10 text-white transition-colors">
            <Close />
          </button>
        </header>

        {/* ------------------------------------------------------- Privacy callout */}
        <div className="px-8 pt-6">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <ShieldLock className="text-primary" />
            <p className="text-white/60 text-sm font-medium">
              VibeCheck is privacy-first. Your chat data never leaves your
              device; processing happens locally in your browser.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------ Tabs */}
        <div className="px-8 mt-4">
          <div className="flex border-b border-border-dark gap-8">
            {PLATFORMS.map((platform) => (
              <button
                key={platform}
                onClick={() => setActive(platform)}
                className={[
                  "flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 transition-all text-sm font-bold tracking-wide",
                  active === platform
                    ? "border-b-primary text-white"
                    : "border-b-transparent text-white/60 hover:text-white",
                ].join(" ")}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------- Steps */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-[48px_1fr] gap-x-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;

              return (
                <Fragment key={i}>
                  {/* Icon column */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                      <Icon />
                    </div>
                    {!isLast && <div className="w-0.5 timeline-line h-12" />}
                  </div>

                  {/* Content column */}
                  <div className={`flex flex-col ${isLast ? "" : "pb-8"}`}>
                    <p className="text-white text-lg font-bold leading-tight">
                      {step.title}
                    </p>
                    {step.body ? (
                      <p className="text-white/60 text-base font-normal mt-1">
                        {step.body}
                      </p>
                    ) : (
                      /* Last step on every platform — shared "Without Media" copy */
                      <p className="text-white/60 text-base font-normal mt-1">
                        To keep things fast and private, always select{" "}
                        <span className="text-primary font-bold">
                          &apos;Without Media&apos;
                        </span>{" "}
                        when prompted.
                      </p>
                    )}
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* -------------------------------------------------------- Action panel */}
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl border border-border-dark bg-white/5 p-6">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <p className="text-white text-lg font-bold">Ready to analyze?</p>
              <p className="text-white/60 text-sm">
                Once you have your .zip or .txt file, simply drag it into the
                dashboard.
              </p>
            </div>
            <button className="w-full md:w-auto min-w-35 cursor-pointer inline-flex items-center justify-center rounded-lg h-12 px-8 bg-primary text-background-dark text-base font-bold transition-transform hover:scale-105 active:scale-95">
              Got it
            </button>
          </div>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-linear-to-tl from-primary/10 to-transparent pointer-events-none -z-10" />
      </div>
    </div>
  );
}
