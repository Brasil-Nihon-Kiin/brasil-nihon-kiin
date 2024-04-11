import { useState } from "react"

import useCountries from "use-countries"

export function MultiSelect() {
  const { languages } = useCountries()

  const [selectedLanguages, setSelectedLanguages] =
    useState<string[]>([])

  function handleToggle(
    e: React.MouseEvent<HTMLInputElement>
  ) {
    // @ts-ignore
    const clickedLanguage = e.target.dataset.value
    const selectedLanguagesSet = new Set(selectedLanguages)

    console.log(selectedLanguagesSet)

    if (selectedLanguagesSet.has(clickedLanguage)) {
      selectedLanguagesSet.delete(clickedLanguage)
    } else {
      setSelectedLanguages([
        ...selectedLanguages,
        clickedLanguage,
      ])
    }
  }

  return (
    <div className="dropdown w-full">
      <div tabIndex={0} role="button" className="btn">
        {selectedLanguages.length === 0
          ? "Países de Origem"
          : ""}
        {selectedLanguages.map((l, i) => {
          return (
            <span
              className="text-neutral-100 bg-accent p-1 rounded-xl"
              key={i}
            >
              {l}
            </span>
          )
        })}
      </div>
      <div className="grid grid-cols-1 gap-2 max-h-[200px] w-52 mt-1 overflow-y-auto p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box">
        {languages.map((l, i) => {
          return (
            <div key={i} className="flex gap-2">
              <input
                type="checkbox"
                className="checkbox"
                data-value={l.name}
                onClick={handleToggle}
              />
              <p>{l.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
