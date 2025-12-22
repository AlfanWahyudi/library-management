'use client'

import z from "zod";
import { getErrMsgZod } from "@/lib/utils/zod";
import { checkEmailExist } from "@/lib/http/user-http"

const validateUserProfile = {
  fullName: (val) => {
    const schema = z.string().trim().min(1, 'Nama Lengkap tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    return true
  },

  email: async (val) => {
    const schema = z.email('Format email tidak sesuai')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    const isDuplicate = await checkEmailExist({ email: val })
    if (isDuplicate) {
      return 'Email sudah digunakan, mohon untuk mengganti dengan yang lain'      
    }

    return true
  },

  gender: (val) => {
    const schema = z.string().min(1, 'Jenis Kelamin tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)
  
  },

  address: (val) => {
    const schema = z.string().min(1, 'Alamat Lengkap tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    return true
  },
}

export default validateUserProfile