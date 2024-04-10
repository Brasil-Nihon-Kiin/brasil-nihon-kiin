import { z } from "zod"

export const userFormSchema = z.object({
  firstName: z.string().optional().nullish(),
  lastName: z.string().optional().nullish(),
  description: z.string().optional().nullish(),
  kgsUsername: z.string().optional().nullish(),
  ogsUsername: z.string().optional().nullish(),
  foxUsername: z.string().optional().nullish(),
})

export type UserFormValidation = z.infer<
  typeof userFormSchema
>
