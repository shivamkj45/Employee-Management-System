import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { uploadProfileImage } from "../services/upload.service";

export function useUploadProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      file,
    }: {
      id: string;
      file: File;
    }) => uploadProfileImage(id, file),

    onSuccess: (_, variables) => {
      toast.success("Profile image updated");

      queryClient.invalidateQueries({
        queryKey: ["employee", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },

    onError: () => {
      toast.error("Image upload failed");
    },
  });
}