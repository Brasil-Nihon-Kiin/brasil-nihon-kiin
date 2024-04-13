import { EventImpl } from "@fullcalendar/core/internal"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { toDate } from "@utils"

import { updateCalendarSlotTime } from "@actions"

import {
  CalendarSlotValidation,
  calendarSlotSchema,
} from "@validation"

import { useEvents } from "@hooks"

import { MultiSelect, TextField } from "../common/exports"

type EventModalProps = {
  calendarSlot?: EventImpl
}

export function CalendarSlotEditingModal({
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
