import { z } from "zod";

export const registerSchema = z.object({
  employeeId: z.string(),

  email: z.string().email(),

  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "One uppercase letter required")
    .regex(/[a-z]/, "One lowercase letter required")
    .regex(/[0-9]/, "One number required")
    .regex(/[@$!%*?&]/, "One special character required"),

  role: z.enum([
    "admin",
    "hr",
    "manager",
    "employee"
  ])
});