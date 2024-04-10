import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import { EventContentArg } from "@fullcalendar/core"
import ptLocale from "@fullcalendar/core/locales/pt-br"

import { Tooltip } from "react-tippy"

const events = [{ title: "Meeting", start: new Date() }]

export enum EventsCalendarView {
  dayMonth = "dayGridMonth",
  timeWeek = "timeGridWeek",
}

type EventsCalendarProps = {
  initialView?: EventsCalendarView
  width?: string
}

export function EventsCalendar({
  initialView = EventsCalendarView.dayMonth,
  width = "1/2",
}: EventsCalendarProps) {
  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  return (
    <div
      className={`card w-${width} h-[800px] p-4 bg-base-300 shadow-xl`}
    >
      <FullCalendar
        locale={ptLocale}
        height="100%"
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={initialView}
        weekends={true}
        events={events}
        eventDidMount={(info) => {
          return new Tooltip({ title: "here" })
        }}
        eventMouseEnter={(arg) => {}}
        //     eventContent={(eventInfo) => {
        //       return (
        //         <>
        //           <b>{eventInfo.timeText}</b>
        //           <i>{eventInfo.event.title}</i>
        //           <Tooltip
        //             title="Welcome to React"
        //             position="bottom"
        //             trigger="click"
        //           >
        //             {/* <p>Click here to show popup</p> */}
        //           </Tooltip>
        //         </>
        //       )
        //     }}
      />
    </div>
  )
}
