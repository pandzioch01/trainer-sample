import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export default function NotFound() {
  const home = import.meta.env.BASE_URL

  useEffect(() => {
    document.title = 'Nie znaleziono strony — FORMA/01'
  }, [])

  return (
    <main className="not-found">
      <img
        className="not-found__image"
        src={`${home}images/hero-forma01.png`}
        alt=""
        aria-hidden="true"
      />
      <div className="not-found__veil" aria-hidden="true" />
      <div className="container not-found__inner">
        <a href={home} className="not-found__brand" aria-label="FORMA/01 — strona główna">
          <span className="brand__mark">F/01</span>
          <span className="brand__name">FORMA<span>/01</span></span>
        </a>

        <div className="not-found__content">
          <span className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> Zgubiona trasa</span>
          <span className="not-found__number" aria-hidden="true">404</span>
          <h1>Tu nie ma<br />tej strony.</h1>
          <p>Wygląda na to, że ten adres prowadzi donikąd. Wróć na start i znajdź swoją drogę do formy.</p>
          <a className="not-found__button" href={home}>
            <ArrowLeft size={18} /> Wróć na stronę główną <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="not-found__footer">FORMA/01 · Trening, który pasuje do prawdziwego życia.</div>
      </div>
    </main>
  )
}
