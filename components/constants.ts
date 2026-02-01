export const ROUTES = {
  HOME: "/",
  HOW_IT_WORKS: "/how-it-works",
  PRIVACY_POLICY: "/privacy",
  TERMS_OF_SERVICE: "/terms",
  UPLOAD: "/upload",
  DASHBOARD: "/dashboard",
};

export const LAST_UPDATED = "Feb 01, 2026";
export const MAX_FILE_SIZE_MB = 100; // 100 MB
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const ALLOWED_FILE_TYPES = [".zip", ".txt"];

export const ANALYSIS_STEPS = [
  "Upload your WhatsApp chat export",
  "VibeCheck analyzes your chats on-device",
  "Receive beautiful insights and visualizations",
];

export const DEMO_FILE_URL = "/demo/whatsapp_chat_export.zip";
export const DEMO_FILE_NAME = "whatsapp_chat_export.zip";
export const SESSION_ID_KEY = "vibecheck_session_id";

export const VIBE_CHECK_VERSION = "1.0.0";
export const VIBE_CHECK_RELEASE_DATE = "2023-10-01";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
