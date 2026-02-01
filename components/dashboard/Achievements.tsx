"use client";

import { useMemo } from "react";
import { Verified } from "lucide-react";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface AchievementUser {
  name: string;
  badges: string[];
}

interface AchievementsData {
  achievements: AchievementUser[];
}

interface AchievementsCardProps {
  achievementsData: AchievementsData | null | undefined;
}

// ---------------------------------------------------------------------------
export default function AchievementsCard({
  achievementsData,
}: AchievementsCardProps) {
  const processedAchievements = useMemo(() => {
    if (!achievementsData?.achievements) return [];

    const badgesFound: { title: string; winner: string; emoji: string }[] = [];

    achievementsData.achievements.forEach((user) => {
      if (user.badges.length > 0) {
        const badge = user.badges[0];
        badgesFound.push({
          title: badge.split(" ").slice(1).join(" "),
          winner: user.name,
          emoji: badge.split(" ")[0], // first token is the emoji
        });
      }
    });

    return badgesFound.slice(0, 4); // Show top 4
  }, [achievementsData]);

  if (processedAchievements.length === 0)
    return (
      <div className="lg:col-span-4">
        <CardSkeleton />
      </div>
    );

  return (
    <div className="lg:col-span-4">
      <div className="bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col relative overflow-hidden group">
        <h3 className="text-xl font-black tracking-tighter uppercase mb-6 flex items-center gap-2">
          <Verified className="text-neon-green" />
          Achievements
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {processedAchievements.map((a, idx) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
