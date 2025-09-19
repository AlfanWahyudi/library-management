import z from "zod";

const countryListSchema = z.object({
  orderBy: z
    .string()
    .trim()
    .toLowerCase(),
  orderDir: z
    .string()
    .trim()
    .toLowerCase(),
})

export {
  countryListSchema
}