import { z } from "zod"

export const userFormSchema = z.object({
  firstName: z.string().optional().nullish(),
  lastName: z.string().optional().nullish(),
  description: z.string().optional().nullish(),
  languages: z
    .array(z.string())
    .optional()
    .nullish()
    .transform((langs) => langs ?? []),
})

export type UserFormValidation = z.infer<
  typeof userFormSchema
>
