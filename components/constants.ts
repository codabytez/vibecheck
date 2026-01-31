export const ROUTES = {
  HOME: "/",
  UPLOAD: "/upload",
  ANALYSE: "/upload/analyse",
};

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
