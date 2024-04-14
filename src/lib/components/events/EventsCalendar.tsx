import { useState } from "react"

import {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventInput,
} from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction"
import ptLocale from "@fullcalendar/core/locales/pt-br"
import { EventImpl } from "@fullcalendar/core/internal"

import { standardNanoid, toDate } from "@utils"

import {
  postCalendarSlot,
  updateCalendarSlotTime,
} from "@actions"

import { useCalendarSlots, useClerkUser } from "@hooks"

import { CalendarSlotEditingModal } from "../calendar_slots/CalendarSlotEditingModal"

const events: EventInput[] = [
  {
    id: "1",
    title: "Reuniao",
    start: new Date(2024, 3, 12, 15),
    end: new Date(2024, 3, 12, 16),
  },
  {
    id: "2",
    title: "Torneio",
    start: new Date(2024, 3, 12, 16),
    end: new Date(2024, 3, 12, 18),
    color: "green",
    // url: "http://localhost:3000",
  },
  {
    id: "3",
    title: "Lanche",
    start: new Date(2024, 3, 12, 16),
    end: new Date(2024, 3, 12, 17),
    color: "orange",
  },
]

export enum EventsCalendarView {
  dayMonth = "dayGridMonth",
  timeWeek = "timeGridWeek",
}

type EventsCalendarProps = {
  initialView?: EventsCalendarView
}

export function EventsCalendar({
  initialView = EventsCalendarView.dayMonth,
}: EventsCalendarProps) {
  const [clickedEvent, setClickedEvent] =
    useState<EventImpl>()

  const { calendarSlots } = useCalendarSlots()

  function mappedCalendarSlots() {
    return calendarSlots
      ? calendarSlots?.map((c) => ({
          ...c,
          id: c.nanoid,
          start: c.startTime,
          end: c.endTime,
          extendedProps: {
            associatedEventsIds: c.events,
          },
        }))
      : []
  }

  const { user } = useClerkUser()

  async function handleClickEmptyCalendarSlot(
    selected: DateSelectArg
  ) {
    const calendarApi = selected.view.calendar
    calendarApi.unselect()

    try {
      await postCalendarSlot(
        user!.id,
        toDate(selected.start),
        toDate(selected.endStr)
      )

      calendarApi.addEvent({
        id: standardNanoid(),
        title: "",
        start: selected.startStr,
        end: selected.endStr,
        backgroundColor: "green",
      })
    } catch (e) {
      console.error(e)
    }
  }

  async function handleResizeOrDrag(
    data: EventResizeDoneArg | EventDropArg
  ) {
    try {
      const event = data.event

      await updateCalendarSlotTime(
        event.id,
        toDate(event.start!),
        toDate(event.end!)
      )
    } catch (e) {
      console.error(e)
    }
  }

  function handleCalendarSlotClick(data: EventClickArg) {
    const event = data.event
    setClickedEvent(event)

    const dialog = document.getElementById(
      "calendar-slot-edit"
    ) as HTMLDialogElement
    dialog.showModal()
  }

  const width =
    initialView === EventsCalendarView.dayMonth
      ? "60%"
      : "90%"
  const height =
    initialView === EventsCalendarView.dayMonth
      ? "500px"
      : "800px"

  return (
    <div
      className="card h-max p-4 bg-base-300 shadow-xl"
      style={{
        width,
      }}
    >
      <FullCalendar
        locale={ptLocale}
        height={height}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        initialView={initialView}
        weekends={true}
        allDaySlot={false}
        nowIndicator={true}
        scrollTime={new Date().toTimeString()}
        editable={true}
        eventStartEditable={true}
        dragScroll={true}
        selectMirror={true}
        selectable={true}
        events={[...events, ...mappedCalendarSlots()]}
        select={handleClickEmptyCalendarSlot}
        eventResize={handleResizeOrDrag}
        eventDrop={handleResizeOrDrag}
        eventClick={handleCalendarSlotClick}
      />
      <CalendarSlotEditingModal
        calendarSlot={clickedEvent}
      />
    </div>
  )
}
