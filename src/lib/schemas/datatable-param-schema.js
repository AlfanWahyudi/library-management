import z from "zod";

export const dataTableParamSchema = z.object({
  page: z 
    .number()
    .min(0),
  limit: z 
    .number()
    .min(0),
  orderBy: z
    .string()
    .trim(),
  orderDir: z
    .string()
    .trim()
    .refine((val) => val.toLowerCase() === 'asc' || val.toLowerCase() === 'desc' , {
      error: 'orderDir must be asc or desc.'
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