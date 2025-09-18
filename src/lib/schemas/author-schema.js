import z from "zod";

export const authorClientSchema = z.object({
  fullName: z // string, required
    .string()
    .trim()
    .min(1, 'Nama lengkap tidak boleh kosong'),
  countryCode: z // string, required
    .string()
    .trim()
    .toUpperCase()
    .length(2, 'Kode negara tidak sesuai, harus 2 huruf (Alpha-2 code)'),
  activeSince: z // integer, nullable. tidak boleh minus
    .coerce.number()
    .positive(0, 'Aktif sejak harus berupa angka positif')
    .nullable()
    .default(null),
  about: z // string, nullable
    .string()
    .trim()
    .nullable()
    .default(null)
}).required({ fullName: true, countryCode: true })


export const authorServerSchema = z.object({
  fullName: z // string, required
    .string()
    .trim()
    .min(1),
  countryCode: z // string, required
    .string()
    .trim()
    .toUpperCase()
    .length(2),
  activeSince: z // integer, nullable. tidak boleh minus
    .coerce.number()
    .positive(0)
    .nullable()
    .default(null),
  about: z // string, nullable
    .string()
    .trim()
    .nullable()
    .default(null)
}).required({ fullName: true, countryCode: true })
