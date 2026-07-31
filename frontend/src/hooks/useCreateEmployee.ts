import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEmployee } from "../services/employee.service";

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,

    onSuccess: () => {
      toast.success("Employee created successfully");

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },

    onError: () => {
      toast.error("Failed to create employee");
    },
  });
}