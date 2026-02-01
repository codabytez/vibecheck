"use client";
import {
  ChevronDown,
  ShieldCheck,
  MessageSquare,
  CloudUpload,
  Brain,
  Star,
  Archive,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

const HowItWorks = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
    {
      id: "01",
      title: "Export Chat",
      desc: 'Open WhatsApp on your phone, go to settings, hit Export Chat (select "without media"), and grab that .zip file. It\'s the standard export feature you already have. Easy peasy.',
      icon: <MessageSquare className="w-10 h-10 md:w-12 md:h-12" />,
      visual: (
        <div className="w-full h-48 rounded-xl bg-accent-dark/50 border border-white/5 p-4 overflow-hidden">
          <div className="flex flex-col gap-3">
            <div className="h-8 w-2/3 bg-white/5 rounded" />
            <div className="h-8 w-1/2 bg-primary/10 rounded self-end" />
            <div className="h-8 w-3/4 bg-white/5 rounded" />
          </div>
        </div>
      ),
    },
    {
      id: "02",
      title: "Secure Upload",
      desc: "Drop your exported file into our secure zone. We don't peek at your content; we simply prepare it for the local analysis script to run inside your browser.",
      icon: <CloudUpload className="w-10 h-10 md:w-12 md:h-12" />,
      visual: (
        <div className="w-full h-48 rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-primary/40">
            <Archive className="w-12 h-12" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Drop chat_export.zip
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "03",
      title: "Local Analysis",
      desc: "The magic happens right on your device. Your data never leaves your browser. Privacy isn't just a vibe—it's the rule. Our AI processes patterns, not just words.",
      icon: <Brain className="w-10 h-10 md:w-12 md:h-12" />,
      isPulse: true,
      visual: (
        <div className="w-full h-48 rounded-xl bg-accent-dark border border-primary/20 p-6 flex flex-col justify-center gap-4">
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-2/3 shadow-[0_0_10px_rgba(148,244,52,1)]" />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-primary/60">
            <span>ANALYZING_SENTIMENT...</span>
            <span>67%</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-4/5 shadow-[0_0_10px_rgba(148,244,52,1)]" />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-primary/60">
            <span>CALCULATING_VIBE_COEFFICIENT...</span>
            <span>80%</span>
          </div>
        </div>
      ),
    },
    {
      id: "04",
      title: "Get Your Vibe",
      desc: "Behold! Your chat stats, roasting, and 'Spotify Wrapped' style cards ready to share. Discover who texts first and who leaves who on read.",
      icon: <Star className="w-10 h-10 md:w-12 md:h-12" />,
      visual: (
        <div className="w-full h-64 rounded-xl bg-linear-to-br from-primary to-[#4d6831] p-0.5 shadow-2xl overflow-hidden transition-transform">
          <div className="w-full h-full bg-background-dark rounded-[10px] p-6 flex flex-col items-center text-center">
            <div className="size-12 rounded-full bg-primary/20 mb-4 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-lg font-black italic tracking-tighter text-white">
              THE OVER-SHARER
            </h4>
            <p className="text-[10px] text-slate-500 mt-2">
              You&apos;ve sent 4,502 messages since January. Maybe give them a
              break?
            </p>
            <div className="mt-auto pt-4 flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="size-6 rounded-full bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const faqs = [
    {
      q: "Is my data safe?",
      a: "Absolutely. VibeCheck is built on a 'Privacy First' architecture. Your chat files never leave your browser. All analysis is performed locally on your device using client-side scripts.",
    },
    {
      q: "Which platforms are supported?",
      a: "Currently, we support full WhatsApp chat exports from both iOS and Android. We are working on adding support for other platforms soon.",
    },
    {
      q: "Can I export media?",
      a: "For the best experience, we recommend selecting 'Without Media'. We primarily analyze text patterns, frequency, and sentiment.",
    },
    {
      q: "Is this a subscription service?",
      a: "VibeCheck offers free basic insights. We have a 'Pro' one-time unlock for power users who want deep-dive sentiment analysis.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background-dark font-display text-white selection:bg-primary selection:text-background-dark">
      {/* Geometric Background Overlay (Using the dot pattern from your CSS) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(#364922 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            Our Process
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            How it <span className="text-primary">works</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            VibeCheck transforms your WhatsApp chat exports into beautiful,
            data-driven insights—without compromising your privacy.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 w-full">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2 hidden md:block" />

          <div className="flex flex-col gap-24">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="relative flex flex-col md:flex-row items-center justify-between gap-12 group"
              >
                <div
                  className={`w-full md:w-[45%] ${idx % 2 === 0 ? "md:order-1 md:text-right" : "md:order-3 text-left"}`}
                >
                  <span className="text-primary text-6xl font-black opacity-20 mb-2 block tracking-tighter">
                    {step.id}
                  </span>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>

                <div className="z-10 order-1 md:order-2 relative">
                  {step.isPulse && (
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                  )}
                  <div
                    className={`size-16 md:size-20 rounded-2xl border border-primary/30 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ${step.isPulse ? "bg-primary text-background-dark" : "bg-accent-dark text-primary"}`}
                  >
                    {step.icon}
                  </div>
                </div>

                <div
                  className={`w-full md:w-[45%] hidden md:block ${idx % 2 === 0 ? "order-3" : "order-1"}`}
                >
                  {step.visual}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Got <span className="text-primary">Questions?</span>
          </h2>
          <p className="text-slate-400 font-medium">
            Everything you need to know about the vibe.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="group">
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex items-center justify-between p-6 bg-accent-dark border border-primary/30 rounded-xl hover:border-primary/60 transition-colors"
              >
                <span className="text-lg md:text-xl font-extrabold tracking-tight text-left">
                  {faq.q}
                </span>

                <ChevronDown
                  className={`size-6 text-primary transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="p-6 bg-accent-dark rounded-b-xl border-x border-b border-primary/30 -mt-2">
                  <p className="text-slate-400 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-accent-dark border border-white/10 p-12 text-center relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 size-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Ready to see your vibe?
          </h2>
          <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto">
            Join 10,000+ users who have already roasted their group chats.
          </p>
          <button className="px-10 py-5 bg-primary text-background-dark font-extrabold rounded-xl text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(148,244,52,0.4)]">
            Analyze My Chat Now
          </button>
          <p className="mt-6 text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            100% Private. No data ever leaves your browser.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
