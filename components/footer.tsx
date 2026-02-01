import { NextPage } from "next";
import { ROUTES, VIBE_CHECK_VERSION } from "./constants";

export const Footer: NextPage = () => {
  return (
    <footer className="w-full py-8 pb-18 border-t border-border-dark">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <a
            className="hover:text-primary transition-colors"
            href={ROUTES.TERMS_OF_SERVICE}
          >
            Terms of Service
          </a>
          <span className="w-1 h-1 rounded-full bg-border-dark" />
          <a
            className="hover:text-primary transition-colors"
            href={ROUTES.PRIVACY_POLICY}
          >
            Privacy Policy
          </a>
        </div>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
          Generated with ⚡️ by VibeCheck.{" "}
          <a
            className="text-neon-green hover:underline decoration-2 underline-offset-4"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Star us on GitHub
          </a>
        </p>
        <p className="text-xs text-slate-600">
          VibeCheck v{VIBE_CHECK_VERSION} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
