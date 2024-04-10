"use client"

import { createContext, useContext, useState } from "react"

import { ReactChildren } from "@types"

export enum Theme {
  light = "light",
  retro = "retro",
  dark = "dark",
}

type ThemeContext = {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  cycleTheme: () => void
}

const ThemeContext = createContext<ThemeContext | null>(
  null
)

export function ThemeProvider({ children }: ReactChildren) {
  const [theme, setTheme] = useState<Theme>(Theme.retro)

  function cycleTheme() {
    const themes = Object.values(Theme)
    const currentThemeIndex = themes.indexOf(theme)
    const length = themes.length
    const nextIndex = (currentThemeIndex + 1) % length
    const nextTheme = themes[nextIndex]
    setTheme(nextTheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        cycleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      "`useTheme` must be used within a `ThemeProvider`."
    )
  }

  return context
}
