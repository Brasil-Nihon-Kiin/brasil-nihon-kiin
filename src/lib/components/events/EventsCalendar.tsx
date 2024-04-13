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

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { TrashIcon } from "@heroicons/react/24/solid"

import { standardNanoid, toDate } from "@utils"

import {
  postCalendarSlot,
  updateCalendarSlotTime,
} from "@actions"

import {
  CalendarSlotValidation,
  calendarSlotSchema,
} from "@validation"

import {
  useCalendarSlots,
  useClerkUser,
  useEvents,
} from "@hooks"

import { MultiSelect, TextField } from "../common/exports"

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
      <CalendarSlotEditingModal
        calendarSlot={clickedEvent}
      />
    </div>
  )
}

type EventModalProps = {
  calendarSlot?: EventImpl
}

function CalendarSlotEditingModal({
  calendarSlot,
}: EventModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CalendarSlotValidation>({
    resolver: zodResolver(calendarSlotSchema),
  })

  const [isDeleting, setIsDeleting] = useState(false)

  async function onSubmit(newData: CalendarSlotValidation) {
    try {
      await updateCalendarSlotTime(
        calendarSlot!.id,
        toDate(calendarSlot!.start!),
        toDate(calendarSlot!.end!),
        newData.name,
        newData.associatedEvents
      )
    } catch (e) {
      console.error(e)
    }
  }

  const { events } = useEvents()

  return (
    <dialog id="calendar-slot-edit" className="modal">
      {event && (
        <>
          <div className="modal-box flex flex-col gap-4">
            <h2 className="font-medium text-2xl pl-1">
              Editar Horário de Calendário
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 justify-items-end gap-4"
            >
              <TextField<CalendarSlotValidation>
                errors={errors}
                register={register}
                field="name"
                label="Nome"
                placeholder="Torneio Nacional..."
              />
              {events && (
                <MultiSelect
                  label="Eventos Associados"
                  placeholder="Escolha um ou mais eventos"
                  colSpan={"full"}
                  options={events.map((e) => ({
                    key: e.nanoid,
                    value: e.name,
                  }))}
                  // initialSelection={user.languages}
                  onChangeHook={(selected) => {
                    setValue("associatedEvents", [
                      ...selected.map((s) => s.key),
                    ])
                  }}
                />
              )}

              <div className="flex gap-2">
                <button
                  className="btn btn-outline btn-error"
                  type="button"
                >
                  {isDeleting ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <TrashIcon className="h-5 w-5" />
                  )}
                  Deletar
                </button>
                <button
                  className="btn w-max"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Criar Evento
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </>
      )}
    </dialog>
  )
}
