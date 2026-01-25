import 'server-only';

import { VIOLATION_LEVEL } from '@/lib/constants/violation-level';
import z from "zod";
import { removeSpaces } from '@/lib/utils/str';

const validateLevels = (text) => {
  let isValid = true

  const levels = Object.keys(VIOLATION_LEVEL)

  if (text !== 'all') {
    isValid = levels.some(level => text.includes(level))
  }

  return isValid
}

export const violationDataTableParamSchema = z.object({
  levels: z // string, required only "all,minor,moderate,high"
    .string()
    .trim()
    .toLowerCase()
    .transform((val) => removeSpaces(val))
    .refine((val) => val === 'all' || validateLevels(val), { 
      error: `Invalid levels: must have one of 'all,${Object.getOwnPropertyNames(VIOLATION_LEVEL)}'` 
    })
    .transform((value) => {
      if (value === 'all') {
        return Object.keys(VIOLATION_LEVEL)
      }

      return value.split(',')
    }),
  
})