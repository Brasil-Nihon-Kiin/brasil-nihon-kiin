export default function Sobre() {
  return (
    <div className="flex flex-col gap-10">
      <Endereco />
      <BrasilNihonKiinHistory />
    </div>
  )
}

function Endereco() {
  return (
    <article className="prose">
      <h1>Localização</h1>
      <p>
        A Brasil Nihon Kiin está localizada na Vila Mariana,
        em São Paulo-SP. Todos são muito bem-vindos a
        visitar!
      </p>
      <p>O endereço completo é:</p>
      <div className="flex flex-col gap-0 ml-4 font-semibold">
        <p className="m-0">Rua Dr. Fabrício Vampré</p>
        <p className="m-0">Vila Mariana, São Paulo-SP</p>
      </div>
    </article>
  )
}

function TimelineCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function BrasilNihonKiinHistory() {
  return (
    <article className="prose">
      <h1>História da Brasil Nihon Kiin</h1>
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <li>
          <div className="timeline-middle">
            <TimelineCheckIcon />
          </div>
          <div className="timeline-start md:text-end mb-10">
            <time className="font-mono italic">1989</time>
            <div className="text-lg font-black">
              Fundação da Brasil Nihoon Kiin
            </div>
            Brasil Nihon Kiin é fundada pelo profissional
            multi-campeão Iwamoto Kaoru 9p.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <TimelineCheckIcon />
          </div>
          <div className="timeline-end mb-10">
            <time className="font-mono italic">2008</time>
            <div className="text-lg font-black">
              Disputa de Título Kisei
            </div>
            A Brasil Nihon Kiin foi sede da primeira partida
            da disputa de título entre Cho Chikun 9p e
            Yamashita Keigo 9p.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <TimelineCheckIcon />
          </div>
          <div className="timeline-start md:text-end mb-10">
            <time className="font-mono italic">2019</time>
            <div className="text-lg font-black">
              Sede do Congresso Iberoamericano de Go
            </div>
            Em um renovado Congresso Iberoamericano, a
            Brasil Nihon Kiin sedia mais uma vez o torneio.
          </div>
        </li>
      </ul>
    </article>
  )
}
