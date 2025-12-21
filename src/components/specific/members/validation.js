'use client';

import z from "zod";
import { getErrMsgZod } from "@/lib/utils/zod-utils";
import { checkDuplicationMember } from "@/lib/http/member-http";

const memberValidation = {
  validateFullName: (fullName) => {
    const schema = z.string().trim().min(1, 'Nama Lengkap tidak boleh kosong')

    const result = schema.safeParse(fullName)
    if (!result.success) return getErrMsgZod(result)

    return true
  },

  validateEmail: async (email, id = null) => {
    const schema = z.email('Format email tidak sesuai')

    const result = schema.safeParse(email)
    if (!result.success) return getErrMsgZod(result)
    
    const isDuplicate = await checkDuplicationMember({ field: 'email', value: email, id })
    if (isDuplicate) {
      return 'Email sudah digunakan, mohon untuk mengganti dengan yang lain'
    }

    return true
  },

  validatePhone: async (phone, id = null) => {
    const schema = z.stringFormat('only-number', /^\d+$/).max(20, 'No Telepon tidak boleh melebihi 20 angka')

    const result = schema.safeParse(phone, {
      error: (iss) => {
        if (iss.format === 'only-number') {
          return 'No Telepon invalid: hanya boleh angka'
        }
      }
    })

    if (!result.success) return getErrMsgZod(result)

    const isDuplicate = await checkDuplicationMember({ field: 'phone', value: phone, id })
    if (isDuplicate) {
      return 'No Telepon sudah digunakan, mohon untuk mengganti dengan yang lain'
    }

    return true
  },

  validateGender: (gender) => {
    const schema = z.string().min(1, 'Jenis Kelamin tidak boleh kosong')

    const result = schema.safeParse(gender)
    if (!result.success) return getErrMsgZod(result)
  
    return true
  },
  
  validateBirthDate: (birthDate) => {
    const schema = z.date({
      error: issue => issue.input === undefined ? "Tanggal lahir tidak boleh kosong" : "Format tanggal tidak sesuai"
    })

    const result = schema.safeParse(birthDate)
    if (!result.success) return getErrMsgZod(result)

    return true
  },

  validateAddress: (address) => {
    const schema = z.string().trim().min(1, 'Alamat Lengkap tidak boleh kosong')

    const result = schema.safeParse(address)
    if (!result.success) return getErrMsgZod(result)

    return true
  }
}

export default memberValidation