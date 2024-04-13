import { Event } from "@prisma/client"

import { createContext, useContext, useState } from "react"

import {
  CalendarSlotWithEvents,
  ReactChildren,
} from "@types"

import { useCalendarSlots, useEvents } from "@hooks"

type CalendarContext = {
  events: Event[]
  calendarSlots: CalendarSlotWithEvents[]
  selectedCalendarSlot: CalendarSlotWithEvents
  setSelectedCalendarSlot: React.Dispatch<
    React.SetStateAction<CalendarSlotWithEvents>
  >
}

const CalendarContext =
  createContext<CalendarContext | null>(null)

export function CalendarProvider({
  children,
}: ReactChildren) {
  const { events } = useEvents()
  const { calendarSlots } = useCalendarSlots()
  const [selectedCalendarSlot, setSelectedCalendarSlot] =
    useState<CalendarSlotWithEvents>()

  return <></>
  //   return (
  //     <CalendarContext.Provider
  //       value={{
  //         events,
  //         calendarSlots,
  //         selectedCalendarSlot,
  //         setSelectedCalendarSlot
  //       }}
  //     >
  //       {children}
  //     </CalendarContext.Provider>
  //   )
}

export function useCalendar() {
  const context = useContext(CalendarContext)

  if (!context) {
    throw new Error(
      "`useCalendar` must be used within a `CalendarProvider`."
    )
  }

  return context
}
