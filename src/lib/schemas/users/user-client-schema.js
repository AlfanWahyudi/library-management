import z from "zod"

export const userClientSchema = z.object({
  email: z // email required
    .email('Format email tidak sesuai')
    .trim(),
  fullName: z // string, required
    .string()
    .trim()
    .min(1, 'Nama Lengkap tidak boleh kosong'),
  address: z // string, required
    .string()
    .trim()
    .min(1, 'Alamat Lengkap tidak boleh kosong'),
  gender: z // string
    .string()
    .min(1, 'Jenis Kelamin tidak boleh kosong')
})
