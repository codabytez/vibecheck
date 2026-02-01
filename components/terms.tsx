"use client";
import { LAST_UPDATED } from "@/components/constants";
import React from "react";
import {
  FileText,
  ShieldCheck,
  UserCheck,
  Copyright,
  Gavel,
} from "lucide-react";

const TermsOfService = () => {
  const navItems = [
    {
      id: "acceptance",
      label: "Acceptance of Terms",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "privacy",
      label: "Privacy & Processing",
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: "conduct",
      label: "User Conduct",
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      id: "intellectual",
      label: "Intellectual Property",
      icon: <Copyright className="w-4 h-4" />,
    },
    {
      id: "disclaimers",
      label: "Disclaimers & Liability",
      icon: <Gavel className="w-4 h-4" />,
    },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 min-h-screen flex flex-col overflow-x-hidden">
      <main className="flex-1 flex justify-center py-10 px-6 md:px-20">
        <div className="max-w-300 w-full flex flex-col md:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-72 shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="flex flex-col mb-4">
                <h3 className="text-white text-lg font-bold">Contents</h3>
                <p className="text-primary/70 text-sm">
                  Last updated: {LAST_UPDATED}
                </p>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleScroll(e, item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                      index === 0
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-sm flex items-center">
                      {item.icon}
                    </span>
                    <span
                      className={`text-sm ${index === 0 ? "font-semibold" : "font-medium"}`}
                    >
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>
              <div className="mt-8 p-5 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white text-sm font-bold mb-2">
                  Need help?
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                  If you have any questions regarding these terms, please
                  contact our legal team.
                </p>
                <a
                  className="text-primary text-xs font-bold hover:underline"
                  href="mailto:legal@vibecheck.ai"
                >
                  legal@vibecheck.ai
                </a>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <article className="flex-1 max-w-200">
            {/* Page Heading */}
            <div className="mb-12">
              <h1 className="text-white text-5xl font-black tracking-tight mb-4">
                Terms of Service
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                Please read these terms carefully before using VibeCheck.
                We&apos;ve tried to keep them as clear and transparent as
                possible.
              </p>
            </div>

            <div className="space-y-12 pb-24">
              <Section id="acceptance" number="01" title="Acceptance of Terms">
                <p>
                  By accessing or using VibeCheck, you agree to be bound by
                  these Terms of Service and all applicable laws and
                  regulations. If you do not agree with any of these terms, you
                  are prohibited from using or accessing this tool.
                </p>
                <p>
                  VibeCheck provides analytics for WhatsApp chat exports. Our
                  service is designed to process your data locally on your
                  device to ensure maximum privacy. By uploading your chat
                  export, you acknowledge that you have the right to process the
                  messages contained within those exports.
                </p>
              </Section>

              <Section
                id="privacy"
                number="02"
                title="Data Privacy & Processing"
              >
                <p>
                  Your privacy is our core mission. VibeCheck operates on a{" "}
                  <span className="text-primary font-medium">
                    privacy-first architecture
                  </span>
                  . This means:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Processing occurs in your browser/locally whenever possible.
                  </li>
                  <li>
                    Raw chat logs are never stored on our permanent servers.
                  </li>
                  <li>
                    Aggregated &apos;Wrapped&apos; insights are transient and
                    only stored if you choose to &apos;Save&apos; or
                    &apos;Share&apos; them.
                  </li>
                </ul>
                <p>
                  We do not sell, rent, or trade your personal information or
                  chat data to third parties. For more detailed information,
                  please refer to our{" "}
                  <a className="text-primary hover:underline" href="#">
                    Privacy Policy
                  </a>
                  .
                </p>
              </Section>

              <Section id="conduct" number="03" title="User Conduct">
                <p>As a user of VibeCheck, you agree NOT to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Upload chat logs that you do not have permission to analyze.
                  </li>
                  <li>
                    Attempt to reverse-engineer our proprietary analysis
                    algorithms.
                  </li>
                  <li>
                    Use the insights generated to harass, stalk, or intimidate
                    other individuals.
                  </li>
                  <li>
                    Interfere with or disrupt the integrity or performance of
                    the service.
                  </li>
                </ul>
              </Section>

              <Section
                id="intellectual"
                number="04"
                title="Intellectual Property"
              >
                <p>
                  The VibeCheck name, logo, &quot;Wrapped&quot; style
                  visualization formats, and all underlying code and algorithms
                  are the exclusive property of VibeCheck AI. You are granted a
                  limited, non-exclusive, non-transferable license to use the
                  tool for personal, non-commercial purposes.
                </p>
                <p>
                  The insights generated from your chat data are yours. You own
                  the specific data visualizations created for your personal
                  exports, subject to your continued compliance with these
                  terms.
                </p>
              </Section>

              <Section
                id="disclaimers"
                number="05"
                title="Disclaimers & Liability"
              >
                <p>
                  VibeCheck is provided on an &quot;as is&quot; and &quot;as
                  available&quot; We We make no warranties, expressed or
                  implied, regarding the accuracy of the analytics or the
                  availability of the service.
                </p>
                <p>
                  In no event shall VibeCheck or its suppliers be liable for any
                  damages (including, without limitation, damages for loss of
                  data or profit) arising out of the use or inability to use our
                  materials, even if we have been notified orally or in writing
                  of the possibility of such damage.
                </p>
                <p>
                  We are not affiliated with, endorsed by, or sponsored by
                  WhatsApp or Meta Inc. Our tool is an independent analytics
                  platform.
                </p>
              </Section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

// Helper component for content sections
const Section = ({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="scroll-mt-28" id={id}>
    <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center size-8 rounded bg-primary text-background-dark font-bold text-sm">
        {number}
      </span>
      <h2 className="text-white text-2xl font-bold">{title}</h2>
    </div>
    <div className="space-y-4 text-gray-300 leading-relaxed">{children}</div>
  </section>
);

export default TermsOfService;
