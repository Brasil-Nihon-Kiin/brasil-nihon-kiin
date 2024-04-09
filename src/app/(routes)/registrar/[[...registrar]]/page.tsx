import { SignUp } from "@clerk/nextjs"

import { setTitle } from "@utils"

export default function Registrar() {
  setTitle("Registrar")

  return <SignUp />
}
