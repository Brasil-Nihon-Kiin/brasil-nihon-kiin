import { useState } from "react"

import { Theme, useTheme } from "@context"

type MultiSelectProps = {
  label: string
  placeholder: string
  options: string[]
  initialSelection?: string[]
  onChangeHook: (selected: Set<string>) => void
  colSpan?: number | string
}

export function MultiSelect({
  label,
  placeholder,
  options,
  initialSelection,
  onChangeHook,
  colSpan = 1,
}: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>(
    initialSelection ?? []
  )

  function handleToggle(
    e: React.MouseEvent<HTMLInputElement>
  ) {
    const clicked = (e.target as HTMLInputElement).dataset
      .value!
    const selectedSet = new Set(selected)

    selectedSet.has(clicked)
      ? selectedSet.delete(clicked)
      : selectedSet.add(clicked)

    onChangeHook(selectedSet)
    setSelected([...selectedSet])
  }

  function hasSelection() {
    return selected.length !== 0
  }

  const { theme } = useTheme()
  const multiSelectClass =
    theme === Theme.dark
      ? "multiselect-dark"
      : theme === Theme.retro
      ? "multiselect-retro"
      : "multiselect-light"
  const buttonClass = `${multiSelectClass} shadow-none btn h-max p-2 px-3 w-full justify-start font-normal bg-base-100 `

  return (
    <div className={`col-span-${colSpan} w-full`}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className="dropdown w-full">
        <div
          tabIndex={0}
          role="button"
          className={buttonClass}
        >
          {!hasSelection() ? (
            <p className="text-neutral-400">
              {placeholder}
            </p>
          ) : (
            ""
          )}
          {selected.map((l, i) => {
            return (
              <span
                className="text-neutral-100 bg-neutral-700 p-[8px] rounded-xl"
                key={i}
              >
                {l}
              </span>
            )
          })}
        </div>
        <div className="grid grid-cols-1 justify-start gap-2 max-h-[200px] w-52 mt-1 overflow-y-auto p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box">
          {options.map((option, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="checkbox"
                defaultChecked={selected.includes(option)}
                className="checkbox"
                data-value={option}
                onClick={handleToggle}
              />
              <p>{option}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
