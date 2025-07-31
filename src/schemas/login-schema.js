import z from "zod";

//todo: validate required
export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})
