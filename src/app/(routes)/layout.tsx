import type { Metadata } from "next"

import { Inter } from "next/font/google"

import "./globals.css"

import { ReactChildren } from "@types"

import { ThemeProvider, useTheme } from "@context"

import { Topbar } from "@components"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Brasil Nihon Kiin",
  description: "A Casa da Brasil Nihon Kiin",
}

export default function RootLayout({
  children,
}: ReactChildren) {
  return (
    <ThemeProvider>
      <ThemedApp>{children}</ThemedApp>
    </ThemeProvider>
  )
}

function ThemedApp({ children }: ReactChildren) {
  // const { theme } = useTheme()

  return (
    <html
      // data-theme={theme}
      lang="en"
    >
      <body
        className={`${inter.className} grid grid-rows-[auto_1fr_auto] h-screen`}
      >
        <Topbar />
        {children}
      </body>
    </html>
  )
}
