import { useRouter } from "next/navigation"

import { EventInput } from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"
import ptLocale from "@fullcalendar/core/locales/pt-br"

// import Tippy, { tippy } from "@tippyjs/react"
import tippy from "tippy.js"
import { Duration } from "svix"
import Tippy from "@tippyjs/react"
import { useState } from "react"

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
    url: "http://localhost:3000",
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

  const router = useRouter()

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
        // initialView={"agendaWeek"}
        initialView={initialView}
        weekends={true}
        allDaySlot={false}
        nowIndicator={true}
        scrollTime={new Date().toTimeString()}
        editable={true}
        eventStartEditable={true}
        dragScroll={true}
        selectMirror={true}
        selectable={false}
        events={events}
        eventResize={(data) => {
          console.log(data.event.start)
        }}
        eventDragStop={(data) => {
          console.log(data.event.end)
        }}
        eventClick={(data) => {
          router.push(data.event.url)
        }}
        customButtons={{
          createButton: {
            text: "Criar",
            click: function () {
              alert("clicked the custom button!")
            },
          },
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        // header={{k
        //     left: 'prev,next today myCustomButton',
        //     center: 'title',
        //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        // }}
        // event
        // eventMouseEnter={(arg) => {
        //   return <CalendarTooltip title={arg.event.title} />
        // }}
        // eventContent={(info) => (
        //   <CalendarTooltip title={info.event.title} />
        // )}
        // eventDidMount={(info) => {
        //   console.log("here")
        //   //console.log(info.event);
        //   return <CalendarTooltip title="here" />
        //   // tippy(info.el, {
        //   //   trigger: "click",
        //   //   touch: "hold",
        //   //   allowHTML: true,
        //   //   content: `<h3>${info.event.extendedProps.author}</h3>
        //   //       <hr/>
        //   //       <h5>${info.event.extendedProps.roomNumber}</h5>
        //   //       <hr/>
        //   //       <p>${info.event.extendedProps.description}</p>`,
        //   // })
        // }}
      />
    </div>
  )
}

type CalendarEventProps = {
  title: string
}

function CalendarTooltip({ title }: CalendarEventProps) {
  return (
    <Tippy
      trigger=""
      content={<div className="bg-neutral-100">Hello</div>}
    >
      <div className="p-2 bg-accent rounded-lg w-[100%]">
        {title}
      </div>
    </Tippy>
  )
}
