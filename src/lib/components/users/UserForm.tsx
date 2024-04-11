import { useParams } from "next/navigation"

import { useUser as useClerkUser } from "@clerk/nextjs"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
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
            placeHolder="Escolha uma ou mais línguas"
            options={mostPopularLanguagesInPortuguese}
            initialSelection={user.languages}
            onChangeHook={(selected) => {
              setValue("languages", [...selected])
            }}
          />

          <MultiSelect
            label="País(es) de Origem"
            placeHolder="Escolha um ou mais países"
            options={mostImportantCountriesListInPortuguese.map(
              (c) => `${c.emoji} ${c.name}`
            )}
            initialSelection={mostImportantCountriesListInPortuguese
              .filter((c) =>
                user.countriesOfOrigin.includes(c.name)
              )
              .map((c) => `${c.emoji} ${c.name}`)}
            onChangeHook={(selected) => {
              setValue(
                "countriesOfOrigin",
                [...selected].map((s) =>
                  s.split(" ").slice(1).join(" ")
                )
              )
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
