import "server-only"

import { GENDER } from "@/lib/constants/gender"
import z from "zod"

export const memberServerSchema = z.object({
  email: z // string, email required
    .email()
    .max(255),
  fullName: z // string, required
    .string()
    .trim()
    .min(1)
    .max(255),
  address: z // string, required
    .string()
    .trim()
    .min(1),
  gender: z // string, required only "m,f"
    .string()
    .trim()
    .toLowerCase()
    .refine((val) => GENDER[val] !== undefined, { 
      error: `Invalid gender: can only be ${Object.getOwnPropertyNames(GENDER)}` 
    }),
  phone: z
    .stringFormat('only-number', /^\d+$/)
    .max(20),
  birthDate: z
    .iso
    .date()
})
