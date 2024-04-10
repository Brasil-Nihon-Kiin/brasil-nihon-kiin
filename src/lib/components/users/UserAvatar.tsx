import { UserButton, useUser } from "@clerk/nextjs"

import { User } from "@prisma/client"

import Link from "next/link"
import Image from "next/image"

import "@utils/string"

import { UserIcon } from "@heroicons/react/24/solid"

export function CurrentUserAvatar() {
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

type UserAvatarProps = {
  user: User
}

export function UserAvatar({ user }: UserAvatarProps) {
  if (user.imageLink) {
    return (
      <div className="avatar">
        <div className="w-6 rounded-full">
          <Image src={user.imageLink} alt={user.username} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="avatar placeholder">
        <div className="bg-neutral-100 text-neutral-content rounded-full w-6">
          <span className="text-neutral-700">
            {user.username.first().toUpperCase()}
          </span>
        </div>
      </div>
    )
  }
}
