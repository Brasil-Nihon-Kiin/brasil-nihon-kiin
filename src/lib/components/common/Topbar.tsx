"use client"

import { useUser as useClerkUser } from "@clerk/nextjs"

import Link from "next/link"

import {
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/solid"

import { Theme, useTheme } from "@context"

import { CurrentUserAvatar } from "@components"

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
      <Link href={href} className="text-base font-semibold">
        {text}
      </Link>
    </li>
  )
}

export function Topbar() {
  return (
    <div className="navbar bg-base-300 px-4">
      <Logo />
      <div className="flex-none gap-4">
        <PagesNav />
        <div className="flex items-center gap-4">
          <ThemeButton />
          <SettingsButton />
          <CurrentUserAvatar />
        </div>
      </div>
    </div>
  )
}

function SettingsButton() {
  const { isSignedIn, user: clerkUser } = useClerkUser()

  if (isSignedIn)
    return (
      <Link
        href={`/usuarios/${clerkUser.publicMetadata.nanoid}`}
      >
        <Cog6ToothIcon className="h-6 w-6" />
      </Link>
    )
}

function ThemeButton() {
  const { cycleTheme, theme } = useTheme()

  return (
    <button onClick={cycleTheme}>
      {theme === Theme.light ? (
        <RectangleGroupIcon className="h-6 w-6" />
      ) : null}
      {theme === Theme.retro ? (
        <SunIcon className="h-6 w-6" />
      ) : null}
      {theme === Theme.dark ? (
        <MoonIcon className="h-5 w-5" />
      ) : null}
    </button>
  )
}
