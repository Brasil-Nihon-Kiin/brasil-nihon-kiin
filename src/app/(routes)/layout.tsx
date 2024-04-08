"use client"

import { Inter } from "next/font/google"

import "./globals.css"

import { ReactChildren } from "@types"

import { ThemeProvider, useColorProvider } from "@context"

import { Topbar } from "@components"

const inter = Inter({ subsets: ["latin"] })

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
  const { theme } = useColorProvider()

  return (
    <html data-theme={theme} lang="en">
      <body
        className={`${inter.className} grid grid-rows-[auto_1fr_auto] h-screen`}
      >
        <Topbar />
        {children}
      </body>
    </html>
  )
}
