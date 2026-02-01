"use client";

import { Share2 as Share } from "lucide-react";
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
import { useMemo } from "react";
import Hero from "@/components/dashboard/Hero";
import { HeroSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Extracted card components
// ---------------------------------------------------------------------------
import TopRowCards from "@/components/dashboard/components/TopRowCards";
import ChatMVP from "@/components/dashboard/components/ChatMVP";
import TheGhost from "@/components/dashboard/components/TheGhost";
import MonologueQueen from "@/components/dashboard/components/MonologueQueen";
import DailyRhythm from "@/components/dashboard/components/DailyRhythm";
import AchievementsCard from "@/components/dashboard/components/Achievements";
import PeakHoursCard from "@/components/dashboard/components/PeakHoursCard";
import SharedCulture from "@/components/dashboard/components/SharedCulture";
import AvgMessageLength from "@/components/dashboard/components/AvgMessageLength";
import GreatWallOfText from "@/components/dashboard/components/GreatWallOfText";
import ReplyLeaderboard from "@/components/dashboard/components/ReplyLeaderboard";
import EmojiVibe from "@/components/dashboard/components/EmojiVibe";
import WordCloud from "@/components/dashboard/components/WordCloud";
import WeeklyRhythm from "@/components/dashboard/components/WeeklyRhythm";
import VibeCheck from "@/components/dashboard/components/VibeCheck";

// ---------------------------------------------------------------------------
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
  // Chosen insight (deterministic selection from key_insights array)
  // ---------------------------------------------------------------------------
  const chosenInsight = useMemo(() => {
    const arr = summaryData?.key_insights;
    if (Array.isArray(arr) && arr.length > 0) {
      const seed = arr.join("|");
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) | 0;
      }
      return arr[Math.abs(hash) % arr.length];
    }
    return typeof arr === "string" ? arr : "Vibe Report";
  }, [summaryData?.key_insights]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-dashboard-bg text-white font-display overflow-x-hidden selection:bg-neon-green selection:text-dark-green">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* --------------------------------------------------------- HERO */}
        {summaryData ? (
          <Hero summaryData={summaryData} chosenInsight={chosenInsight} />
        ) : (
          <HeroSkeleton />
        )}

        {/* --------------------------------------------------------- MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-min">
          {/* Row 1 — Total Messages | Active Days | Chaos Level */}
          <TopRowCards summaryData={summaryData} />

          {/* Row 2 — Chat MVP (8) | The Ghost (4) */}
          <ChatMVP
            messageVolumeData={messageVolumeData}
            totalDays={summaryData?.total_days ?? 1}
          />
          <TheGhost responseTimeData={responseTimeData} />

          {/* Row 3 — Monologue Queen (4) | Daily Rhythm (4) | Achievements (4) */}
          <MonologueQueen monologuesData={monologuesData} />
          <DailyRhythm rolesData={rolesData} />
          <AchievementsCard achievementsData={achievementsData} />

          {/* Row 4 — Peak Hours heatmap (12) */}
          <PeakHoursCard peakHoursData={peakHoursData} />

          {/* Row 5 — Shared Culture (6) | Avg Message Length (6) */}
          <SharedCulture linksData={linksData} />
          <AvgMessageLength msgLengthData={msgLengthData} />

          {/* Row 6 — Great Wall of Text (8) | Reply Leaderboard (4) */}
          <GreatWallOfText longestMessage={msgLengthData?.longest_message} />
          <ReplyLeaderboard responseTimeData={responseTimeData} />

          {/* Row 7 — Emoji Vibe (6) | Word Cloud (6) */}
          <EmojiVibe emojiData={emojiData} />
          <WordCloud hasData={!!msgLengthData?.longest_message} />

          {/* Row 8 — Weekly Rhythm (12) */}
          <WeeklyRhythm weeklyData={weeklyData} />

          {/* Row 9 — Vibe Check Radar (12) */}
          <VibeCheck sentimentData={sentimentData} />
        </div>
        {/* end grid */}
      </main>

      {/* --------------------------------------------------------- SHARE FAB (mobile) */}
      <div className="fixed bottom-8 right-8 lg:hidden z-40">
        <button className="w-16 h-16 rounded-full bg-neon-green text-dark-green shadow-[0_0_30px_rgba(44,251,131,0.5)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
          <Share className="text-3xl font-bold" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
