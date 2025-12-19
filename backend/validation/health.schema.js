import { z } from "zod";

export const createHealthRecordSchema = z.object({
  body: z.object({
    animalId: z.string(),
    date: z.string().min(1),
    type: z.enum([
      "ROUTINE_CHECKUP",
      "VACCINATION",
      "ILLNESS",
      "INJURY",
      "OTHER",
    ]),
    notes: z.string().min(3),
    medication: z.string().optional(),
    dosage: z.string().optional(),
    nextDueDate: z.string().optional(),
  }),
});
