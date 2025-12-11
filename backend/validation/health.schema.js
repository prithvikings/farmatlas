import { z } from "zod";

export const createHealthRecordSchema = z.object({
  body: z.object({
    animalId: z.string(),
    date: z.string().or(z.date()),
    type: z.enum(["Routine Checkup", "Vaccination", "Surgery", "Illness Treatment", "Other"]),
    notes: z.string().min(3),
    medication: z.string().optional(),
    dosage: z.string().optional(),
    nextDueDate: z.string().or(z.date()).optional(),
  }),
});
