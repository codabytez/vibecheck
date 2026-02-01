"use client";

import { SESSION_ID_KEY } from "@/components/constants";
import { useVibeCheckUpload } from "@/hooks/useVibeCheckUpload";
import { UploadCloud, Lock, Archive, FileText, Shield } from "lucide-react";
import { NextPage } from "next";
import { useState, useRef, useCallback } from "react";
import { Processing } from "./processing";
import { setCookie } from "cookies-next";
import SuccessModal from "./success-modal";

export const Upload: NextPage = () => {
  const [processing, setProcessing] = useState(false);
  const [, setFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [progress, setProgress] = useState(0);
  const [etaSeconds, setEtaSeconds] = useState(15);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { mutate, isError, data } = useVibeCheckUpload();

  // Simulate progress bar (you can replace this with backend-sent progress or SSE)
  const startFakeProgress = useCallback(() => {
    setProgress(0);
    setEtaSeconds(15);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) return 99;
        return prev + Math.random() * 4 + 1;
      });
      setEtaSeconds((eta) => Math.max(1, eta - 1));
    }, 1000);
  }, []);

  const handleFile = (file: File) => {
    setFile(file);
    setProcessing(true);
    startFakeProgress();
    mutate(file, {
      onSuccess: (data) => {
        // Will be handled via isSuccess, you may progress further here
        clearInterval(intervalRef.current!);
        setProgress(100);
        setEtaSeconds(0);
        setCookie(SESSION_ID_KEY, data?.session_id || "", {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        setShowSuccessModal(true);
        setProcessing(false);
      },
      onError: () => {
        clearInterval(intervalRef.current!);
      },
    });
  };

  // Drop handler
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  if (processing) {
    return (
      <Processing progress={progress} etaSeconds={etaSeconds} data={data} />
    );
  }

  if (isError) {
    // You can show error message here
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-white overflow-x-hidden">
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
              <Archive className="text-4xl text-primary/80" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Archive.zip
              </span>
            </div>
          </div>

          {/* Floating badge — chat.txt */}
          <div className="absolute -right-8 bottom-20 animate-float-delayed hidden lg:block pointer-events-none">
            <div className="bg-surface-dark border border-border-dark p-3 rounded-xl shadow-xl transform -rotate-6 flex flex-col items-center gap-1">
              <FileText className="text-4xl text-primary/80" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Chat.txt
              </span>
            </div>
          </div>

          {/* Drop-zone card */}
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="w-full max-w-3xl relative z-10"
          >
            <div className="group relative rounded-3xl border-2 border-dashed border-primary/20 hover:border-primary/60 bg-surface-dark/40 hover:bg-surface-dark/60 transition-all duration-300 ease-out cursor-pointer overflow-hidden neon-glow">
              {/* Hover fill overlay */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative flex flex-col items-center justify-center px-6 py-20 sm:py-24 text-center">
                {/* Upload icon with glow */}
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-primary blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                  <div className="relative bg-primary p-5 rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="text-4xl text-background-dark font-bold" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-3xl font-bold text-white mb-3">
                  Ready to vibe?
                </h3>
                <p className="text-slate-400 text-base mb-8">
                  Upload your .zip or .txt file and let the magic happen.
                </p>

                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".txt,.zip"
                  tabIndex={-1}
                />
                <button
                  type="button"
                  className="relative overflow-hidden bg-primary hover:bg-primary-hover text-background-dark font-bold py-4 px-12 rounded-full transition-all shadow-lg hover:shadow-primary/40 active:scale-95 text-lg pointer-events-none opacity-70"
                  disabled
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
        </div>

        {/* Privacy card */}
        <div className="mt-12 max-w-2xl w-full px-4">
          <div className="glass-effect rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left hover:scale-[1.01] transition-transform">
            <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="text-primary text-2xl" />
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

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        data={data}
      />
    </div>
  );
};
