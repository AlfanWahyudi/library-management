import z from "zod";

const listSchema = z.object({
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
  listSchema
}