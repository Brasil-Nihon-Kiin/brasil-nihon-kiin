"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import { ReactChildren } from "@types"

export enum Theme {
  light = "light",
  retro = "retro",
  dark = "dark",
}

export function stringToTheme(s: string) {
  return Object.values(Theme).find((t) => t === s)!
}

type ThemeContext = {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  cycleTheme: () => void
  syncTheme: () => void
}

const ThemeContext = createContext<ThemeContext | null>(
  null
)

export function ThemeProvider({ children }: ReactChildren) {
  function getPreference() {
    if (typeof localStorage !== "undefined") {
      const storedPreference = localStorage.getItem("theme")
      return storedPreference
        ? stringToTheme(storedPreference)
        : Theme.retro
    } else {
      return Theme.retro
    }
  }

  function savePreference(theme: Theme) {
    localStorage.setItem("theme", theme)
  }

  function syncTheme() {
    setTheme(getPreference())
  }

  const [theme, setTheme] = useState<Theme>(getPreference())

  function cycleTheme() {
    const themes = Object.values(Theme)
    const currentThemeIndex = themes.indexOf(theme)
    const length = themes.length
    const nextIndex = (currentThemeIndex + 1) % length
    const nextTheme = themes[nextIndex]
    savePreference(nextTheme)
    setTheme(nextTheme)
  }

  useEffect(() => {
    syncTheme()
    document.documentElement.dataset.theme = theme

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        cycleTheme,
        syncTheme,
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
