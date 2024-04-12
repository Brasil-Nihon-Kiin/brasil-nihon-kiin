import { ReactNode } from "react"

import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form"

import { rankings } from "@utils"

import { GoUserAndStrengthSchema } from "@validation"

import { Select } from "./Select"

export enum TextFieldTypes {
  Text = "text",
  Url = "url",
}

type TextFieldProps<T extends FieldValues> = {
  errors: FieldErrors<T>
  register?: UseFormRegister<T>
  field: string
  label: string
  placeholder: string
  colSpan?: number | string
  type?: TextFieldTypes
  onChangeHook?: (text: string) => void
}

export function TextField<T extends FieldValues>({
  errors,
  register,
  field,
  label,
  placeholder,
  colSpan = 1,
  type = TextFieldTypes.Text,
  onChangeHook,
}: TextFieldProps<T>) {
  return (
    <label
      className={`form-control w-full col-span-${colSpan}`}
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...(register && register(field as Path<T>))}
        placeholder={placeholder}
        className="input input-bordered text-sm w-full"
        type={type}
        onChange={(e) => {
          const target = e.target as HTMLInputElement
          console.log(target.value)
          if (onChangeHook) onChangeHook(target.value)
        }}
      />
      {errors[field] && (
        <p className="text-red-500">{`${errors[field]?.message}`}</p>
      )}
    </label>
  )
}

type DateFieldProps<T extends FieldValues> = Omit<
  TextFieldProps<T>,
  "placeholder"
>

export function DateField<T extends FieldValues>({
  errors,
  register,
  field,
  label,
  colSpan,
}: DateFieldProps<T>) {
  return (
    <label
      className={`form-control w-full col-span-${colSpan}`}
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...(register && register(field as Path<T>))}
        type="date"
        className="input input-bordered text-sm w-full max-w-xs"
      />
      {errors[field] && (
        <p className="text-red-500">{`${errors[field]?.message}`}</p>
      )}
    </label>
  )
}

export function TextArea<T extends FieldValues>({
  errors,
  register,
  field,
  label,
  placeholder,
  colSpan = "full",
}: TextFieldProps<T>) {
  return (
    <label
      className={`form-control w-full col-span-${colSpan}`}
    >
      <div className="label w-full">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        {...(register && register(field as Path<T>))}
        className="textarea textarea-bordered h-24 w-full"
        placeholder={placeholder}
      ></textarea>
      {errors[field] && (
        <p className="text-red-500">{`${errors[field]?.message}`}</p>
      )}
    </label>
  )
}

type SocialsFieldProps = {
  label: string
  placeholder: string
  colSpan?: number | string
  type?: TextFieldTypes
  brandIcon?: ReactNode
  initialValue?: string | null | undefined
  onChangeHook?: (text: string) => void
}

export function SocialsField({
  label,
  placeholder,
  colSpan = "full",
  type = TextFieldTypes.Text,
  brandIcon,
  initialValue,
  onChangeHook,
}: SocialsFieldProps) {
  return (
    <label
      className={`form-control w-full col-span-${colSpan}`}
    >
      <div className="label justify-start gap-2 pl-4">
        {brandIcon}
        <span className="label-text">{label}</span>
      </div>
      <input
        placeholder={placeholder}
        className="input input-bordered text-sm w-full"
        type={type}
        defaultValue={initialValue ?? undefined}
        onChange={(e) => {
          const target = e.target as HTMLInputElement
          if (onChangeHook) onChangeHook(target.value)
        }}
      />
    </label>
  )
}

type GoServerFieldProps = {
  serverName: string
  initialValue?: GoUserAndStrengthSchema
  onChangeTextHook?: (text: string) => void
  onChangeStrengthHook?: (strength: string) => void
}

export function GoServerField({
  serverName,
  initialValue,
  onChangeTextHook,
  onChangeStrengthHook,
}: GoServerFieldProps) {
  return (
    <div className="flex gap-3 col-span-full w-full">
      <SocialsField
        label={serverName}
        placeholder={`Seu usuário no ${serverName}`}
        initialValue={initialValue?.username}
        onChangeHook={onChangeTextHook}
      />
      <Select
        label="Força"
        placeholder={`Sua força no ${serverName}`}
        options={rankings.map((s) => s.name)}
        initialSelection={initialValue?.strength}
        onChangeHook={onChangeStrengthHook}
      />
    </div>
  )
}
