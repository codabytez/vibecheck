import { API_BASE_URL } from "@/components/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// ----------------------
// TypeScript Interfaces
// ----------------------
interface AuthorProps {
  name: string;
  messages: number;
}

interface AuthorResponseTimeProps {
  name: string;
  response_time: number;
}

interface ResponseTimeResponse {
  data: AuthorResponseTimeProps[];
  fastest_responder: string | null;
  average_response_time: number | null;
}

interface MessageVolumeResponse {
  data: AuthorProps[];
  total_messages: number;
  top_contributor: string | null;
}

interface DashboardSummaryResponse {
  start_date: string;
  end_date: string;
  total_messages: number;
  total_days: number;
  messages_per_day: number;
  unique_participants: number;
  top_contributor: Record<string, string>;
  peak_hour: number;
  busiest_day: string;
  group_activity_label: string;
  group_vibe_label: string;
  key_insights: string[];
}

interface SentimentItem {
  name: string;
  sentiment: number;
  category: string;
}
interface SentimentResponse {
  data: SentimentItem[];
  most_positive: string | null;
  average_sentiment: number;
}

interface HourlyItem {
  hour: number;
  messages: number;
}
interface HourlyResponse {
  data: HourlyItem[];
  peak_hour: number;
  peak_hour_label: string;
}

interface WeeklyItem {
  day: string;
  messages: number;
}
interface WeeklyResponse {
  data: WeeklyItem[];
  busiest_day: string;
  weekend_vs_weekday: Record<string, number>;
}

interface EmojiUserItem {
  name: string;
  emoji_count: number;
}
interface TopEmojiItem {
  emoji: string;
  count: number;
}
interface SignatureEmojiItem {
  name: string;
  emoji: string;
}
interface EmojiResponse {
  top_users: EmojiUserItem[];
  top_emojis: TopEmojiItem[];
  signature_emojis: SignatureEmojiItem[];
  total_emojis: number;
}

interface LeaderboardItem {
  rank: number;
  name: string;
  messages: number;
  percentage: number;
}
interface LeaderboardResponse {
  data: LeaderboardItem[];
}

interface MessageLengthItem {
  name: string;
  avg_length: number;
}
interface LongestMessage {
  author: string;
  length: number;
  preview: string;
}
interface MessageLengthResponse {
  data: MessageLengthItem[];
  longest_message: LongestMessage;
}

interface LinkItem {
  name: string;
  links: number;
}
interface LinkResponse {
  data: LinkItem[];
  total_links: number;
  top_sharer: string | null;
}

interface AchievementItem {
  name: string;
  badges: string[];
}
interface AchievementsResponse {
  achievements: AchievementItem[];
}

interface ConversationRoleItem {
  name: string;
  count: number;
}
interface ConversationRolesResponse {
  starters: ConversationRoleItem[];
  enders: ConversationRoleItem[];
  top_starter: string | null;
  top_ender: string | null;
}

interface MonologueItem {
  name: string;
  consecutive_messages: number;
}
interface MonologueResponse {
  data: MonologueItem[];
  top_monologuer: string | null;
}

