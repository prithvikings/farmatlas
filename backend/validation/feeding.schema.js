import { z } from "zod";

export const createFeedingLogSchema = z.object({
  body: z.object({
    animalId: z.string().min(1),
    dateTime: z.coerce.date(),
    foodType: z.string().min(1),
    quantity: z.coerce.number().positive(),
    unit: z.string().min(1),
    notes: z.string().optional(),
  }),
});
