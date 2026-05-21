import z from "zod";

const searchableListSchema = z.object({
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
  search: z 
    .string()
    .trim(),
  searchFields: z 
    .string()
    .trim()
    .transform((val) => {
      const result = []
      
      if (val) {
        result.push(...val.split(','))
      }

      return result
    }),
})

export {
  searchableListSchema
}