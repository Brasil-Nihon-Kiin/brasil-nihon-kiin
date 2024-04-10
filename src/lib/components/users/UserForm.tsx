import { useParams } from "next/navigation"

import { useUser as useClerkUser } from "@clerk/nextjs"

import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  useForm,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { updateUser } from "@actions"

import { useUserForm } from "@context"

import {
  UserFormValidation,
  userFormSchema,
} from "@validation"

import { Divider } from "../common/Divider"

export function UserForm() {
  const params = useParams()
  const userNid = params.user_nid as string

  const { user: clerkUser } = useClerkUser()
  const { setUser } = useUserForm()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValidation>({
    resolver: zodResolver(userFormSchema),
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
      <section className="flex flex-col gap-4">
        <Divider text="Editar Usuário" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3 justify-items-end"
        >
          <input
            {...register("firstName")}
            placeholder="Nome"
            className="input input-bordered input-accent w-full max-w-xs"
          />
          {errors.firstName && (
            <p className="text-red-500">{`${errors.firstName.message}`}</p>
          )}

          <input
            {...register("lastName")}
            placeholder="Sobrenome"
            className="input input-bordered input-accent w-full max-w-xs"
          />
          {errors.lastName && (
            <p className="text-red-500">{`${errors.lastName.message}`}</p>
          )}

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
