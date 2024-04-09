import Link from "next/link"

import { UserAvatar } from "@components"

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
      <li>
        <Link href="/artigos" className="text-base">
          Artigos
        </Link>
      </li>
      <li>
        <Link href="/artigos" className="text-base">
          Calendário
        </Link>
      </li>
    </ul>
  )
}

export function Topbar() {
  return (
    <div className="navbar bg-base-100 px-4">
      <Logo />

      <div className="flex-none gap-4">
        <PagesNav />
        <UserAvatar />
      </div>
    </div>
  )
}
