import { z } from "zod"

export const userFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export type UserFormValidation = z.infer<typeof userFormSchema>
