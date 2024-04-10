import {
  IconDefinition,
  faFacebook,
  faInstagram,
  faTwitch,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type FooterIconLinkProps = {
  href: string
  icon: IconDefinition
}

function FooterIconLink({
  href,
  icon,
}: FooterIconLinkProps) {
  return (
    <a target="_blank" href={href}>
      <FontAwesomeIcon size={"2x"} icon={icon} />
    </a>
  )
}

export function Footer() {
  return (
    <footer className="footer footer-center p-8 bg-base-200 text-base-content rounded gap-6">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <FooterIconLink
            href="https://facebook.com/BrasilNihonKiin"
            icon={faFacebook}
          />
          <FooterIconLink
            href="https://www.instagram.com/nihon_kiin"
            icon={faInstagram}
          />
          <FooterIconLink
            href="https://www.twitch.tv/brasilnihonkiin"
            icon={faTwitch}
          />
        </div>
      </nav>
      <aside>
        <p>
          Copyright © 2024 | Todos os Direitos Reservados à
          Brasil Nihon Kiin
        </p>
      </aside>
    </footer>
  )
}
