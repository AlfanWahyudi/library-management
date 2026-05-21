import { BOOK_LOAN } from '@/lib/constants/book-loan';
import 'server-only';

import z from "zod";

export const bookLoanServerSchema = z.object({
  memberId: z // number, required
    .number()
    .min(1),
  bookIds: z // number, required
    .array(
      z.number()
      .min(1)
    ).
    refine((val) => val.length >= BOOK_LOAN.MIN && val.length <= BOOK_LOAN.MAX , {
      error: 'bookIds must be >= 1 and <= 3'
    }),
})
