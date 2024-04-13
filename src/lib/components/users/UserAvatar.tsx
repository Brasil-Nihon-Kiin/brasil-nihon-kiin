import { UserButton } from "@clerk/nextjs"

import { User } from "@prisma/client"

import Link from "next/link"
import Image from "next/image"

import { UserIcon } from "@heroicons/react/24/solid"

import "@utils/string"

import { useClerkUser } from "@hooks"

export function CurrentUserAvatar() {
  const { isSignedIn } = useClerkUser()

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
  size?: string
}

export function UserAvatar({
  user,
  size = "24px",
}: UserAvatarProps) {
  if (user.imageLink) {
    return (
      <div className="avatar">
        <div className="rounded-full">
          <Image
            src={user.imageLink}
            alt={user.username}
            style={{ height: size, width: size }}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className="avatar placeholder">
        <div
          className="bg-neutral-100 text-neutral-content rounded-full"
          style={{ height: size, width: size }}
        >
          <span className="text-neutral-700">
            {user.username.first().toUpperCase()}
          </span>
        </div>
      </div>
    )
  }
}
