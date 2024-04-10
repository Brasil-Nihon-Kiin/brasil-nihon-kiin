"use client"

import { setTitle } from "@utils"

import {
  EventsCalendar,
  EventsCalendarView,
} from "@components"

export default function Calendario() {
  setTitle("Calendário")

  return (
    <EventsCalendar
      initialView={EventsCalendarView.timeWeek}
    />
  )
}
