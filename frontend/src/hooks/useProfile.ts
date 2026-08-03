import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getMyProfile,
  updateMyProfile,
  getProfileStats,
  getProfileActivity,
  getProfileCompletion,
} from "../api/profile.api";

/* ===============================
   MY PROFILE
================================ */

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getMyProfile,
  });
}

/* ===============================
   PROFILE STATS
================================ */

export function useProfileStats() {
  return useQuery({
    queryKey: ["profile-stats"],
    queryFn: getProfileStats,
  });
}

/* ===============================
   PROFILE ACTIVITY
================================ */

export function useProfileActivity() {
  return useQuery({
    queryKey: ["profile-activity"],
    queryFn: getProfileActivity,
  });
}

/* ===============================
   PROFILE COMPLETION
================================ */

export function useProfileCompletion() {
  return useQuery({
    queryKey: ["profile-completion"],
    queryFn: getProfileCompletion,
  });
}

/* ===============================
   UPDATE PROFILE
================================ */

export function useUpdateProfile() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: updateMyProfile,

    onSuccess: () => {

      toast.success(
        "Profile updated successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile-stats"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile-completion"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile-activity"],
      });

    },

  });

}