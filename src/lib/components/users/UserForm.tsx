import { useParams } from "next/navigation"

import useCountries from "use-countries"

import { useUser as useClerkUser } from "@clerk/nextjs"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { updateUser } from "@actions"

import { useUserForm } from "@context"

import {
  UserFormValidation,
  userFormSchema,
} from "@validation"

import { Divider } from "../common/Divider"
import { PlusIcon } from "@heroicons/react/24/solid"

export function UserForm() {
  const params = useParams()
  const userNid = params.user_nid as string

  const { user: clerkUser } = useClerkUser()
  const { user, setUser } = useUserForm()

  const { languages, countries } = useCountries()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValidation>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user,
  })

  async function onSubmit(newData: UserFormValidation) {
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
          {/* 1. Nome */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Nome</span>
            </div>
            <input
              {...register("firstName")}
              placeholder="João"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.firstName && (
              <p className="text-red-500">{`${errors.firstName.message}`}</p>
            )}
          </label>

          {/* 2. Sobrenome */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Sobrenome</span>
            </div>
            <input
              {...register("lastName")}
              placeholder="Silva"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.lastName && (
              <p className="text-red-500">{`${errors.lastName.message}`}</p>
            )}
          </label>

          {/* Descrição */}
          <label className="form-control w-full max-w-xs col-span-2">
            <div className="label w-full">
              <span className="label-text">Descrição</span>
            </div>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Comecei no Go através de..."
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{`${errors.description.message}`}</p>
            )}
          </label>

          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-neutral w-max col-span-2"
          >
            Salvar
          </button>
        </form>
      </section>
    )
  }
}
