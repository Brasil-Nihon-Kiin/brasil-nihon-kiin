type SelectProps = {
  label: string
  placeholder: string
  options: string[]
  initialSelection?: string | null | undefined
  onChangeHook?: (selected: string) => void
}

export function Select({
  label,
  placeholder,
  options,
  initialSelection,
  onChangeHook,
}: SelectProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        onChange={(e) => {
          const target = e.target as HTMLSelectElement
          const selected = options[target.selectedIndex - 1]
          if (onChangeHook) onChangeHook(selected)
        }}
        className="select select-bordered w-full"
        defaultValue={initialSelection ?? placeholder}
      >
        <option className="text-neutral-100" disabled>
          {placeholder}
        </option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
