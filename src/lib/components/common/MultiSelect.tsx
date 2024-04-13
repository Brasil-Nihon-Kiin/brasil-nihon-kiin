import { useState } from "react"

import { Id } from "@types"

import { Theme, useTheme } from "@context"

export type MultiSelectOption = {
  key: string
  value: string
}

type MultiSelectProps = {
  label: string
  placeholder: string
  options: MultiSelectOption[]
  initialSelection?: MultiSelectOption[]
  onChangeHook: (selected: MultiSelectOption[]) => void
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
  const [selected, setSelected] = useState<
    MultiSelectOption[]
  >(initialSelection ?? [])

  function handleToggle(
    e: React.MouseEvent<HTMLInputElement>
  ) {
    const target = e.target as HTMLInputElement
    const dataset = target.dataset

    const clicked = {
      key: dataset.key!,
      value: dataset.value!,
    }
    const selectedSet = new Set(selected.map((s) => s.key))

    selectedSet.has(clicked.key)
      ? selectedSet.delete(clicked.key)
      : selectedSet.add(clicked.key)

    const newSelected = options.filter((o) =>
      selectedSet.has(o.key)
    )

    onChangeHook(newSelected)
    setSelected(newSelected)
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
                {l.value}
              </span>
            )
          })}
        </div>
        <div className="grid grid-cols-1 justify-start gap-2 max-h-[200px] w-52 mt-1 overflow-y-auto p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box">
          {options.map((option, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="checkbox"
                defaultChecked={selected
                  .map((s) => s.value)
                  .includes(option.value)}
                className="checkbox"
                data-key={option.key}
                data-value={option.value}
                onClick={handleToggle}
              />
              <p>{option.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
