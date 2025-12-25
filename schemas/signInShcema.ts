import * as z from "zod";

export const signInSchema = z.object({
  identifier: z
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .max(255, "Email must be at most 255 characters long"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
});
