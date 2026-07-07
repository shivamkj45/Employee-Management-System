import { z } from "zod";

export const checkInSchema = z.object({
  employee: z.string().min(1, "Employee ID is required"),

  remarks: z.string().optional(),
});