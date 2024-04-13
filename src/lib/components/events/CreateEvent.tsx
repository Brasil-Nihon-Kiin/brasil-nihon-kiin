"use client"

import { PlusIcon } from "@heroicons/react/24/solid"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  eventCategories,
  stringToEventCategory,
} from "@types"

import {
  EventFormValidation,
  eventFormSchema,
} from "@validation"

import { postEvent } from "@actions"

import { useClerkUser } from "@hooks"

import { Select, TextArea, TextField } from "@components"

export function CreateEvent() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValidation>({
    resolver: zodResolver(eventFormSchema),
  })

  function getModal() {
    return document.getElementById(
      "create-event-modal"
    ) as HTMLDialogElement
  }

  const { user } = useClerkUser()

  async function onSubmit(newData: EventFormValidation) {
    await postEvent(
      user!.id,
      newData.name,
      newData.category,
      newData.description
    )
    const modal = getModal()
    modal.close()
  }

  return (
    <>
      <button
        className="btn btn-neutral w-max"
        onClick={() => {
          const modal = getModal()
          modal.showModal()
        }}
      >
        Criar Evento
        <PlusIcon className="h-6 w-6" />
      </button>
      <dialog id="create-event-modal" className="modal">
        <div className="modal-box flex flex-col gap-4">
          <h2 className="font-medium text-2xl pl-1">
            Crie um Novo Evento
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 justify-items-end gap-4"
          >
            <TextField<EventFormValidation>
              errors={errors}
              register={register}
              field="name"
              label="Nome"
              placeholder="Torneio Nacional..."
            />
            <Select
              label="Categoria"
              placeholder="Escolha uma categoria"
              options={eventCategories}
              onChangeHook={(selected) => {
                setValue(
                  "category",
                  stringToEventCategory(selected)
                )
              }}
              errors={errors.category}
            />
            <TextArea<EventFormValidation>
              errors={errors}
              register={register}
              colSpan="full"
              field="description"
              label="Descrição"
              placeholder="Este evento é..."
            />

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
      </dialog>
    </>
  )
}
