import { SignIn } from "@clerk/nextjs"

import { setTitle } from "@utils"

export default function Entrar() {
  setTitle("Entrar")

  return (
    <section className="flex items-center justify-center pt-4">
      <SignIn />
    </section>
  )
}
