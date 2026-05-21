'use client';

import z from "zod";
import { getErrMsgZod } from "@/lib/utils/zod";

const validateAuthor = {
  title: (val) => {
    const schema = z.string().trim().min(1, 'Nama tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    return true
  },

  level: (val) => {
    const schema = z.string().trim().min(1, 'Level tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    return true
  }
}

export default validateAuthor