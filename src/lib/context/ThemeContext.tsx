"use client"

import { createContext, useContext, useState } from "react"

import { ReactChildren } from "@types"

export enum Theme {
  light = "light",
  dark = "dark",
}

type ThemeContext = {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = createContext<ThemeContext | null>(
  null
)

export function ThemeProvider({ children }: ReactChildren) {
  const [theme, setTheme] = useState<Theme>(Theme.light)

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
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