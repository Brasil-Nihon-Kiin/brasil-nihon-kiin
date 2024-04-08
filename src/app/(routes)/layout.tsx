import "./globals.css"
import { Inter } from "next/font/google"

export const metadata = {
  metadataBase: new URL("https://nihonkiin.com.br"),
  title: "Brasil Nihon Kiin",
  description: "Brasil Nihon Kiin",
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
