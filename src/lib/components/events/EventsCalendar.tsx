import { useState } from "react"

import { EventInput } from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"
import ptLocale from "@fullcalendar/core/locales/pt-br"
import { EventImpl } from "@fullcalendar/core/internal"
import { standardNanoid } from "../../utils/server_utils"

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
  const width =
    initialView === EventsCalendarView.dayMonth
      ? "60%"
      : "90%"
  const height =
    initialView === EventsCalendarView.dayMonth
      ? ""
      : "400px"

  const [clickedEvent, setClickedEvent] =
    useState<EventImpl>()

  return (
    <div
      className={`card w-[90%] h-[400px] p-4 bg-base-300 shadow-xl`}
    >
      <FullCalendar
        locale={ptLocale}
        height="100%"
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
        events={events}
        select={(selected) => {
          const calendarApi = selected.view.calendar
          calendarApi.unselect()

          calendarApi.addEvent({
            id: standardNanoid(),
            title: "",
            start: selected.startStr,
            end: selected.endStr,
            backgroundColor: "green",
          })
        }}
        eventResize={(data) => {
          console.log(data.event.start)
          console.log(data.event.end)
        }}
        eventDragStop={(data) => {
          console.log(data.event.end)
        }}
        eventClick={(data) => {
          const event = data.event
          setClickedEvent(event)

          const dialog = document.getElementById(
            "my_modal_2"
          ) as HTMLDialogElement
          dialog.showModal()
        }}
        eventDidMount={(data) => {
          const eventEl = data.el
          const event = data.event
          eventEl.ondblclick = () => {
            console.log("here dbl")
            event.remove()
          }
        }}
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
    <dialog id="my_modal_2" className="modal">
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
