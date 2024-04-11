import { useParams } from "next/navigation"

import { useUser as useClerkUser } from "@clerk/nextjs"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { LinkIcon } from "@heroicons/react/24/solid"

import {
  faFacebook,
  faInstagram,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  brStates,
  countryWithEmoji,
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
  DateField,
  Divider,
  MultiSelect,
  Select,
  SocialsField,
  TextArea,
  TextField,
  TextFieldTypes,
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
    getValues,
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
          className="grid grid-cols-3 gap-3 justify-items-end w-full"
        >
          <TextField<UserFormValidation>
            errors={errors}
            register={register}
            field="firstName"
            label="Nome"
            placeholder="João"
          />
          <TextField<UserFormValidation>
            errors={errors}
            register={register}
            field="lastName"
            label="Sobrenome"
            placeholder="Silva"
          />
          <DateField<UserFormValidation>
            errors={errors}
            register={register}
            field="dateOfBirth"
            label="Data de Nascimento"
          />

          <TextArea<UserFormValidation>
            errors={errors}
            register={register}
            colSpan="full"
            field="description"
            label="Descrição"
            placeholder="Aprendi o Go através de..."
          />

          <MultiSelect
            label="Línguas"
            placeholder="Escolha uma ou mais línguas"
            colSpan={"full"}
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
              countryWithEmoji
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
            label="Estado de Origem"
            placeholder="Escolha um estado"
            options={brStates.map((s) => s.name)}
            initialSelection={user.brStateOfOrigin}
            onChangeHook={(selected) => {
              setValue("brStateOfOrigin", selected)
            }}
          />

          <TextField<UserFormValidation>
            errors={errors}
            register={register}
            field="cityOfOrigin"
            label="Cidade de Origem"
            placeholder="São Paulo"
          />

          <Select
            label="País de Residência"
            placeholder="Escolha um país"
            options={mostImportantCountriesListInPortuguese.map(
              countryWithEmoji
            )}
            initialSelection={mostImportantCountriesListInPortuguese
              .filter(
                (c) => user.countryOfResidence === c.name
              )
              .map(countryWithEmoji)
              .first()}
            onChangeHook={(selected) => {
              setValue(
                "countryOfResidence",
                selected.split(" ").slice(1).join(" ")
              )
            }}
          />

          <Select
            label="Estado de Residência"
            placeholder="Escolha um estado"
            options={brStates.map((s) => s.name)}
            initialSelection={user.brStateOfResidence}
            onChangeHook={(selected) => {
              setValue("brStateOfResidence", selected)
            }}
          />

          <TextField<UserFormValidation>
            errors={errors}
            register={register}
            field="cityOfResidence"
            label="Cidade de Residência"
            placeholder="São Paulo"
          />

          <SocialsField
            label="Facebook"
            placeholder="https://facebook.com/joao.silva"
            type={TextFieldTypes.Url}
            brandIcon={
              <FontAwesomeIcon
                size={"1x"}
                icon={faFacebook}
              />
            }
            onChangeHook={(text) => {
              const currentSocials =
                getValues("socialsLinks")
              setValue("socialsLinks", {
                ...currentSocials,
                facebook: text,
              })
            }}
          />
          <SocialsField
            label="Instagram"
            placeholder="https://instagram.com/joao.silva"
            type={TextFieldTypes.Url}
            brandIcon={
              <FontAwesomeIcon
                size={"1x"}
                icon={faInstagram}
              />
            }
            onChangeHook={(text) => {
              const currentSocials =
                getValues("socialsLinks")
              setValue("socialsLinks", {
                ...currentSocials,
                instagram: text,
              })
            }}
          />
          <SocialsField
            label="YouTube"
            placeholder="https://youtube.com/@joao.silva"
            type={TextFieldTypes.Url}
            brandIcon={
              <FontAwesomeIcon
                size={"1x"}
                icon={faYoutube}
              />
            }
            onChangeHook={(text) => {
              const currentSocials =
                getValues("socialsLinks")
              setValue("socialsLinks", {
                ...currentSocials,
                youtube: text,
              })
            }}
          />
          <SocialsField
            label="Twitch"
            placeholder="https://twitch.com/@joao.silva"
            type={TextFieldTypes.Url}
            brandIcon={
              <FontAwesomeIcon
                size={"1x"}
                icon={faTwitch}
              />
            }
            onChangeHook={(text) => {
              const currentSocials =
                getValues("socialsLinks")
              setValue("socialsLinks", {
                ...currentSocials,
                twitch: text,
              })
            }}
          />
          <SocialsField
            label="Pessoal"
            placeholder="https://meublog.com.br"
            type={TextFieldTypes.Url}
            brandIcon={<LinkIcon className="h-4 w-4" />}
            onChangeHook={(text) => {
              const currentSocials =
                getValues("socialsLinks")
              setValue("socialsLinks", {
                ...currentSocials,
                personal: text,
              })
            }}
          />

          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-neutral w-max col-span-full mt-2"
          >
            Salvar
          </button>
        </form>
      </section>
    )
  }
}