// ---------------------------------------
// Hook: Summary
// ---------------------------------------
export const useGetDashboardSummary = (sessionId?: string) => {
  return useQuery<DashboardSummaryResponse, Error>({
    queryKey: ["dashboard-summary", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<DashboardSummaryResponse>(
        `${API_BASE_URL}/api/analysis/summary`,
        {
          params: { session_id: sessionId },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Message Volume
// ---------------------------------------
export const useGetMessageVolume = (sessionId?: string, limit: number = 10) => {
  return useQuery<MessageVolumeResponse, Error>({
    queryKey: ["message-volume", sessionId, limit],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<MessageVolumeResponse>(
        `${API_BASE_URL}/api/analysis/volume`,
        {
          params: { session_id: sessionId, limit },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Response Time
// ---------------------------------------
export const useGetResponseTime = (sessionId?: string, limit: number = 10) => {
  return useQuery<ResponseTimeResponse, Error>({
    queryKey: ["response-time", sessionId, limit],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<ResponseTimeResponse>(
        `${API_BASE_URL}/api/analysis/response-time`,
        {
          params: { session_id: sessionId, limit },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Peak Hours (Activity by Hour)
// ---------------------------------------
export const useGetPeakHours = (sessionId?: string) => {
  return useQuery<HourlyResponse, Error>({
    queryKey: ["peak-hours", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<HourlyResponse>(
        `${API_BASE_URL}/api/analysis/activity/hourly`,
        {
          params: { session_id: sessionId },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Weekly Activity
// ---------------------------------------
export const useGetWeeklyActivity = (sessionId?: string) => {
  return useQuery<WeeklyResponse, Error>({
    queryKey: ["weekly-activity", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<WeeklyResponse>(
        `${API_BASE_URL}/api/analysis/activity/weekly`,
        {
          params: { session_id: sessionId },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Sentiment
// ---------------------------------------
export const useGetSentiment = (sessionId?: string, limit: number = 10) => {
  return useQuery<SentimentResponse, Error>({
    queryKey: ["sentiment", sessionId, limit],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<SentimentResponse>(
        `${API_BASE_URL}/api/analysis/sentiment`,
        {
          params: { session_id: sessionId, limit },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Emoji Analysis
// ---------------------------------------
export const useGetEmojiAnalysis = (sessionId?: string, limit: number = 10) => {
  return useQuery<EmojiResponse, Error>({
    queryKey: ["emoji-analysis", sessionId, limit],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<EmojiResponse>(
        `${API_BASE_URL}/api/analysis/emojis`,
        {
          params: { session_id: sessionId, limit },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Leaderboard
// ---------------------------------------
export const useGetLeaderboard = (sessionId?: string, limit: number = 5) => {
  return useQuery<LeaderboardResponse, Error>({
    queryKey: ["leaderboard", sessionId, limit],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<LeaderboardResponse>(
        `${API_BASE_URL}/api/analysis/leaderboard`,
        {
          params: { session_id: sessionId, limit },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Message Length
// ---------------------------------------
export const useGetMessageLength = (sessionId?: string, limit: number = 10) => {
  return useQuery<MessageLengthResponse, Error>({
    queryKey: ["message-length", sessionId, limit],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<MessageLengthResponse>(
        `${API_BASE_URL}/api/analysis/message-length`,
        {
          params: { session_id: sessionId, limit },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Link Sharing
// ---------------------------------------
export const useGetLinkSharing = (sessionId?: string, limit: number = 10) => {
  return useQuery<LinkResponse, Error>({
    queryKey: ["link-sharing", sessionId, limit],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<LinkResponse>(
        `${API_BASE_URL}/api/analysis/links`,
        {
          params: { session_id: sessionId, limit },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Achievements
// ---------------------------------------
export const useGetAchievements = (sessionId?: string) => {
  return useQuery<AchievementsResponse, Error>({
    queryKey: ["achievements", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<AchievementsResponse>(
        `${API_BASE_URL}/api/analysis/achievements`,
        {
          params: { session_id: sessionId },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Conversation Roles (starters/enders)
// ---------------------------------------
export const useGetConversationRoles = (sessionId?: string) => {
  return useQuery<ConversationRolesResponse, Error>({
    queryKey: ["conversation-roles", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<ConversationRolesResponse>(
        `${API_BASE_URL}/api/analysis/conversation-roles`,
        {
          params: { session_id: sessionId },
        }
      );
      return res.data;
    },
  });
};
// ---------------------------------------
// Hook: Monologues
// ---------------------------------------
export const useGetMonologues = (sessionId?: string) => {
  return useQuery<MonologueResponse, Error>({
    queryKey: ["monologues", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.get<MonologueResponse>(
        `${API_BASE_URL}/api/analysis/monologues`,
        {
          params: { session_id: sessionId },
        }
      );
      return res.data;
    },
  });
};
