import { useParams } from "next/navigation"

import { useUser as useClerkUser } from "@clerk/nextjs"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  brStates,
  mostImportantCountriesListInPortuguese,
  mostPopularLanguagesInPortuguese,
} from "@utils"

import { updateUser } from "@actions"

import { useUserForm } from "@context"

import {
  UserFormValidation,
  userFormSchema,
} from "@validation"

import {
  Divider,
  MultiSelect,
  Select,
  TextArea,
  TextField,
} from "../common/exports"

export function UserForm() {
  const params = useParams()
  const userNid = params.user_nid as string

  const { user: clerkUser } = useClerkUser()
  const { user, setUser } = useUserForm()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValidation>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user,
  })

  async function onSubmit(newData: UserFormValidation) {
    console.log(newData)

    const updatedUser = await updateUser(userNid, newData)
    if (updatedUser) setUser(updatedUser)
  }

  if (
    clerkUser &&
    clerkUser.publicMetadata.nanoid === userNid
  ) {
    return (
      <section className="flex flex-col gap-4 items-center">
        <Divider text="Editar Usuário" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3 justify-items-end w-full"
        >
          <TextField
            errors={errors}
            register={register}
            field="firstName"
            label="Nome"
          />
          <TextField
            errors={errors}
            register={register}
            field="lastName"
            label="Sobrenome"
          />
          <TextArea
            errors={errors}
            register={register}
            field="description"
            label="Descrição"
          />

          <MultiSelect
            label="Línguas"
            placeholder="Escolha uma ou mais línguas"
            options={mostPopularLanguagesInPortuguese}
            initialSelection={user.languages}
            onChangeHook={(selected) => {
              setValue("languages", [...selected])
            }}
          />

          <MultiSelect
            label="País(es) de Origem"
            placeholder="Escolha um ou mais países"
            options={mostImportantCountriesListInPortuguese.map(
              (c) => `${c.emoji} ${c.name}`
            )}
            initialSelection={mostImportantCountriesListInPortuguese
              .filter((c) =>
                user.nationalities.includes(c.name)
              )
              .map((c) => `${c.emoji} ${c.name}`)}
            onChangeHook={(selected) => {
              setValue(
                "nationalities",
                [...selected].map((s) =>
                  s.split(" ").slice(1).join(" ")
                )
              )
            }}
          />

          <Select
            label="Estado Brasileiro de Origem"
            placeholder="Escolha um estado brasileiro"
            options={brStates.map((s) => s.name)}
            initialSelection={user.brStateOfOrigin}
            onChangeHook={(selected) => {
              setValue("brStateOfOrigin", selected)
            }}
          />

          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-neutral w-max col-span-2 mt-2"
          >
            Salvar
          </button>
        </form>
      </section>
    )
  }
}
