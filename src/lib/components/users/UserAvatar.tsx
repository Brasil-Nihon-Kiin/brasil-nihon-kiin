import { UserButton, useUser } from "@clerk/nextjs"

import Link from "next/link"

import "@utils/string"

import { UserIcon } from "@heroicons/react/24/solid"

export function UserAvatar() {
  const { isSignedIn } = useUser()

  return isSignedIn ? (
    <Link href="editar-perfil">
      <UserButton afterSignOutUrl="/" />
    </Link>
  ) : (
    <Link href="/entrar">
      <UserIcon className="h-6 w-6" />
    </Link>
  )
}
