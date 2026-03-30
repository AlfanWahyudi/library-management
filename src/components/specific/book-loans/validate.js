'use client';

import z from "zod";
import { getErrMsgZod } from "@/lib/utils/zod";
import { BOOK_LOAN } from "@/lib/constants/book-loan";

const validateBookLoan = {
  member: (val) => {
    const schema = z.object({}, 'Anggota tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    return true
  },
  book: (val, member) => {
    const schema = z    
      .array(z.object({}, 'book item must be object'))
      .refine((val) => val.length >= BOOK_LOAN.MIN && val.length <= BOOK_LOAN.MAX , {
        error: 'Buku yang dapat dipilih minimal 1, dan tidak boleh lebih dari 3'
      });

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    if (member) {
      const remainBookLoan = BOOK_LOAN.MAX - parseInt(member.bookOnLoanCount)
      const moreThanMax = val.length > remainBookLoan
      if (moreThanMax) return `Sisa buku yang dapat dipinjamkan oleh ${member.fullName} sebanyak ${remainBookLoan}.`
    }

    return true
  }
}

export default validateBookLoan