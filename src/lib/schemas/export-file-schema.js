import 'server-only'

import z from "zod"

export const exportFileSchema = z.object({
  extension: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'extension property must not be empty.')
    .refine(
      (val) => /(csv)|(doc)|(pdf)|(xlsx)/.test(val), 
      'Allowed extensions are csv, doc, pdf, xlsx.'
    )
}).required({ extension: true })