import { z } from "zod";

export const createTransactionSchema = z.object({
  body: z.object({
    type: z.enum(["INCOME", "EXPENSE"]),
    amount: z.number().positive(),
    date: z.string().or(z.date()).optional(),
    description: z.string().optional(),
    category: z.enum([
  "FEED",
  "MEDICINE",
  "EQUIPMENT",
  "SALES",
  "OTHER",
]).optional(),

  }),
});
