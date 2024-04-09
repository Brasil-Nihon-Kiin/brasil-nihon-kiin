import { SignIn } from "@clerk/nextjs"

import { setTitle } from "@utils"

export default function Entrar() {
  setTitle("Entrar")

  return <SignIn />
}
