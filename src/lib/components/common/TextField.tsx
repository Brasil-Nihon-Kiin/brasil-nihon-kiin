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
}

export function TextArea<T extends FieldValues>({
  errors,
  register,
  field,
  label,
}: TextFieldProps<T>) {
  return (
    <label className="form-control w-full col-span-2">
      <div className="label w-full">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        {...register(field as Path<T>)}
        className="textarea textarea-bordered h-24 w-full"
        placeholder="Comecei no Go através de..."
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
}: TextFieldProps<T>) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...register(field as Path<T>)}
        placeholder="Silva"
        className="input input-bordered w-full max-w-xs"
      />
      {errors.lastName && (
        <p className="text-red-500">{`${errors.lastName.message}`}</p>
      )}
    </label>
  )
}
