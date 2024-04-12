"use client"

import dynamic from "next/dynamic"

import "./globals.css"

import { ReactChildren } from "@types"

import { ThemeProvider } from "@context"

import { Progress } from "@components"

import { ThemedAndAuthedApp } from "./App"

export default function RootLayout({
  children,
}: ReactChildren) {
  return (
    <ThemeProvider>
      <ThemedAndAuthedApp>{children}</ThemedAndAuthedApp>
      {/* <DynamicApp>{children}</DynamicApp> */}
    </ThemeProvider>
  )
}

const DynamicApp = dynamic(
  () =>
    import("./App").then((mod) => mod.ThemedAndAuthedApp),
  {
    loading: () => (
      <html>
        <body className="justify-center items-center w-[100vw] h-[100vh]">
          <Progress />
        </body>
      </html>
    ),
    ssr: false,
  }
)
