import { z } from "zod";

export const registerSchema = z.object({
  employeeId: z
    .string()
    .min(1, "Employee ID is required"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
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
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, "Old password is required"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number"),
});