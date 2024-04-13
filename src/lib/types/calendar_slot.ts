import { CalendarSlot, Event } from "@prisma/client"

export type CalendarSlotWithEvents = CalendarSlot & {
  events: Event[]
}
