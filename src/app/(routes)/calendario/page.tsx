"use client"

import { setTitle } from "@utils"

import {
  CreateEvent,
  EventsCalendar,
  EventsCalendarView,
} from "@components"

export default function Calendario() {
  setTitle("Calendário")

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <CreateEvent />
      <EventsCalendar
        initialView={EventsCalendarView.timeWeek}
      />
    </div>
  )
}
