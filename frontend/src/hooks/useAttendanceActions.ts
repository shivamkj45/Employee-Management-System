import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  checkIn,
  checkOut,
} from "../services/attendance.service";

export function useCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkIn,

    onSuccess: () => {
      toast.success("Checked in successfully");

      queryClient.invalidateQueries({
        queryKey: ["today-attendance"],
      });

      queryClient.invalidateQueries({
        queryKey: ["attendance-trend"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Check-in failed"
      );
    },
  });
}

export function useCheckOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkOut,

    onSuccess: () => {
      toast.success("Checked out successfully");

      queryClient.invalidateQueries({
        queryKey: ["today-attendance"],
      });

      queryClient.invalidateQueries({
        queryKey: ["attendance-trend"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Check-out failed"
      );
    },
  });
}