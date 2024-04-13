import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form"

import { FormErrorMessage } from "./FormErrorMessage"
import { TextFieldTypes } from "./TextField"

type CheckboxProps<T extends FieldValues> = {
  errors?: FieldErrors<T>
  register: UseFormRegister<T>
  field: string
  label: string
  colSpan?: number | string
  onChangeHook?: (text: string) => void
}

export function Checkbox<T extends FieldValues>({
  errors,
  register,
  field,
  label,
  colSpan = 1,
  onChangeHook,
}: CheckboxProps<T>) {
  return (
    <label
      className={`form-control w-full col-span-${colSpan}`}
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...register(field as Path<T>)}
        className="toggle"
        type={TextFieldTypes.Checkbox}
        onChange={(e) => {
          const target = e.target as HTMLInputElement
          if (onChangeHook) onChangeHook(target.value)
        }}
      />
      {errors && errors[field] && (
        <FormErrorMessage
          message={`${errors[field]?.message}`}
        />
      )}
    </label>
  )
}
