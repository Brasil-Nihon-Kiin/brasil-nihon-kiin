import { z } from "zod"

import { EventCategories } from "@types"

export const eventFormSchema = z.object({
  name: z
    .string()
    .min(1, "É preciso um título para o evento..."),
  category: z.nativeEnum(EventCategories, {
    required_error: "É preciso escolher uma categoria",
  }),
  description: z.string().optional().nullish(),
})

export type EventFormValidation = z.infer<
  typeof eventFormSchema
>
