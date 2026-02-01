"use client";

import React, { useState } from "react";
import {
  CloudOff,
  ShieldCheck,
  Settings,
  BarChart2,
  UserMinus,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "./constants";

const PrivacyPolicy = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Local Processing");

  const tabs = [
    "Local Processing",
    "Data Integrity",
    "Security",
    "User Rights",
  ];

  const pillars = [
    {
      icon: <CloudOff className="w-8 h-8 text-primary" />,
      title: "No Data Uploaded",
      description:
        "All chat analysis happens locally in your browser. We never see your messages because they are never sent to a server.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "No Personal Info",
      description:
        "We don't collect phone numbers, contact names, or identities. Your analytics are for your eyes only.",
    },
    {
      icon: <Settings className="w-8 h-8 text-primary" />,
      title: "Your Data Control",
      description:
        "You decide when to clear your dashboard. It stays on your machine, encrypted and private, until you say otherwise.",
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden min-h-screen">
      <div className="relative flex h-auto w-full flex-col">
        <div className="lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-240 flex-1">
            {/* Hero Section */}
            <div className="mt-4">
              <div
                className="flex min-h-105 flex-col gap-6 bg-cover bg-center rounded-xl items-center justify-center p-6 border border-primary/10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(16, 34, 28, 0.8) 0%, rgba(16, 34, 28, 0.95) 100%), url("https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop")',
                }}
              >
                <div className="flex flex-col gap-3 text-center max-w-2xl">
                  <div className="flex justify-center mb-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest rounded-full border border-primary/30">
                      Trusted Analytics
                    </span>
                  </div>
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
                    Privacy First, <span className="text-primary">Always.</span>
                  </h1>
                  <h2 className="text-slate-300 text-sm md:text-lg font-normal leading-relaxed">
                    VibeCheck is built on the foundation of local-only
                    processing. Your personal chats never leave your browser,
                    ensuring total confidentiality of your memories.
                  </h2>
                </div>
                <div className="flex gap-4">
                  <button
                    className="flex min-w-35 cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-primary text-background-dark text-base font-bold transition-all hover:shadow-[0_0_20px_rgba(11,218,149,0.3)]"
                    onClick={() => router.push(ROUTES.UPLOAD)}
                  >
                    Get Started
                  </button>
                  {/* <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-white/10 text-white text-base font-bold border border-white/20 hover:bg-white/20 transition-all">
                    Our Tech Stack
                  </button> */}
                </div>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 px-4">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex flex-1 gap-4 rounded-xl border border-slate-200 dark:border-[#316856] bg-white dark:bg-[#18342b] p-6 flex-col transition-all hover:-translate-y-1"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary">
                    {pillar.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                      {pillar.title}
                    </h2>
                    <p className="text-slate-600 dark:text-[#90cbb7] text-sm font-normal leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Policy */}
            <div className="bg-white dark:bg-transparent rounded-xl p-4 md:p-8">
              <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight pb-6 border-b border-slate-200 dark:border-[#316856]">
                Detailed Privacy Framework
              </h2>

              <div className="py-6 overflow-x-auto">
                <div className="flex border-b border-slate-200 dark:border-[#316856] gap-8 min-w-max">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex flex-col items-center border-b-[3px] pb-3.25 pt-4 transition-all ${
                        activeTab === tab
                          ? "border-b-primary text-slate-900 dark:text-white"
                          : "border-b-transparent text-slate-500 dark:text-[#90cbb7] hover:text-primary"
                      }`}
                    >
                      <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                        {tab}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-8 text-slate-700 dark:text-[#90cbb7] max-w-3xl">
                <section>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
                    <BarChart2 className="text-primary w-5 h-5" />
                    How We Process Your Data
                  </h3>
                  <p className="leading-relaxed mb-4">
                    At VibeCheck, we utilize a revolutionary{" "}
                    <strong>Edge-Processing Architecture</strong>. When you
                    upload your WhatsApp export file, our application uses
                    client-side JavaScript to parse and analyze the text
                    strings. This means the actual &quot;reading&quot; of your
                    chats happens inside your browser&apos;s memory, which is
                    isolated from our servers.
                  </p>
                  <p className="leading-relaxed">
                    Once the analysis is complete, the results are displayed on
                    your screen. At no point during this process are the raw
                    chat logs transmitted to any external server.
                  </p>
                </section>

                <section>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
                    <UserMinus className="text-primary w-5 h-5" />
                    Non-Collection of Personal Identifiers
                  </h3>
                  <p className="leading-relaxed mb-4">
                    We believe you shouldn&apos;t have to give up your identity
                    for insights. VibeCheck does not require:
                  </p>
                  <ul className="list-none space-y-3 ml-2">
                    {[
                      "User Account Registration or Email verification",
                      "Phone Number association",
                      "Social Media Linking",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="text-primary text-sm mt-1 w-4 h-4" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 mb-10 border-t border-slate-200 dark:border-[#316856] pt-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-1 text-center md:text-left">
                  <p className="text-slate-900 dark:text-white font-bold">
                    Have privacy questions?
                  </p>
                  <p className="text-slate-500 dark:text-[#90cbb7] text-sm">
                    Our security team is ready to help you understand our tech.
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    className="flex items-center justify-center rounded-lg h-10 px-6 bg-white dark:bg-[#18342b] text-slate-900 dark:text-white border border-slate-200 dark:border-[#316856] text-sm font-bold hover:bg-slate-50 dark:hover:bg-[#22493c] transition-all"
                    href="mailto:chidiobinna0001@gmail.com"
                  >
                    Contact Security
                  </a>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-background-dark text-sm font-bold transition-all"
                  >
                    Back to Top
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
