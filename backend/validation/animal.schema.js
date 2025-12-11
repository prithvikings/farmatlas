import { z } from "zod";

export const createAnimalSchema = z.object({
  body: z.object({
    tagNumber: z.string().min(1),
    name: z.string().min(1),
    species: z.string().min(1),
    breed: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE"]),
    dateOfBirth: z.string().or(z.date()),
    acquisitionDate: z.string().or(z.date()),
    status: z.enum(["ACTIVE", "SOLD", "DEAD", "SICK", "TRANSFERRED", "MISSING"]).optional(),
    location: z.string().optional(),
    photoUrl: z.string().url().optional(),
  }),
});
