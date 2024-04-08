import { Inter } from "next/font/google"
import "./globals.css"

import { ReactChildren } from "@types"

export const metadata = {
  metadataBase: new URL("https://nihonkiin.com.br"),
  title: "Brasil Nihon Kiin",
  description: "A Casa da Brasil Nihon Kiin",
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: ReactChildren) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
