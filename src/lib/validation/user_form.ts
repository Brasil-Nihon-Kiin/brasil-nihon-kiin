import { z } from "zod"

import { toJSON } from "@utils"

import { Theme } from "@context"

// 1. Personal Data

const goUserAndStrengthSchema = z.object({
  username: z.string().optional().nullish(),
  strength: z.string().optional().nullish(),
})

export type GoUserAndStrengthSchema = z.infer<
  typeof goUserAndStrengthSchema
>

export const userFormSchema = z.object({
  firstName: z.string().optional().nullish(),
  lastName: z.string().optional().nullish(),
  dateOfBirth: z.string().optional().nullish(),

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
  ciyOfOrigin: z.string().optional().nullish(),

  countryOfResidence: z.string().optional().nullish(),
  cityOfResidence: z.string().optional().nullish(),
  brStateOfResidence: z.string().optional().nullish(),

  socialsLinks: z
    .record(z.string(), z.string())
    .optional()
    .nullish()
    .transform((o) => toJSON(o)),

  goUsers: z
    .record(z.string(), goUserAndStrengthSchema)
    .optional()
    .nullish()
    .transform((o) => toJSON(o)),
})

export type UserFormValidation = z.infer<
  typeof userFormSchema
>

// 2. Settings

export const userSettingsSchema = z.object({
  theme: z.nativeEnum(Theme),
})

export type UserSettingsValidation = z.infer<
  typeof userSettingsSchema
>
