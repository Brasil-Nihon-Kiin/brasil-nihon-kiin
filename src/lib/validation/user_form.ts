import { z } from "zod"

export const userFormSchema = z.object({
  firstName: z.string().optional(),
})

export type UserForm = z.infer<typeof userFormSchema>
