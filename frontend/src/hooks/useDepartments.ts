import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getDepartments,
  getDepartmentStats,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  restoreDepartment,
} from "../api/department.api";

/* ===========================
   GET ALL DEPARTMENTS
=========================== */

export function useDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });
}

/* ===========================
   DEPARTMENT STATS
=========================== */

export function useDepartmentStats() {
  return useQuery({
    queryKey: ["department-stats"],
    queryFn: getDepartmentStats,
  });
}

/* ===========================
   CREATE
=========================== */

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,

    onSuccess: () => {
      toast.success("Department created successfully");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["department-stats"],
      });
    },
  });
}

/* ===========================
   UPDATE
=========================== */

export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) => updateDepartment(id, data),

    onSuccess: () => {
      toast.success("Department updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["department-stats"],
      });
    },
  });
}

/* ===========================
   DELETE
=========================== */

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,

    onSuccess: () => {
      toast.success("Department deactivated");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["department-stats"],
      });
    },
  });
}

/* ===========================
   RESTORE
=========================== */

export function useRestoreDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreDepartment,

    onSuccess: () => {
      toast.success("Department restored");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["department-stats"],
      });
    },
  });
}