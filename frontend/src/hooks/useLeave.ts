import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getLeaveSummary,
  getAllLeaves,
  approveLeave,
  rejectLeave,
} from "../api/leave.api";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      leaveId,
      remarks,
    }: {
      leaveId: string;
      remarks: string;
    }) => approveLeave(leaveId, remarks),

    onSuccess: () => {
      toast.success("Leave Approved");

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      leaveId,
      remarks,
    }: {
      leaveId: string;
      remarks: string;
    }) => rejectLeave(leaveId, remarks),

    onSuccess: () => {
      toast.success("Leave Rejected");

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