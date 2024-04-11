import { useState } from "react"

import useCountries from "use-countries"

export function MultiSelect() {
  const { languages, countries } = useCountries()

  console.log(countries)

  const [selectedLanguages, setSelectedLanguages] =
    useState<string[]>([])

  function handleToggle(
    e: React.MouseEvent<HTMLInputElement>
  ) {
    const clickedLanguage = (e.target as HTMLInputElement)
      .dataset.value!
    const selectedLanguagesSet = new Set(selectedLanguages)

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
    <div className="w-full">
      <div className="label">
        <span className="label-text">Países de Origem</span>
      </div>
      <div className="dropdown w-full">
        <div
          tabIndex={0}
          role="button"
          className="btn h-max p-2 w-full justify-start"
        >
          {selectedLanguages.length === 0
            ? "Países de Origem"
            : ""}
          {selectedLanguages.map((l, i) => {
            return (
              <span
                className="text-neutral-100 bg-accent p-[6px] rounded-xl"
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
    </div>
  )
}
