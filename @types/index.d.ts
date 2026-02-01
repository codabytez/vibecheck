interface UploadResponse {
  success: boolean;
  message: string;
  session_id: string;
  total_messages: number;
  participants: number;
  date_range: {
    start: string;
    end: string;
  };
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: UploadResponse;
}

interface ProcessingProps {
  progress: number;
  etaSeconds: number;
  data?: UploadResponse;
}

interface DashboardSummaryResponse {
  start_date: string;
  end_date: string;
  total_messages: number;
  total_days: number;
  messages_per_day: number;
  unique_participants: number;
  top_contributor: {
    name: string;
    messages: number;
    percentage: number;
  };
  peak_hour: number;
  busiest_day: string;
}
