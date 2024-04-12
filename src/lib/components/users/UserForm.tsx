import { useParams } from "next/navigation"

import {
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
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

import { useClerkUser } from "@hooks"

import {
  UserFormValidation,
  userFormSchema,
} from "@validation"

import {
  DateField,
  Divider,
  GoServerField,
  MultiSelect,
  Select,
  SocialsField,
  TextArea,
  TextField,
  TextFieldTypes,
} from "../common/exports"

export function UserForm() {
  const params = useParams()
  const userId = params.user_id as string

  const { userIdIsFromSignedInUser } = useClerkUser()
  const { user, setUser } = useUserForm()

  const formMethods = useForm<UserFormValidation>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user,
  })

  async function onSubmit(newData: UserFormValidation) {
    console.log(newData)

    const updatedUser = await updateUser(
      user.nanoid,
      newData
    )
    if (updatedUser) setUser(updatedUser)
  }

  if (userIdIsFromSignedInUser(userId)) {
    return (
      <FormProvider {...formMethods}>
        <section className="flex flex-col gap-4 items-center">
          <Divider text="Editar Usuário" />
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-3 justify-items-end w-full"
          >
            <PersonalDataFormSection />
            <OfOriginSection />
            <OfResidenceSection />
            <GoServersSection />
            <SocialsSection />

            <button
              disabled={formMethods.formState.isSubmitting}
              type="submit"
              className="btn btn-neutral w-max col-span-full mt-2"
            >
              Salvar
            </button>
          </form>
        </section>
      </FormProvider>
    )
  }
}

function PersonalDataFormSection() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<UserFormValidation>()

  const { user } = useUserForm()

  return (
    <>
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
    </>
  )
}

function OfOriginSection() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<UserFormValidation>()

  const { user } = useUserForm()

  return (
    <>
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
    </>
  )
}

function OfResidenceSection() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<UserFormValidation>()

  const { user } = useUserForm()

  return (
    <>
      <Select
        label="País de Residência"
        placeholder="Escolha um país"
        options={mostImportantCountriesListInPortuguese.map(
          countryWithEmoji
        )}
        initialSelection={mostImportantCountriesListInPortuguese
          .filter((c) => user.countryOfResidence === c.name)
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
    </>
  )
}

function GoServersSection() {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<UserFormValidation>()

  return (
    <>
      <GoServerField
        serverName="OGS"
        initialValue={getValues("goUsers")?.ogs}
        onChangeTextHook={(selected) => {
          const goUsers = getValues("goUsers")
          setValue("goUsers", {
            ...(goUsers && goUsers),
            ogs: {
              ...(goUsers?.ogs && goUsers.ogs),
              username: selected,
            },
          })
        }}
        onChangeStrengthHook={(strength) => {
          const goUsers = getValues("goUsers")
          setValue("goUsers", {
            ...goUsers,
            ogs: {
              ...(goUsers?.ogs && goUsers.ogs),
              strength: strength,
            },
          })
        }}
      />
      <GoServerField
        serverName="KGS"
        initialValue={getValues("goUsers")?.kgs}
        onChangeTextHook={(selected) => {
          const goUsers = getValues("goUsers")
          setValue("goUsers", {
            ...(goUsers && goUsers),
            kgs: {
              ...(goUsers?.kgs && goUsers.kgs),
              username: selected,
            },
          })
        }}
        onChangeStrengthHook={(strength) => {
          const goUsers = getValues("goUsers")
          setValue("goUsers", {
            ...goUsers,
            kgs: {
              ...(goUsers?.kgs && goUsers.kgs),
              strength: strength,
            },
          })
        }}
      />
      <GoServerField
        serverName="Fox Weiqi"
        initialValue={getValues("goUsers")?.fox}
        onChangeTextHook={(selected) => {
          const goUsers = getValues("goUsers")
          setValue("goUsers", {
            ...(goUsers && goUsers),
            fox: {
              ...(goUsers?.fox && goUsers.fox),
              username: selected,
            },
          })
        }}
        onChangeStrengthHook={(strength) => {
          const goUsers = getValues("goUsers")
          setValue("goUsers", {
            ...goUsers,
            fox: {
              ...(goUsers?.kgs && goUsers.fox),
              strength: strength,
            },
          })
        }}
      />
      <GoServerField
        serverName="Pandanet"
        initialValue={getValues("goUsers")?.pandanet}
        onChangeTextHook={(selected) => {
          const goUsers = getValues("goUsers")
          setValue("goUsers", {
            ...(goUsers && goUsers),
            pandanet: {
              ...(goUsers?.pandanet && goUsers.pandanet),
              username: selected,
            },
          })
        }}
        onChangeStrengthHook={(strength) => {
          const goUsers = getValues("goUsers")
          setValue("goUsers", {
            ...goUsers,
            pandanet: {
              ...(goUsers?.pandanet && goUsers.pandanet),
              strength: strength,
            },
          })
        }}
      />
    </>
  )
}

function SocialsSection() {
  const { getValues, setValue } =
    useFormContext<UserFormValidation>()

  return (
    <>
      <SocialsField
        label="Facebook"
        placeholder="https://facebook.com/joao.silva"
        type={TextFieldTypes.Url}
        brandIcon={
          <FontAwesomeIcon size={"1x"} icon={faFacebook} />
        }
        initialValue={getValues("socialsLinks")?.facebook}
        onChangeHook={(text) => {
          const currentSocials = getValues("socialsLinks")
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
          <FontAwesomeIcon size={"1x"} icon={faInstagram} />
        }
        initialValue={getValues("socialsLinks")?.instagram}
        onChangeHook={(text) => {
          const currentSocials = getValues("socialsLinks")
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
          <FontAwesomeIcon size={"1x"} icon={faYoutube} />
        }
        initialValue={getValues("socialsLinks")?.youtube}
        onChangeHook={(text) => {
          const currentSocials = getValues("socialsLinks")
          setValue("socialsLinks", {
            ...currentSocials,
            youtube: text,
          })
        }}
      />
      <SocialsField
        label="Twitch"
        placeholder="https://twitch.com/joao.silva"
        type={TextFieldTypes.Url}
        brandIcon={
          <FontAwesomeIcon size={"1x"} icon={faTwitch} />
        }
        initialValue={getValues("socialsLinks")?.twitch}
        onChangeHook={(text) => {
          const currentSocials = getValues("socialsLinks")
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
        initialValue={getValues("socialsLinks")?.pessoal}
        onChangeHook={(text) => {
          const currentSocials = getValues("socialsLinks")
          setValue("socialsLinks", {
            ...currentSocials,
            personal: text,
          })
        }}
      />
    </>
  )
}
