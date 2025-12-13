import { z } from "zod";

export const createFeedingLogSchema = z.object({
  body: z.object({
    animalId: z.string(),
    dateTime: z.union([
  z.string().transform((val) => new Date(val)),
  z.date(),
]),

    foodType: z.string().min(1),
    quantity: z.number().positive(),
    unit: z.string().min(1),
    notes: z.string().optional(),
  }),
});
