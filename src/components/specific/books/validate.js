'use client';

import z from "zod";
import { getErrMsgZod } from "@/lib/utils/zod";
import { checkDuplicationBook } from "@/lib/http/book-http";
// import { checkDuplicationMember } from "@/lib/http/member-http";


const validateBook = {
  title: (val) => {
    const schema = z.string().trim().min(1, 'Judul tidak boleh kosong')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    return true
  },

  isbn: async (val, id = null) => {
    const schema = z
      .stringFormat('only-number', /^\d+$/, {
        error: issue => issue.input.trim() === '' ? 'ISBN tidak boleh kosong' : 'ISBN hanya boleh angka'
      })
      .max(50, 'ISBN tidak boleh melebihi 50 angka')

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    const isDuplicate = await checkDuplicationBook({ field: 'isbn', value: val, id })
    if (isDuplicate) {
      return 'ISBN sudah digunakan, mohon untuk mengganti dengan yang lain'
    }

    return true
  },

  page: (val) => {
    const schema = z
      .transform((val) => {
        const num = parseInt(val, 10)
        return (typeof(val) === 'string' &&  val.trim() === "") || isNaN(num) 
          ? null 
          : num
      })
      .refine((val) => val === null || val > 0, { 
        error: "Halaman harus berupa angka positif" 
      })

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)
  
    return true
  },
  
  edition: (val) => {
    const schema = z
      .transform((val) => {
        const num = parseInt(val, 10)
        return (typeof(val) === 'string' &&  val.trim() === "") || isNaN(num) 
          ? null 
          : num
      })
      .refine((val) => val === null || val > 0, { 
        error: "Edisi harus berupa angka positif" 
      })

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)
  
    return true
  },

  publicationDate: (val) => {
    const schema = z    
      .date({
        error: issue => issue.input === undefined ? "Tanggal Penerbitan tidak boleh kosong" : 'Invalid date'
      })

    const result = schema.safeParse(val)
    if (!result.success) return getErrMsgZod(result)

    return true
  }
}

export default validateBook