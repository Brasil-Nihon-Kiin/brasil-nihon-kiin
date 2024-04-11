import { useState } from "react"

type MultiSelectProps = {
  label: string
  placeHolder: string
  options: string[]
}

export function MultiSelect({
  label,
  placeHolder,
  options,
}: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>([])

  function handleToggle(
    e: React.MouseEvent<HTMLInputElement>
  ) {
    const clicked = (e.target as HTMLInputElement).dataset
      .value!
    const selectedSet = new Set(selected)

    if (selectedSet.has(clicked)) {
      selectedSet.delete(clicked)
      setSelected([...selectedSet])
    } else {
      setSelected([...selected, clicked])
    }
  }

  function hasSelection() {
    return selected.length !== 0
  }

  return (
    <div className="w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className="dropdown w-full">
        <div
          tabIndex={0}
          role="button"
          className={`btn h-max p-2 px-3 w-full justify-start font-normal bg-base-100`}
        >
          {!hasSelection() ? (
            <p className="text-neutral-400">
              {placeHolder}
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
          {options.map((l, i) => {
            return (
              <div key={i} className="flex gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  data-value={l}
                  onClick={handleToggle}
                />
                <p>{l}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
