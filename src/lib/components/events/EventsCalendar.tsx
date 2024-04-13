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
  EventDragStopArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction"
import ptLocale from "@fullcalendar/core/locales/pt-br"
import { EventImpl } from "@fullcalendar/core/internal"
import { standardNanoid } from "../../utils/server_utils"
import { useCalendarSlots } from "../../hooks/use_calendar_slots"
import { postCalendarSlot } from "../../actions/exports"
import { useClerkUser } from "../../hooks/use_users"
import { updateCalendarSlotTime } from "../../actions/calendar_slots/update_calendar_slot"
import { toDate } from "../../utils/utils"

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
      ? ""
      : "600px"

  return (
    <div
      className={`card w-[${width}] p-4 bg-base-300 shadow-xl`}
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
      <CalendarSlotEditingModal event={clickedEvent} />
    </div>
  )
}

type EventModalProps = {
  event?: EventImpl
}

function CalendarSlotEditingModal({
  event,
}: EventModalProps) {
  return (
    <dialog id="calendar-slot-edit" className="modal">
      {event && (
        <>
          <div className="modal-box">
            <h2 className="font-bold text-xl">
              {event.title}
            </h2>
            <p className="py-4">
              Press ESC key or click outside to close
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </>
      )}
    </dialog>
  )
}
