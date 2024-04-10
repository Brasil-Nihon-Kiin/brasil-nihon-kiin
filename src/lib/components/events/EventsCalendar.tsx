import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { EventContentArg } from "@fullcalendar/core"
import ptLocale from "@fullcalendar/core/locales/pt-br"

import { Tooltip } from "react-tippy"
import { title } from "process"

const events = [{ title: "Meeting", start: new Date() }]

export function EventsCalendar() {
  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  return (
    <div className="card max-h-max p-4 bg-base-300 shadow-xl">
      <FullCalendar
        locale={ptLocale}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
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
