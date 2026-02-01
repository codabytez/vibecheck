import { intervalToDuration } from "date-fns";

// ---------------------------------------------------------------------------
// Format a raw minutes value into a human-readable duration string
// ---------------------------------------------------------------------------
export const formatResponseTime = (minutes: number): string => {
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
    return `${duration.minutes} minute${duration.minutes > 1 ? "s" : ""}`; // BUG FIX: was `> 0`

  return "< 1 minute";
};

// ---------------------------------------------------------------------------
// Chaos Level calculation
// ---------------------------------------------------------------------------
export interface ChaosLevel {
  percentage: number;
  description: string;
}

export const getChaosLevel = (
  summaryData:
    | {
        messages_per_day?: number;
        unique_participants?: number;
        peak_hour?: number;
      }
    | null
    | undefined
): ChaosLevel => {
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
  else if (chaosPercentage >= 75) description = "Basically a dumpster fire. 🔥";
  else if (chaosPercentage >= 50)
    description = "Controlled chaos. Keep it up! ⚡️";
  else if (chaosPercentage >= 25) description = "Chill vibes only. 🌊";
  else description = "Is this chat even alive? 🦗";

  return { percentage: chaosPercentage, description };
};
