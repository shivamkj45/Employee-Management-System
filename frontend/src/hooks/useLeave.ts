import { useQuery } from "@tanstack/react-query";

import { getLeaveSummary,getAllLeaves } from "../api/leave.api";
import {
  approveLeave,
  rejectLeave,
} from "../api/leave.api";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

export const useLeaveSummary = () =>
  useQuery({
    queryKey: ["leave-summary"],
    queryFn: getLeaveSummary,
  });

export const useAllLeaves = () =>
  useQuery({
    queryKey: ["all-leaves"],
    queryFn: getAllLeaves,
  });

  export function useApproveLeave() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: approveLeave,

    onSuccess: () => {
      toast.success(
        "Leave Approved"
      );

      queryClient.invalidateQueries({
        queryKey: ["all-leaves"],
      });

      queryClient.invalidateQueries({
        queryKey: ["leave-summary"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Approval Failed"
      );
    },
  });
}

export function useRejectLeave() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: rejectLeave,

    onSuccess: () => {
      toast.success(
        "Leave Rejected"
      );

      queryClient.invalidateQueries({
        queryKey: ["all-leaves"],
      });

      queryClient.invalidateQueries({
        queryKey: ["leave-summary"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Rejection Failed"
      );
    },
  });
}