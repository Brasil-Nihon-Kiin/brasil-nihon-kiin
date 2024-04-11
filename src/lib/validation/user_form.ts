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
  nationalities: z
    .array(z.string())
    .optional()
    .nullish()
    .transform((countries) => countries ?? []),
  brStateOfOrigin: z.string().optional().nullish(),
  countryOfResidence: z.string().optional().nullish(),
  ciyOfOrigin: z.string().optional().nullish(),
})

export type UserFormValidation = z.infer<
  typeof userFormSchema
>
