import Image from "next/image"
import Link from "next/link"

function Logo() {
  return (
    <Link
      href="/"
      className="flex-1 text-2xl font-semibold pl-3"
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
    </ul>
  )
}

function UserAvatarButton() {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <Image
            alt="Tailwind CSS Navbar component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            width={32}
            height={32}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">Profile</a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  )
}

export function Topbar() {
  return (
    <div className="navbar bg-base-100">
      <Logo />

      <div className="flex-none">
        <PagesNav />
        <UserAvatarButton />
      </div>
    </div>
  )
}
