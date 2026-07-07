import { z } from "zod";

export const applyLeaveSchema = z.object({

  employee: z.string(),

  leaveType: z.enum([
    "Casual",
    "Sick",
    "Earned",
    "Maternity",
    "Paternity",
  ]),

  startDate: z.string(),

  endDate: z.string(),

  reason: z.string().min(5),
});