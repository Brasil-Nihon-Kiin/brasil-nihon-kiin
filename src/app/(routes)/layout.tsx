"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { shadesOfPurple } from "@clerk/themes"
import { ptBR } from "@clerk/localizations"

import { Inter } from "next/font/google"

import "./globals.css"

import { ReactChildren } from "@types"

import {
  Theme,
  ThemeProvider,
  useTheme,
} from "@context"

import { Footer, Topbar } from "@components"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: ReactChildren) {
  return (
    <ThemeProvider>
      <ThemedAndAuthedApp>{children}</ThemedAndAuthedApp>
    </ThemeProvider>
  )
}

function ThemedAndAuthedApp({ children }: ReactChildren) {
  const { theme } = useTheme()

  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        baseTheme:
          theme === Theme.dark ? shadesOfPurple : undefined,
      }}
    >
      <html data-theme={theme} lang="pt-BR">
        <body
          className={`${inter.className} grid grid-rows-[auto_1fr_auto] h-screen`}
        >
          <Topbar />
          <main className="flex min-h-[100vh] mb-20 justify-center p-4 pt-10">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
