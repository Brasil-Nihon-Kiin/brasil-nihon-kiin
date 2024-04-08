"use client"

import {
  Button,
  ThemeProvider,
} from "@material-tailwind/react"

import { Topbar } from "@components"

export default function Home() {
  return (
    <ThemeProvider>
      <main>
        {/* <Topbar /> */}
        {/* <div className="flex gap-2 p-2">
        <h1 className="text-xl">Hello</h1>
        <Button className="flex mx-10">Here</Button>
      </div> */}
      </main>
    </ThemeProvider>
  )
}
