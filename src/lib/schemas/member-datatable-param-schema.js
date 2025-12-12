import 'server-only';

import { GENDER } from "../constants/gender";
import z from "zod";

export const memberDataTableParamSchema = z.object({
  gender: z // string, required only "all,m,f"
    .string()
    .trim()
    .toLowerCase()
    .refine((val) =>  val === 'all' || (GENDER[val] !== undefined), { 
      error: `Invalid gender: can only be all,${Object.getOwnPropertyNames(GENDER)}` 
    }),
  
})