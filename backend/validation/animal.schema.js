import { z } from "zod";

export const createAnimalSchema = z.object({
  body: z.object({
    tagNumber: z.string().min(1),
    name: z.string().min(1),
    species: z.string().min(1),
    gender: z.enum(["MALE", "FEMALE"]),
  }),
});
