"use client";

import {
  Share2 as Share,
  Check,
  Flame as LocalFireDepartment,
  Upload as FileUpload,
  Gem as WorkspacePremium,
  Smile as Mood,
  Camera as PhotoCamera,
  Megaphone,
  Clock,
  Verified,
  Link2,
  BarChart2,
  Zap,
} from "lucide-react";
import HERO_BG from "@/public/assets/dashboard_hero_bg.png";
import { NextPage } from "next";
import {
  useGetAchievements,
  useGetConversationRoles,
  useGetDashboardSummary,
  useGetEmojiAnalysis,
  useGetLinkSharing,
  useGetMessageLength,
  useGetMessageVolume,
  useGetMonologues,
  useGetPeakHours,
  useGetResponseTime,
  useGetSentiment,
  useGetWeeklyActivity,
} from "@/hooks/useDashboard";
import { getCookie } from "cookies-next";
import { SESSION_ID_KEY } from "@/components/constants";
import { format, intervalToDuration } from "date-fns";
import { useMemo } from "react";

/* ---------------------------------------------------------------------------
   Heatmap data — each row is one day, each cell is one hour (24 cols).
   Values: 0-5 = intensity tiers mapped to opacity classes below.
--------------------------------------------------------------------------- */

const HEAT_CLASSES = [
  "bg-neon-green/5",
  "bg-neon-green/10",
  "bg-neon-green/20",
  "bg-teal-accent/30",
  "bg-neon-green/60",
  "bg-neon-green",
];

// Helper function to format minutes into human-readable time
const formatResponseTime = (minutes: number): string => {
  if (!minutes || minutes === 0) return "N/A";

  const duration = intervalToDuration({
    start: new Date(0),
    end: new Date(minutes * 60 * 1000),
  });

  if (duration.years && duration.years > 0)
    return `${duration.years} year${duration.years > 1 ? "s" : ""}`;
  if (duration.months && duration.months > 0)
    return `${duration.months} month${duration.months > 1 ? "s" : ""}`;
  if (duration.days && duration.days > 0)
    return `${duration.days} day${duration.days > 1 ? "s" : ""}`;
  if (duration.hours && duration.hours > 0)
    return `${duration.hours} hour${duration.hours > 1 ? "s" : ""}`;
  if (duration.minutes && duration.minutes > 0)
    return `${duration.minutes} minute${duration.minutes > 0 ? "s" : ""}`;

  return "< 1 minute";
};

