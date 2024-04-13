import { z } from "zod"

export const calendarSlotSchema = z.object({
  name: z.string().optional().nullish(),
  associatedEvents: z.array(z.string()),
})

export type CalendarSlotValidation = z.infer<
  typeof calendarSlotSchema
>
