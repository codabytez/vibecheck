"use client";

import { Lock, ArrowRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { differenceInDays } from "date-fns";

const VIBE_CARD_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCFu7FJ50Z_41z0qyYXzwXSsxrFYCmgSr0uGCIWosimBiyKKq-l8lNc7Ee-7N-1xXn1cAYwxCTBhxU_-MHq8Mxrg8ql79xfgzRPk-AESHXh09NWCJCz-6-EWKHA3YhmrXMzWIHjQgo55MjDg_lscArK0RXW73xXaxAl1RISBXtMgnUzItgep1nIpVFdELaJQAT_H9Pfra4BgpD57Wq7_CQ2XrvgwWTttNyYIqHUOut8UwdLPxpDk3SqNIaeC3kx8ude9thHZZ6hDMQ";

/* Inline SVG kept faithful to the source — it's a bespoke wave/blob mark
   that no Material Symbol can replicate.  Coloured via currentColor so it
   inherits whatever text-* class sits on the parent. */

export default function SuccessModal({
  isOpen,
  onClose,
  data,
}: SuccessModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleViewReport = () => {
    router.push("/dashboard");
  };

  const totalDays = data
    ? differenceInDays(
        new Date(data.date_range.end),
        new Date(data.date_range.start)
      ) + 1
    : 0;

  // Calculate vibe name based on chaos level
  //   const calculateVibeName = () => {
  //     if (!data) return "The Mysterious Chat";

  //     const messagesPerDay = data.messages_per_day;
  //     const participants = data.unique_participants;
  //     const peakHour = data.peak_hour;

  //     let messageScore = 0;
  //     if (messagesPerDay > 100) messageScore = 50;
  //     else if (messagesPerDay > 50) messageScore = 40;
  //     else if (messagesPerDay > 30) messageScore = 30;
  //     else if (messagesPerDay > 10) messageScore = 20;
  //     else messageScore = 10;

  //     let participantScore = 0;
  //     if (participants > 20) participantScore = 30;
  //     else if (participants > 10) participantScore = 20;
  //     else if (participants > 5) participantScore = 10;
  //     else participantScore = 5;

  //     let hourScore = 0;
  //     if (peakHour >= 0 && peakHour < 6) hourScore = 20;
  //     else if (peakHour >= 18 && peakHour < 24) hourScore = 15;
  //     else if (peakHour >= 6 && peakHour < 12) hourScore = 10;
  //     else hourScore = 5;

  //     const chaosPercentage = Math.min(
  //       Math.round(messageScore + participantScore + hourScore),
  //       100
  //     );

  //     if (chaosPercentage >= 90) return "The Apocalyptic Crew";
  //     if (chaosPercentage >= 75) return "The Dumpster Fire Squad";
  //     if (chaosPercentage >= 50) return "The Chaos Crew";
  //     if (chaosPercentage >= 25) return "The Chill Collective";
  //     return "The Silent Circle";
  //   };

  //   const vibeName = calculateVibeName();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative w-full max-w-160 vibe-gradient-bg border border-primary/20 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Confetti dot overlay */}
        <div className="absolute inset-0 confetti-pattern pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative p-8 md:p-12 flex flex-col items-center text-center">
          {/* Success icon */}
          <div className="mb-6 h-20 w-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-in scale-in duration-300">
            <Star className="text-background-dark text-4xl font-bold" />
          </div>

          {/* Headline */}
          <h1 className="text-primary tracking-tight text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-sm">
            Vibe Check Complete!
          </h1>

          {/* Body */}
          <p className="text-white/80 text-lg font-medium leading-relaxed mb-8 max-w-md">
            {data ? (
              <>
                {data.total_messages.toLocaleString()} messages analyzed from
                the last {totalDays} days. Your digital fingerprint is ready.
              </>
            ) : (
              "Your digital fingerprint is ready."
            )}
          </p>

          {/* Vibe name card */}
          <div className="w-full max-w-xs mb-10 group cursor-default">
            <div className="bg-background-dark/80 backdrop-blur-md border border-primary/30 rounded-lg p-1 transition-all group-hover:border-primary">
              <div
                className="flex flex-col items-stretch justify-end rounded-lg min-h-40 relative overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url("${VIBE_CARD_BG}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex w-full flex-col items-center gap-1 p-6 relative z-10">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/20 px-3 py-1 rounded-full mb-1">
                    Your Vibe
                  </span>
                  <p className="text-white tracking-tight text-3xl font-extrabold leading-tight">
                    {/* {vibeName} */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <button
              onClick={handleViewReport}
              className="group flex items-center justify-center gap-3 w-full cursor-pointer overflow-hidden rounded-full h-14 px-8 bg-primary text-background-dark text-lg font-extrabold leading-normal tracking-[0.015em] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all active:scale-95"
            >
              <span>View Your Report</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="text-white/60 hover:text-white text-sm font-bold transition-colors py-2">
              Share to Instagram
            </button>
          </div>

          {/* Privacy note */}
          <div className="mt-8 flex items-center gap-2 text-white/40">
            <Lock className="text-sm" />
            <span className="text-xs">
              End-to-end encrypted. Data never leaves your device.
            </span>
          </div>
        </div>

        {/* Floating accent dots */}
        <div className="absolute top-4 left-4 h-3 w-3 rounded-full bg-primary/40 animate-pulse" />
        <div className="absolute bottom-12 right-12 h-2 w-2 rounded-full bg-primary/60" />
        <div className="absolute top-1/2 left-8 h-1.5 w-1.5 rounded-full bg-primary/30" />
      </div>
    </div>
  );
}
