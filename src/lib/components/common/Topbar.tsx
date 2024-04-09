"use client"

import Link from "next/link"

import { UserAvatar } from "@components"
import { Cog6ToothIcon } from "@heroicons/react/24/solid"
import { useUser } from "@clerk/nextjs"

function Logo() {
  return (
    <Link
      href="/"
      className="flex-1 text-2xl font-semibold"
    >
      Brasil Nihon Kiin
    </Link>
  )
}

function PagesNav() {
  return (
    <ul className="menu menu-horizontal px-1">
      <PagesNavItem href="/artigos" text="Artigos" />
      <PagesNavItem href="/calendario" text="Calendário" />
    </ul>
  )
}

type PagesNavItemProps = {
  href: string
  text: string
}

function PagesNavItem({ href, text }: PagesNavItemProps) {
  return (
    <li>
      <Link href={href} className="text-base">
        {text}
      </Link>
    </li>
  )
}

export function Topbar() {
  const { isSignedIn, user } = useUser()

  return (
    <div className="navbar bg-base-100 px-4">
      <Logo />

      <div className="flex-none gap-4">
        <PagesNav />
        {isSignedIn ? (
          <Link
            href={`/usuarios/${user.publicMetadata.nanoid}`}
          >
            <Cog6ToothIcon className="h-6 w-6" />
          </Link>
        ) : null}
        <UserAvatar />
      </div>
    </div>
  )
}
