import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form"

type TextFieldProps<T extends FieldValues> = {
  errors: FieldErrors<T>
  register: UseFormRegister<T>
  field: string
  label: string
  placeholder: string
  colSpan?: number | string
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
        {...register(field as Path<T>)}
        className="textarea textarea-bordered h-24 w-full"
        placeholder={placeholder}
      ></textarea>
      {errors["description"] && (
        <p className="text-red-500">{`${errors["description"].message}`}</p>
      )}
    </label>
  )
}

export function TextField<T extends FieldValues>({
  errors,
  register,
  field,
  label,
  placeholder,
  colSpan = 1,
}: TextFieldProps<T>) {
  return (
    <label
      className={`form-control w-full col-span-${colSpan}`}
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...register(field as Path<T>)}
        placeholder={placeholder}
        className="input input-bordered text-sm w-full max-w-xs"
      />
      {errors.lastName && (
        <p className="text-red-500">{`${errors.lastName.message}`}</p>
      )}
    </label>
  )
}

export function DateField<T extends FieldValues>({
  errors,
  register,
  field,
  label,
  colSpan,
}: Omit<TextFieldProps<T>, "placeholder">) {
  return (
    <label
      className={`form-control w-full col-span-${colSpan}`}
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...register(field as Path<T>)}
        type="date"
        className="input input-bordered text-sm w-full max-w-xs"
      />
      {errors.lastName && (
        <p className="text-red-500">{`${errors.lastName.message}`}</p>
      )}
    </label>
  )
}