const Dashboard: NextPage = () => {
  const sessionId = getCookie(SESSION_ID_KEY) as string;

  // ---------------------------------------------------------------------------
  // Data Fetching
  // ---------------------------------------------------------------------------
  const { data: summaryData } = useGetDashboardSummary(sessionId);
  const { data: messageVolumeData } = useGetMessageVolume(sessionId);
  const { data: responseTimeData } = useGetResponseTime(sessionId);
  const { data: peakHoursData } = useGetPeakHours(sessionId);
  const { data: weeklyData } = useGetWeeklyActivity(sessionId);
  const { data: sentimentData } = useGetSentiment(sessionId);
  const { data: emojiData } = useGetEmojiAnalysis(sessionId);
  const { data: msgLengthData } = useGetMessageLength(sessionId);
  const { data: linksData } = useGetLinkSharing(sessionId);
  const { data: achievementsData } = useGetAchievements(sessionId);
  const { data: rolesData } = useGetConversationRoles(sessionId);
  const { data: monologuesData } = useGetMonologues(sessionId);

  // ---------------------------------------------------------------------------
  // Logic: Chaos Level
  // ---------------------------------------------------------------------------
  const getChaosLevel = () => {
    const messagesPerDay = summaryData?.messages_per_day || 0;
    const participants = summaryData?.unique_participants || 1;
    const peakHour = summaryData?.peak_hour || 12;

    let messageScore = 0;
    if (messagesPerDay > 100) messageScore = 50;
    else if (messagesPerDay > 50) messageScore = 40;
    else if (messagesPerDay > 30) messageScore = 30;
    else if (messagesPerDay > 10) messageScore = 20;
    else messageScore = 10;

    let participantScore = 0;
    if (participants > 20) participantScore = 30;
    else if (participants > 10) participantScore = 20;
    else if (participants > 5) participantScore = 10;
    else participantScore = 5;

    let hourScore = 0;
    if (peakHour >= 0 && peakHour < 6) hourScore = 20;
    else if (peakHour >= 18 && peakHour < 24) hourScore = 15;
    else if (peakHour >= 6 && peakHour < 12) hourScore = 10;
    else hourScore = 5;

    const chaosPercentage = Math.min(
      Math.round(messageScore + participantScore + hourScore),
      100
    );

    let description = "";
    if (chaosPercentage >= 90) description = "Apocalyptic levels of chaos. 💀";
    else if (chaosPercentage >= 75)
      description = "Basically a dumpster fire. 🔥";
    else if (chaosPercentage >= 50)
      description = "Controlled chaos. Keep it up! ⚡️";
    else if (chaosPercentage >= 25) description = "Chill vibes only. 🌊";
    else description = "Is this chat even alive? 🦗";

    return { percentage: chaosPercentage, description };
  };

  const chaos = getChaosLevel();

  // ---------------------------------------------------------------------------
  // Logic: Heatmap
  // ---------------------------------------------------------------------------
  const heatmapRows = useMemo(() => {
    if (!peakHoursData?.data || peakHoursData.data.length === 0) {
      return [" "].map((day) => ({ day, cells: Array(24).fill(0) }));
    }

    const maxMessages = Math.max(
      ...peakHoursData.data.map((h) => h.messages),
      1
    );

    const getTier = (messages: number) => {
      if (messages === 0) return 0;
      const ratio = messages / maxMessages;
      if (ratio >= 0.8) return 5;
      if (ratio >= 0.6) return 4;
      if (ratio >= 0.4) return 3;
      if (ratio >= 0.2) return 2;
      return 1;
    };

    const hourlyTiers = Array(24)
      .fill(0)
      .map((_, hour) => {
        const hourData = peakHoursData.data.find((h) => h.hour === hour);
        return hourData ? getTier(hourData.messages) : 0;
      });

    return ["AVG"].map((day) => ({ day, cells: hourlyTiers }));
  }, [peakHoursData]);

  // ---------------------------------------------------------------------------
  // Logic: Weekly Rhythm Processing
  // ---------------------------------------------------------------------------
  const processedWeeklyRhythm = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const rawData = weeklyData?.data || [];
    const maxVal = Math.max(...rawData.map((d) => d.messages), 1);

    return days.map((dayName) => {
      const found = rawData.find((d) => d.day.startsWith(dayName));
      const count = found?.messages || 0;

      // Tailwind arbitrary values for opacity usually need explicit classes,
      // using style or mapped classes is safer. Mapping to closest HEAT_CLASSES for consistency.
      let colorClass = "bg-white/5";
      if (count > 0) {
        if (count > maxVal * 0.8)
          colorClass = "bg-neon-green shadow-[0_0_20px_rgba(44,251,131,0.3)]";
        else if (count > maxVal * 0.6) colorClass = "bg-neon-green/80";
        else if (count > maxVal * 0.4) colorClass = "bg-neon-green/40";
        else if (count > maxVal * 0.2) colorClass = "bg-teal-accent/30";
        else colorClass = "bg-neon-green/10";
      }

      return { day: dayName, colorClass, count };
    });
  }, [weeklyData]);

  // ---------------------------------------------------------------------------
  // Logic: Achievements Mapping
  // ---------------------------------------------------------------------------
  const processedAchievements = useMemo(() => {
    if (!achievementsData?.achievements) return [];

    // Flatten: Badge -> User, but only one per user
    const badgesFound: { title: string; winner: string; emoji: string }[] = [];

    // Helper to pick emoji based on badge name
    const getEmoji = (badge: string) => {
      const lower = badge.toLowerCase();
      return lower.split(" ")[0];
    };

    achievementsData.achievements.forEach((user) => {
      // Only take the first badge for each user to avoid duplicates
      if (user.badges.length > 0) {
        const badge = user.badges[0];
        badgesFound.push({
          title: badge.split(" ").slice(1).join(" "),
          winner: user.name,
          emoji: getEmoji(badge),
        });
      }
    });

    return badgesFound.slice(0, 4); // Show top 4
  }, [achievementsData]);

  // ---------------------------------------------------------------------------
  // Logic: Sentiment / Vibe Radar
  // ---------------------------------------------------------------------------
  const vibeStats = useMemo(() => {
    // Default stats
    let hype = 50,
      salty = 10,
      chill = 50;

    if (sentimentData?.data) {
      // Simple heuristic mapping based on available sentiment data
      // Assuming sentiment ranges -1 to 1 (or 0 to 100 from backend)
      const avg = sentimentData.average_sentiment || 0;

      // Map average sentiment (-1 to 1) to Hype/Salty/Chill
      // This is illustrative; adjust based on actual API range
      if (avg > 0.2) {
        hype = Math.min(50 + avg * 50, 100);
        chill = 60;
        salty = 10;
      } else if (avg < -0.2) {
        salty = Math.min(50 + Math.abs(avg) * 50, 100);
        hype = 20;
        chill = 30;
      } else {
        chill = 90;
        hype = 40;
        salty = 5;
      }
    }
    return {
      hype: Math.round(hype),
      salty: Math.round(salty),
      chill: Math.round(chill),
    };
  }, [sentimentData]);

  // ---------------------------------------------------------------------------
  const chosenInsight = useMemo(() => {
    const arr = summaryData?.key_insights;
    if (Array.isArray(arr) && arr.length > 0) {
      // Deterministic hash from the array content to avoid calling impure functions during render
      const seed = arr.join("|");
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) | 0;
      }
      const idx = Math.abs(hash) % arr.length;
      return arr[idx];
    }
    return typeof arr === "string" ? arr : "Vibe Report";
  }, [summaryData?.key_insights]);
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-dashboard-bg text-white font-display overflow-x-hidden selection:bg-neon-green selection:text-dark-green">
      {/* ================================================================= MAIN */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* --------------------------------------------------------- HERO */}
        <div className="relative w-full rounded-3xl overflow-hidden min-h-112.5 flex items-center justify-center p-8 text-center group neon-border-dashboard">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 group-hover:scale-105 opacity-40"
            style={{
              backgroundImage: `linear-gradient(rgba(4,13,8,0.8) 0%, rgba(4,13,8,0.6) 100%), url("${HERO_BG.src}")`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-dashboard-bg via-transparent to-transparent z-0" />
          <div className="relative z-10 flex flex-col items-center gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-green/10 backdrop-blur-md border border-neon-green/20 text-[10px] font-black uppercase tracking-[0.2em] text-neon-green mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              {summaryData?.start_date && summaryData?.end_date
                ? `${format(new Date(summaryData.start_date), "MMM d, yyyy")} – ${format(new Date(summaryData.end_date), "MMM d, yyyy")}`
                : "Vibe Report"}
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] neon-glow-text">
              {summaryData?.group_activity_label || ""}
            </h1>
            <p className="md:text-lg text-white/70 font-medium max-w-xl mt-4">
              {chosenInsight}
            </p>
            <div className="pt-8">
              <button className="flex items-center justify-center rounded-full h-14 px-10 bg-neon-green text-dark-green hover:scale-105 transition-all text-sm font-black uppercase tracking-widest gap-2 shadow-[0_0_30px_rgba(44,251,131,0.4)]">
                <Share className="text-xl" />
                Share Full Report
              </button>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------- GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-min">
          {/* ----- Total Messages (col 4) */}
          <div className="lg:col-span-4 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col justify-between h-full relative group transition-all hover:bg-dark-green">
            <button
              className="absolute top-6 right-6 text-white/30 hover:text-neon-green transition-colors opacity-0 group-hover:opacity-100"
              title="Snap this card"
            >
              <FileUpload />
            </button>
            <div className="flex flex-col gap-2">
              <p className="text-neon-green/60 text-xs font-black uppercase tracking-widest">
                Total Messages
              </p>
              <div className="flex items-end gap-3">
                <p className="text-5xl font-black tracking-tighter">
                  {(summaryData?.total_messages || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* ----- Active Days (col 4) */}
          <div className="lg:col-span-4 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col justify-between h-full relative group transition-all hover:bg-dark-green">
            <button
              className="absolute top-6 right-6 text-white/30 hover:text-neon-green transition-colors opacity-0 group-hover:opacity-100"
              title="Snap this card"
            >
              <FileUpload />
            </button>
            <div className="flex flex-col gap-2">
              <p className="text-neon-green/60 text-xs font-black uppercase tracking-widest">
                Active Days
              </p>
              <div className="flex items-end gap-3">
                <p className="text-5xl font-black tracking-tighter text-white">
                  {summaryData?.total_days || 0}
                </p>
                {(() => {
                  const startRaw = summaryData?.start_date;
                  const endRaw = summaryData?.end_date;
                  const active = summaryData?.total_days || 0;
                  let pct = 0;
                  if (startRaw && endRaw) {
                    const s = new Date(startRaw);
                    const e = new Date(endRaw);
                    if (!isNaN(s.getTime()) && !isNaN(e.getTime())) {
                      const msPerDay = 24 * 60 * 60 * 1000;
                      const totalDays =
                        Math.floor(
                          (new Date(e).getTime() - new Date(s).getTime()) /
                            msPerDay
                        ) + 1;
                      if (totalDays > 0)
                        pct = Math.min(
                          100,
                          Math.round((active / totalDays) * 100)
                        );
                    }
                  } else {
                    pct = active > 0 ? 100 : 0;
                  }
                  return (
                    <span className="text-neon-green text-xs font-black mb-1.5 flex items-center bg-neon-green/10 px-2 py-0.5 rounded">
                      <Check className="text-sm" /> {pct}%
                    </span>
                  );
                })()}
              </div>
            </div>
            <div className="mt-8 flex gap-1.5 h-1.5 w-full">
              {/* Decorative bars */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full ${i < 4 ? "bg-neon-green" : "bg-neon-green/20"}`}
                />
              ))}
            </div>
          </div>

          {/* ----- Chaos Level (col 4) */}
          <div className="lg:col-span-4 bg-linear-to-br from-neon-green to-teal-accent rounded-2xl p-8 shadow-[0_0_30px_rgba(44,251,131,0.2)] flex flex-col justify-between h-full relative group text-dark-green">
            <button
              className="absolute top-6 right-6 text-dark-green/40 hover:text-dark-green transition-colors opacity-0 group-hover:opacity-100"
              title="Snap this card"
            >
              <FileUpload />
            </button>
            <div className="flex flex-col gap-2">
              <p className="text-dark-green/60 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <LocalFireDepartment className="text-lg" />
                Chaos Level
              </p>
              <p className="text-6xl font-black tracking-tighter">
                {chaos.percentage}%
              </p>
            </div>
            <p className="text-xs font-black uppercase tracking-widest mt-4">
              {chaos.description}
            </p>
          </div>

          {/* ----- Chat MVP (col 8) */}
          <div className="lg:col-span-8 bg-card-bg rounded-2xl neon-border-dashboard overflow-hidden flex flex-col md:flex-row relative group">
            <div className="absolute top-6 right-6 z-20">
              <button className="flex items-center gap-2 bg-neon-green text-dark-green px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl">
                <PhotoCamera className="text-sm" />
                Snap MVP
              </button>
            </div>
            <div className="md:w-2/5 h-80 md:h-auto relative">
              <div
                className="absolute inset-0 bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lubmVyfGVufDB8fDB8fHww")',
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-dark-green via-dark-green/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-neon-green text-dark-green text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">
                  🏆 1st Place
                </span>
                <h3 className="text-white text-4xl font-black tracking-tighter leading-none">
                  {summaryData?.top_contributor?.name || "Loading..."}
                </h3>
                <p className="text-neon-green text-xs font-bold mt-1">
                  Most messages sent
                </p>
              </div>
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center gap-8 bg-dark-green/50">
              <div>
                <h2 className="text-3xl font-black tracking-tighter mb-2 flex items-center gap-3">
                  THE CHAT MVP
                  <WorkspacePremium className="text-neon-green text-2xl" />
                </h2>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                  Carried the conversation on their back.
                </p>
              </div>
              <div className="space-y-6">
                {/* 1st Place Bar */}
                {messageVolumeData?.data?.[0] && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                      <span>Messages Sent</span>
                      <span className="text-neon-green">
                        {messageVolumeData.data[0].messages.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2.5 p-0.5 border border-white/5">
                      <div className="bg-neon-green h-full rounded-full shadow-[0_0_10px_rgba(44,251,131,0.5)] w-full" />
                    </div>
                  </div>
                )}
                {/* 2nd Place Bar */}
                {messageVolumeData?.data?.[1] && (
                  <div className="space-y-3 opacity-60">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                      <span>{messageVolumeData.data[1].name} (2nd Place)</span>
                      <span>
                        {messageVolumeData.data[1].messages.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5">
                      <div className="bg-teal-accent/50 h-full rounded-full w-[30%]" />
                    </div>
                  </div>
                )}
                {/* 3rd Place Bar */}
                {messageVolumeData?.data?.[2] && (
                  <div className="space-y-3 opacity-40">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                      <span>{messageVolumeData.data[2].name} (3rd Place)</span>
                      <span>
                        {messageVolumeData.data[2].messages.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5">
                      <div className="bg-teal-accent/30 h-full rounded-full w-[15%]" />
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                {(() => {
                  const total = messageVolumeData?.data?.[0]?.messages ?? 0;
                  const days = Math.max(1, summaryData?.total_days ?? 1);
                  const avg = Math.round(total / days);
                  let comment = "";
                  if (avg === 0) comment = "Is this chat even alive? 🦗";
                  else if (avg <= 3) comment = "Super chill — minimal chatter.";
                  else if (avg <= 15) comment = "Steady vibes.";
                  else if (avg <= 50) comment = "Things are popping.";
                  else if (avg <= 200) comment = "Maybe go outside!";
                  else comment = "Absolute chaos! 🔥";
                  return (
                    <p className="italic text-white/80 text-sm leading-relaxed">
                      &quot;{total.toLocaleString()} messages sent. That&apos;s
                      roughly {avg.toLocaleString()} messages a day. {comment}
                      &quot;
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* ----- The Ghost (col 4) */}
          <div className="lg:col-span-4 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col relative group">
            <button
              className="absolute top-6 right-6 text-white/30 hover:text-neon-green transition-colors opacity-0 group-hover:opacity-100"
              title="Snap this card"
            >
              <FileUpload />
            </button>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-3xl shadow-inner">
                👻
              </div>
              <div>
                <h3 className="font-black text-xl tracking-tighter">
                  THE GHOST
                </h3>
                <p className="text-[10px] text-neon-green font-black uppercase tracking-[0.2em]">
                  Most Likely To Ignore You
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-center gap-4">
              <div className="w-24 h-24 rounded-full border-2 border-neon-green/20 p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${responseTimeData?.data[responseTimeData.data.length - 1]?.name}`}
                  height={240}
                  width={240}
                  alt="Ghost avatar"
                  className="w-full h-full rounded-full object-cover grayscale brightness-75"
                />
              </div>
              <div>
                <h4 className="text-2xl font-black tracking-tighter uppercase">
                  {/* Assuming last person in response time list is slowest */}
                  {responseTimeData?.data[responseTimeData.data.length - 1]
                    ?.name ?? "N/A"}
                </h4>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1 font-bold">
                  Avg response:{" "}
                  <span className="text-neon-green">
                    {formatResponseTime(
                      responseTimeData?.data[responseTimeData.data.length - 1]
                        ?.response_time ?? 0
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ===== MONOLOGUE QUEEN (col 4) ===== */}
          <div className="lg:col-span-4 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col justify-between relative group transition-all hover:bg-dark-green">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Megaphone className="text-neon-green text-4xl" />
                <span className="text-[10px] font-black text-neon-green uppercase tracking-widest bg-neon-green/10 px-2 py-1 rounded">
                  Yap God
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tighter">
                  THE MONOLOGUE QUEEN
                </h3>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                  Most consecutive messages
                </p>
              </div>
              <div className="flex items-center gap-4 py-4">
                <div className="w-16 h-16 rounded-full border-2 border-neon-green/30 p-1 bg-white/5 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=monologue-queen"
                    height={64}
                    width={64}
                    alt="Monologue Queen avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-3xl font-black text-white leading-none">
                    {monologuesData?.data?.[0]?.name || "N/A"}
                  </p>
                  <p className="text-neon-green font-bold text-sm">
                    {monologuesData?.data?.[0]?.consecutive_messages || 0}{" "}
                    Messages in a row
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/40 italic">
              &quot;She literally treats the group chat like her personal
              diary.&quot;
            </p>
          </div>

          {/* ===== DAILY RHYTHM (col 4) ===== */}
          <div className="lg:col-span-4 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col justify-between relative group transition-all hover:bg-dark-green">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black tracking-tighter uppercase">
                  Daily Rhythm
                </h3>
                <Clock className="text-teal-accent" />
              </div>
              <div className="space-y-6">
                {/* First message / Starters */}
                <div className="flex items-center gap-4">
                  <div className="text-center w-12">
                    <span className="text-xs font-black text-white/40 uppercase">
                      Start
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black uppercase text-neon-green mb-1">
                      The Initiators
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                        ☀️
                      </div>
                      <span className="font-bold">
                        {rolesData?.starters[0]?.name || "N/A"}
                      </span>
                      <span className="text-xs text-white/30">
                        {/* API returns count, not time. Showing count. */}
                        {rolesData?.starters[0]?.count ?? 0}x
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                        ☀️
                      </div>
                      <span className="font-bold">
                        {rolesData?.starters[1]?.name || "N/A"}
                      </span>
                      <span className="text-xs text-white/30">
                        {/* API returns count, not time. Showing count. */}
                        {rolesData?.starters[1]?.count ?? 0}x
                      </span>
                    </div>
                  </div>
                </div>
                {/* Last message / Enders */}
                <div className="flex items-center gap-4">
                  <div className="text-center w-12">
                    <span className="text-xs font-black text-white/40 uppercase">
                      End
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black uppercase text-teal-accent mb-1">
                      The Closer
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                        🌙
                      </div>
                      <span className="font-bold">
                        {rolesData?.enders[0].name || "N/A"}
                      </span>
                      <span className="text-xs text-white/30">
                        {rolesData?.enders[0].count ?? 0}x
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                        🌙
                      </div>
                      <span className="font-bold">
                        {rolesData?.enders[1].name || "N/A"}
                      </span>
                      <span className="text-xs text-white/30">
                        {rolesData?.enders[2].count ?? 0}x
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== ACHIEVEMENTS (col 4) ===== */}
          <div className="lg:col-span-4 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col relative overflow-hidden group">
            <h3 className="text-xl font-black tracking-tighter uppercase mb-6 flex items-center gap-2">
              <Verified className="text-neon-green" />
              Achievements
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {processedAchievements.length > 0 ? (
                processedAchievements.map((a, idx) => (
                  <div
                    key={`${a.title}-${idx}`}
                    className="bg-white/5 p-4 rounded-xl flex flex-col items-center text-center gap-2 hover:bg-neon-green/10 transition-colors cursor-default"
                  >
                    <span className="text-3xl">{a.emoji}</span>
                    <p className="text-[10px] font-black uppercase text-white tracking-widest wrap-break-word w-full">
                      {a.title}
                    </p>
                    <p className="text-[8px] font-bold text-neon-green uppercase">
                      {a.winner}
                    </p>
                  </div>
                ))
              ) : (
                <p className="col-span-2 text-center text-xs text-white/40 italic">
                  Not enough data for awards yet.
                </p>
              )}
            </div>
          </div>

          {/* ----- Peak Hours heatmap (col 12) */}
          <div className="lg:col-span-12 bg-card-bg rounded-2xl p-8 md:p-10 neon-border-dashboard relative group">
            <button className="absolute top-8 right-8 flex items-center gap-2 bg-white/5 hover:bg-neon-green hover:text-dark-green px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
              <PhotoCamera className="text-sm" />
              Snap Heatmap
            </button>
            <h2 className="text-3xl font-black tracking-tighter mb-2">
              PEAK HOURS
            </h2>
            <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
              When the chat is actually lit. 🔥
            </p>
            <div className="w-full overflow-x-auto pb-4">
              <div className="min-w-200 flex flex-col gap-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-14 mb-4">
                  <span>12 AM</span>
                  <span>6 AM</span>
                  <span>12 PM</span>
                  <span>6 PM</span>
                  <span>11 PM</span>
                </div>
                {heatmapRows.map((row) => (
                  <div key={row.day} className="flex gap-6 items-center">
                    <span className="w-8 text-[10px] font-black text-white/40 uppercase">
                      {row.day}
                    </span>
                    <div className="flex-1 grid grid-cols-24 gap-1.5 h-10">
                      {row.cells.map((tier, i) => {
                        return (
                          <div
                            key={i}
                            className={[
                              "rounded-sm",
                              HEAT_CLASSES[tier],
                              tier === 5
                                ? "shadow-[0_0_15px_rgba(44,251,131,0.5)]"
                                : "",
                            ].join(" ")}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== SHARED CULTURE (col 6) ===== */}
          <div className="lg:col-span-6 bg-card-bg rounded-2xl p-8 neon-border-dashboard relative group">
            <h3 className="text-xl font-black tracking-tighter uppercase mb-6 flex items-center gap-2">
              <Link2 className="text-neon-green" />
              Shared Culture
            </h3>
            <div className="space-y-4">
              {linksData?.data && linksData.data.length > 0 ? (
                linksData.data.slice(0, 4).map((item, idx) => {
                  const total = linksData.total_links || 1;
                  const pct = Math.round((item.links / total) * 100);
                  const color = idx === 0 ? "bg-neon-green" : "bg-teal-accent";

                  return (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center font-bold text-white/40 text-[10px] uppercase overflow-hidden">
                          {item.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase truncate max-w-37.5">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-white/40">
                            {item.links} links
                          </p>
                        </div>
                      </div>
                      <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${color} rounded-full`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-white/40 text-sm">No links found.</p>
              )}
            </div>
          </div>

          {/* ===== AVG MESSAGE LENGTH (col 6) ===== */}
          <div className="lg:col-span-6 bg-card-bg rounded-2xl p-8 neon-border-dashboard relative group">
            <h3 className="text-xl font-black tracking-tighter uppercase mb-8 flex items-center gap-2">
              <BarChart2 className="text-neon-green" />
              Average Message Length
            </h3>
            <div className="flex items-end justify-between h-32 gap-4">
              {msgLengthData?.data ? (
                msgLengthData.data.slice(0, 5).map((bar, idx) => {
                  const maxVal = Math.max(
                    ...msgLengthData.data.map((d) => d.avg_length)
                  );
                  const heightPct = Math.max(
                    (bar.avg_length / maxVal) * 100,
                    10
                  );
                  const color =
                    idx % 2 === 0 ? "bg-neon-green/40" : "bg-teal-accent/30";
                  const labelColor =
                    idx % 2 === 0 ? "text-neon-green" : "text-teal-accent";

                  return (
                    <div
                      key={bar.name}
                      className="flex flex-col justify-end gap-2 flex-1 group/bar h-full"
                    >
                      <div
                        className={`w-full ${color} hover:brightness-125 transition-all rounded-t relative`}
                        style={{ height: `${heightPct}%` }}
                      >
                        <div
                          className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold ${labelColor} opacity-50 group-hover/bar:opacity-100 transition-opacity uppercase`}
                        >
                          {Math.round(bar.avg_length)} word
                          {bar.avg_length !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-white/40 uppercase truncate max-w-12.5">
                        {bar.name}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p>Loading data...</p>
              )}
            </div>
          </div>

          {/* ===== GREAT WALL OF TEXT (col 8) ===== */}
          <div className="lg:col-span-8 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col md:flex-row gap-8 relative overflow-hidden group">
            <div className="md:w-1/2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[10px] font-black text-red-500 rounded uppercase tracking-widest">
                Record Broken
              </div>
              <h3 className="text-3xl font-black tracking-tighter leading-none">
                THE GREAT WALL OF TEXT
              </h3>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                Longest single message ever sent
              </p>
              <div className="pt-4">
                <div className="text-5xl font-black text-neon-green tracking-tighter">
                  {(
                    msgLengthData?.longest_message?.length || 0
                  ).toLocaleString()}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Characters in one go
                </p>
              </div>
            </div>
            <div className="md:w-1/2 bg-dark-green rounded-xl p-4 border border-white/5 relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden text-[8px] leading-tight font-mono text-neon-green whitespace-pre-wrap p-4">
                {msgLengthData?.longest_message?.preview || "Lorem ipsum..."}
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end">
                <p className="text-xs font-bold text-white/70 italic line-clamp-4">
                  &quot;{msgLengthData?.longest_message?.preview || "..."}&quot;
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msgLengthData?.longest_message?.author}`}
                      height={24}
                      width={24}
                      alt="Author avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase text-neon-green">
                    Sent by{" "}
                    {msgLengthData?.longest_message?.author || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== REPLY LEADERBOARD (col 4) ===== */}
          <div className="lg:col-span-4 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col relative group">
            <h3 className="text-xl font-black tracking-tighter uppercase mb-6 flex items-center gap-2">
              <Zap className="text-neon-green" />
              Reply Leaderboard
            </h3>
            <div className="space-y-4 flex-1">
              {responseTimeData?.data ? (
                responseTimeData.data.slice(0, 4).map((entry, idx) => {
                  const isTop = idx === 0;
                  const isLast = idx === 3;

                  return (
                    <div
                      key={entry.name}
                      className={[
                        "flex items-center justify-between p-3 rounded-lg",
                        isTop
                          ? "bg-neon-green/5 border border-neon-green/10"
                          : "bg-white/5",
                        isLast ? "opacity-60" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm font-black ${isTop ? "text-neon-green" : "text-white/40"}`}
                        >
                          #{idx + 1}
                        </span>
                        <span className="font-bold">{entry.name}</span>
                      </div>
                      {isTop ? (
                        <span className="text-[10px] font-black uppercase bg-neon-green text-dark-green px-2 py-0.5 rounded">
                          {formatResponseTime(entry.response_time)}
                        </span>
                      ) : (
                        <span className="text-[10px] font-black uppercase text-white/40">
                          {formatResponseTime(entry.response_time)}
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>

          {/* ----- Emoji Vibe (col 6) */}
          <div className="lg:col-span-6 bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col relative group">
            <h2 className="text-2xl font-black tracking-tighter mb-10 flex items-center gap-3">
              <Mood className="text-neon-green" />
              EMOJI VIBE
            </h2>
            <div className="flex items-end justify-center gap-8 h-56 mb-10">
              {emojiData?.top_emojis && emojiData.top_emojis.length >= 3 ? (
                <>
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center gap-3 w-20">
                    <span className="text-4xl">
                      {emojiData.top_emojis[1].emoji}
                    </span>
                    <div className="w-full bg-teal-accent/20 rounded-t-xl h-28 relative group-hover:bg-teal-accent/40 transition-colors border-t border-teal-accent/30">
                      <div className="absolute bottom-3 w-full text-center text-[10px] font-black uppercase text-teal-accent">
                        {emojiData.top_emojis[1].count}
                      </div>
                    </div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                      #2
                    </div>
                  </div>
                  {/* 1st Place */}
                  <div className="flex flex-col items-center gap-3 w-28">
                    <span className="text-7xl drop-shadow-[0_0_20px_rgba(44,251,131,0.4)]">
                      {emojiData.top_emojis[0].emoji}
                    </span>
                    <div className="w-full bg-neon-green rounded-t-xl h-40 relative shadow-[0_0_40px_rgba(44,251,131,0.3)]">
                      <div className="absolute bottom-3 w-full text-center text-xs font-black uppercase text-dark-green">
                        {emojiData.top_emojis[0].count}
                      </div>
                    </div>
                    <div className="text-xs font-black text-neon-green uppercase tracking-[0.2em] mt-1">
                      #1
                    </div>
                  </div>
                  {/* 3rd Place */}
                  <div className="flex flex-col items-center gap-3 w-20">
                    <span className="text-4xl">
                      {emojiData.top_emojis[2].emoji}
                    </span>
                    <div className="w-full bg-white/5 rounded-t-xl h-20 relative group-hover:bg-white/10 transition-colors border-t border-white/10">
                      <div className="absolute bottom-3 w-full text-center text-[10px] font-black uppercase text-white/40">
                        {emojiData.top_emojis[2].count}
                      </div>
                    </div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                      #3
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-white/40 self-center">
                  Not enough emoji data
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {emojiData?.top_emojis?.slice(3, 7).map((e) => (
                <span
                  key={e.emoji}
                  className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60"
                >
                  {e.emoji} {e.count}
                </span>
              ))}
            </div>
          </div>

          {/* ----- Word Cloud (col 6) */}
          <div className="lg:col-span-6 bg-black rounded-2xl p-8 shadow-2xl neon-border-dashboard flex flex-col relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-neon-green/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-accent/10 rounded-full blur-[100px] pointer-events-none" />
            <h2 className="text-2xl font-black tracking-tighter mb-6 z-10">
              WE SAY THIS A LOT...
            </h2>
            {/* Note: Word Cloud data is not available in provided hooks. Keeping static placeholder for visual completeness. */}
            <div className="flex-1 flex flex-wrap content-center justify-center gap-x-6 gap-y-4 relative z-10 p-6">
              <span className="text-5xl font-black text-neon-green -rotate-3 uppercase tracking-tighter neon-glow-text">
                BRUH
              </span>
              <span className="text-2xl font-bold text-white/80 uppercase tracking-widest">
                literally
              </span>
              <span className="text-3xl font-black text-white/40 uppercase">
                LMAO
              </span>
              <span className="text-6xl font-black text-white rotate-2 tracking-tighter uppercase">
                DEAD
              </span>
              <span className="text-xl font-bold text-teal-accent uppercase tracking-[0.2em]">
                gym?
              </span>
              <span className="text-4xl font-black text-white/20 uppercase tracking-tighter">
                bet
              </span>
              <span className="text-2xl font-medium text-white/60 uppercase">
                tonight
              </span>
            </div>
          </div>

          {/* ===== WEEKLY RHYTHM (col 12) ===== */}
          <div className="lg:col-span-12 bg-card-bg rounded-2xl p-8 md:p-10 neon-border-dashboard relative group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-black tracking-tighter">
                  WEEKLY RHYTHM
                </h2>
                <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
                  Group energy levels by day.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-white/40">
                  <div className="w-3 h-3 rounded-sm bg-neon-green/5 border border-white/10" />{" "}
                  Chill
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-white/40">
                  <div className="w-3 h-3 rounded-sm bg-neon-green" /> Chaotic
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {processedWeeklyRhythm.map((day) => (
                <div key={day.day} className="space-y-2 group/day">
                  <span className="block text-center text-[10px] font-black uppercase text-white/30">
                    {day.day}
                  </span>
                  <div
                    className={`h-24 rounded transition-all duration-500 relative ${day.colorClass}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/day:opacity-100 text-[10px] font-bold text-dark-green">
                      {day.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== VIBE CHECK RADAR (col 12) ===== */}
          <div className="lg:col-span-12 bg-black rounded-3xl p-10 neon-border-dashboard relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 bg-linear-to-br from-neon-green/5 to-teal-accent/5 pointer-events-none" />
            <div className="relative z-10 w-full max-w-2xl text-center space-y-12">
              <div>
                <h2 className="text-5xl font-black tracking-tighter uppercase mb-2">
                  VIBE CHECK
                </h2>
                <p className="text-white/50 text-xs font-black uppercase tracking-[0.3em]">
                  The overall mood profile of your group
                </p>
              </div>

              {/* Radar chart visual (Static SVG decoration, values below are dynamic) */}
              <div className="relative h-100 w-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-75 h-75 flex items-center justify-center border border-white/10 bg-white/5 clip-polygon" />
                </div>
                {/* Visual approximation - ideally this polygon points would differ based on props,
                    but simpler to just show the dynamic numbers below for this scope */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-75 h-75 drop-shadow-[0_0_25px_rgba(44,251,131,0.6)]"
                    viewBox="0 0 100 100"
                  >
                    <polygon
                      fill="rgba(44,251,131,0.4)"
                      stroke="#2cfb83"
                      strokeWidth="1"
                      points="50,10 95,45 80,90 20,85 5,40"
                    />
                  </svg>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-black uppercase text-neon-green tracking-widest">
                  Hype
                </div>
                <div className="absolute top-[40%] -right-2 text-sm font-black uppercase text-teal-accent tracking-widest">
                  Chill
                </div>
                <div className="absolute bottom-8 right-8 text-sm font-black uppercase text-white/60 tracking-widest">
                  Chaotic
                </div>
                <div className="absolute bottom-8 left-8 text-sm font-black uppercase text-red-500 tracking-widest">
                  Salty
                </div>
                <div className="absolute top-[40%] -left-2 text-sm font-black uppercase text-yellow-400 tracking-widest">
                  Wholesome
                </div>
              </div>

              {/* Dynamic Stats row */}
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-1">
                  <div className="text-4xl font-black">{vibeStats.hype}%</div>
                  <div className="text-[10px] font-black uppercase text-neon-green tracking-widest">
                    Hype Factor
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-black">{vibeStats.salty}%</div>
                  <div className="text-[10px] font-black uppercase text-red-500 tracking-widest">
                    Salty Levels
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-black">{vibeStats.chill}%</div>
                  <div className="text-[10px] font-black uppercase text-teal-accent tracking-widest">
                    Chill Index
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end grid */}
      </main>

      {/* --------------------------------------------------------- SHARE FAB */}
      <div className="fixed bottom-8 right-8 lg:hidden z-40">
        <button className="w-16 h-16 rounded-full bg-neon-green text-dark-green shadow-[0_0_30px_rgba(44,251,131,0.5)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
          <Share className="text-3xl font-bold" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
