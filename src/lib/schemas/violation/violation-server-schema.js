import "server-only"

import z from "zod"
import { VIOLATION_LEVEL } from "@/lib/constants/violation-level"

export const violationServerSchema = z.object({
  title: z // string, email required
    .string()
    .trim()
    .toLowerCase()
    .min(1),
  level: z // string, required
    .string()
    .trim()
    .toLowerCase()
    .refine((val) => VIOLATION_LEVEL[val] !== undefined, { 
      error: `Invalid level: can only be ${Object.getOwnPropertyNames(VIOLATION_LEVEL)}` 
    }),
  description: z
    .string()
    .trim()
    .nullable()
    .transform((val) => val || null)
    .default(null)
})
