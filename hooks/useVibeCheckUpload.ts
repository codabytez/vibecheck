import { API_BASE_URL } from "@/components/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useVibeCheckUpload() {
  return useMutation<UploadResponse, Error, File>({
    mutationFn: async (file: File): Promise<UploadResponse> => {
      const form = new FormData();
      form.append("file", file);

      const res = await axios.post<UploadResponse>(
        `${API_BASE_URL}/api/upload`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res.data;
    },
  });
}
