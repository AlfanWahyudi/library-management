'use client';

import z from "zod";
import { getErrMsgZod } from "@/lib/utils/zod";
import { checkUsernameExist } from "@/lib/http/user-http"

const validateChangeUsername = {
  newUsername: async (val, prevUsername) => {
    const schema = z.string().trim().min(1, 'Username Baru tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    if (prevUsername === val) return 'Username Baru tidak boleh sama dengan yang sekarang'

    const isExist = await checkUsernameExist({ username: val })
    if (isExist) {
      return 'Username sudah digunakan, mohon untuk mengganti dengan yang lain'
    }

    return true
  }
}

export default validateChangeUsername