import { z } from "zod";

export const signUpSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 chars"),
    farmName: z.string().min(3).max(30),
  }),
});

export const signInSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
