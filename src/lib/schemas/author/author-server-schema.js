import 'server-only';

import z from "zod";

export const authorServerSchema = z.object({
  fullName: z // string, required
    .string()
    .trim()
    .min(1),
  countryCode: z // string, required
    .string()
    .trim()
    .toUpperCase()
    .length(2),
  activeSince: z // integer, nullable. tidak boleh minus
    .transform((val) => {
      const num = parseInt(val, 10);
      return isNaN(num) ? null : num;
    })
    .refine((val) => val === null || val > 0, { 
      error: "activeSince must be a null or positive" 
    }),
  about: z // string, nullable
    .string()
    .trim()
    .nullable()
    .default(null)
}).required({ fullName: true, countryCode: true })
