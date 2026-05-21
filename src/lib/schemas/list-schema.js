import z from "zod";

const listSchema = z.object({
  orderBy: z
    .string()
    .trim()
    .toLowerCase(),
  orderDir: z
    .string()
    .trim()
    .toLowerCase()
    .refine((val) => val === 'asc' ||  val === 'desc', {
      error: `orderDir can only be asc or desc`
    }),
})

export {
  listSchema
}