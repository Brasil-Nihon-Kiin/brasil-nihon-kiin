import { z } from "zod"
import { EventCategories } from "../types/event"

export const eventFormSchema = z.object({
  name: z.string(),
  category: z.nativeEnum(EventCategories),
  description: z.string().optional().nullish(),
})

export type EventFormValidation = z.infer<
  typeof eventFormSchema
>
