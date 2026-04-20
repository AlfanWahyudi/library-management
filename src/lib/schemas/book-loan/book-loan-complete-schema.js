import { BOOK_LOAN } from '@/lib/constants/book-loan';
import 'server-only';

import z from "zod";

export const bookLoanCompleteServerSchema = z.object({
  violationIds: z // number, has no duplicates
    .array(z.number())
    .refine((arr) => new Set(arr).size === arr.length, {
      error: 'violationIds must not contain duplicate ids'
    }),
})
