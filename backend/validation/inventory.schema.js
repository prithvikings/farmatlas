import { z } from "zod";

export const createInventoryItemSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    category: z.enum(["Feed", "Medicine", "Other"]),
    quantity: z.number().min(0),
    unit: z.string().min(1),
    lowStockThreshold: z.number().min(0),
  }),
});


export const createInventoryUsageSchema = z.object({
  body: z.object({
    itemId: z.string(),
    quantityUsed: z.number().positive(),
    notes: z.string().optional(),
  }),
});
