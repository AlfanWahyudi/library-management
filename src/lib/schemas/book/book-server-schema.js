import 'server-only';

import z from "zod";

export const bookServerSchema = z.object({
  isbn: z // string, required
    .stringFormat('only-number', /^\d+$/)
    .min(1)
    .max(50),
  title: z // string, required
    .string()
    .trim()
    .min(1),
  subTitle: z // string
    .string()
    .trim()
    .default(null),
  publisher: z // string
    .string()
    .trim()
    .default(null),
  publicationDate: z
    .iso
    .date(),
  page: z // integer, nullable. tidak boleh minus
    .number()
    .nullable()
    .default(null),
  edition: z // integer, nullable. tidak boleh minus
    .number()
    .nullable()
    .default(null),
  language: z // string, nullable
    .string()
    .trim()
    .nullable()
    .default(null),
  authors: z // string, nullable
    .string()
    .nullable()
    .default(null)
    .transform((value) => (!value ? [] : value.split(','))),
})
