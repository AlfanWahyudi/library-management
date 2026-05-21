'use client';

import z from "zod";
import { getErrMsgZod } from "@/lib/utils/zod";
import { checkDuplicationMember } from "@/lib/http/member-http";

const validateMember = {
  fullName: (val) => {
    const schema = z.string().trim().min(1, 'Nama Lengkap tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    return true
  },

  email: async (val, id = null) => {
    const schema = z.email('Format email tidak sesuai')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)
    
    const isDuplicate = await checkDuplicationMember({ field: 'email', value: val, id })
    if (isDuplicate) {
      return 'Email sudah digunakan, mohon untuk mengganti dengan yang lain'
    }

    return true
  },

  phone: async (val, id = null) => {
    const schema = z.stringFormat('only-number', /^\d+$/).max(20, 'No Telepon tidak boleh melebihi 20 angka')

    const result = schema.safeParse(val, {
      error: (iss) => {
        if (iss.format === 'only-number') {
          return 'No Telepon invalid: hanya boleh angka'
        }
      }
    })

    if (!result.success) return getErrMsgZod(result)

    const isDuplicate = await checkDuplicationMember({ field: 'phone', value: val, id })
    if (isDuplicate) {
      return 'No Telepon sudah digunakan, mohon untuk mengganti dengan yang lain'
    }

    return true
  },

  gender: (val) => {
    const schema = z.string().min(1, 'Jenis Kelamin tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)
  
    return true
  },
  
  birthDate: (val) => {
    const schema = z.date({
      error: issue => issue.input === undefined ? "Tanggal lahir tidak boleh kosong" : "Format tanggal tidak sesuai"
    })

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    return true
  },

  address: (val) => {
    const schema = z.string().trim().min(1, 'Alamat Lengkap tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    return true
  }
}

export default validateMember