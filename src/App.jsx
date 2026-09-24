import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Dumbbell,
  HeartPulse,
  Camera,
  Mail,
  MapPin,
  Menu,
  MoveRight,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'

const ease = [0.16, 1, 0.3, 1]
const imageUrl = (filename) => `${import.meta.env.BASE_URL}images/${filename}`

const programs = [
  {
    number: '01',
    icon: Target,
    title: 'Trening 1:1',
    copy: 'Pełna uwaga, plan pod Twój cel i technika dopracowana od pierwszego powtórzenia.',
    meta: '60 min · studio',
    tone: 'lime',
  },
  {
    number: '02',
    icon: Users,
    title: 'Duet / Small group',
    copy: 'Energia wspólnego treningu i nadal indywidualne prowadzenie — maksymalnie 4 osoby.',
    meta: '60 min · 2–4 osoby',
    tone: 'paper',
  },
  {
    number: '03',
    icon: Video,
    title: 'Coaching online',
    copy: 'Plan w aplikacji, cotygodniowy check-in i analiza techniki. Trenujesz tam, gdzie chcesz.',
    meta: 'opieka · co tydzień',
    tone: 'dark',
  },
]

const testimonials = [
  {
    quote:
      'Pierwszy raz nie dostałam planu „z szuflady”. Po 12 tygodniach mam więcej energii, a ból pleców przestał dyktować mi dzień.',
    name: 'Ola, 34',
    result: '+42% siły · 12 tygodni',
  },
  {
    quote:
      'Marek nauczył mnie trenować mądrze, nie po prostu mocno. Po pół roku zrobiłem pierwszy podciąg i przebiegłem 10 km bez zadyszki.',
    name: 'Paweł, 41',
    result: '–9 kg · 24 tygodnie',
  },
  {
    quote:
      'Online działa zaskakująco osobiście. Dostaję korekty wideo, plan pasuje do wyjazdów, a wreszcie mam regularność bez presji.',
    name: 'Marta, 29',
    result: '3 treningi / tydzień',
  },
]

const faqs = [
  {
    q: 'Czy muszę mieć doświadczenie na siłowni?',
    a: 'Nie. Zaczynamy od krótkiej konsultacji i oceny ruchu, a ćwiczenia dobieram do Twojego aktualnego poziomu. Pierwsze tygodnie służą zbudowaniu pewności i dobrej techniki.',
  },
  {
    q: 'Gdzie odbywają się treningi?',
    a: 'W kameralnym studiu na warszawskim Mokotowie, 4 minuty od metra Wilanowska. Na miejscu są szatnie, prysznice i bezpłatny parking na czas treningu.',
  },
  {
    q: 'Jak wygląda pierwsze spotkanie?',
    a: 'Rozmawiamy o celu, codziennym rytmie i ewentualnych ograniczeniach. Potem robimy prosty screening ruchowy i krótki trening próbny. W ciągu 48 godzin dostajesz rekomendację planu.',
  },
  {
    q: 'Czy układasz dietę?',
    a: 'Pomagam budować praktyczne nawyki żywieniowe i monitorować regularność. Jeżeli potrzebujesz dietoterapii lub jadłospisu klinicznego, kieruję do współpracującego dietetyka.',
  },
]

const pricePlans = {
  studio: [
    {
      name: 'Start',
      price: '159 zł',
      unit: '/ trening',
      description: 'Dla osób, które chcą trenować 1× w tygodniu.',
      features: ['4 treningi 1:1', 'Plan bazowy', 'Pomiar startowy', 'Kontakt w dni robocze'],
    },
    {
      name: 'Progres',
      price: '139 zł',
      unit: '/ trening',
      description: 'Najlepszy rytm do budowania trwałego efektu.',
      features: ['8 treningów 1:1', 'Plan na dni samodzielne', 'Miesięczny pomiar', 'Wsparcie WhatsApp'],
      featured: true,
    },
    {
      name: 'Duet',
      price: '99 zł',
      unit: '/ osoba',
      description: 'Trenuj z bliską osobą i dzielcie motywację.',
      features: ['8 treningów w duecie', '2 indywidualne plany', 'Pomiar startowy', 'Stałe terminy'],
    },
  ],
  online: [
    {
      name: 'Online Base',
      price: '349 zł',
      unit: '/ miesiąc',
      description: 'Jasny plan i regularna kontrola postępów.',
      features: ['Plan w aplikacji', 'Check-in co 2 tygodnie', 'Biblioteka ćwiczeń', '1 korekta wideo / tydzień'],
    },
    {
      name: 'Online Plus',
      price: '549 zł',
      unit: '/ miesiąc',
      description: 'Pełna opieka dla szybszego i spokojnego progresu.',
      features: ['Plan aktualizowany co tydzień', 'Cotygodniowy videocall', 'Nielimitowane korekty', 'Wsparcie priorytetowe'],
      featured: true,
    },
    {
      name: 'Hybryda',
      price: '699 zł',
      unit: '/ miesiąc',
      description: 'Online na co dzień, studio wtedy, gdy go potrzebujesz.',
      features: ['Pełny coaching online', '2 treningi w studio', 'Analiza techniki', 'Monitoring nawyków'],
    },
  ],
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function ArrowButton({ children, variant = 'lime', onClick, href, type = 'button' }) {
  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      className={`arrow-button arrow-button--${variant}`}
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      <span>{children}</span>
      <span className="arrow-button__icon">
        <ArrowUpRight size={17} strokeWidth={2.4} />
      </span>
    </Tag>
  )
}

function Header({ onBook }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const goTo = () => setOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#top" className="brand" aria-label="FORMA/01 — strona główna">
        <span className="brand__mark">F/01</span>
        <span className="brand__name">FORMA<span>/01</span></span>
      </a>
      <nav className="desktop-nav" aria-label="Główna nawigacja">
        <a href="#metoda">Metoda</a>
        <a href="#oferta">Oferta</a>
        <a href="#o-mnie">O mnie</a>
        <a href="#cennik">Cennik</a>
      </nav>
      <div className="header-actions">
        <button className="header-cta" onClick={onBook}>Umów konsultację <ArrowUpRight size={16} /></button>
        <button
          className="menu-toggle"
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#metoda" onClick={goTo}>Metoda</a>
            <a href="#oferta" onClick={goTo}>Oferta</a>
            <a href="#o-mnie" onClick={goTo}>O mnie</a>
            <a href="#cennik" onClick={goTo}>Cennik</a>
            <button onClick={() => { goTo(); onBook() }}>Umów konsultację</button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero({ onBook }) {
  const [pointer, setPointer] = useState({ x: 50, y: 50 })

  return (
    <section
      className="hero"
      id="top"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        setPointer({
          x: ((event.clientX - bounds.left) / bounds.width) * 100,
          y: ((event.clientY - bounds.top) / bounds.height) * 100,
        })
      }}
      style={{ '--mx': `${pointer.x}%`, '--my': `${pointer.y}%` }}
    >
      <img
        className="hero__image"
        src={imageUrl('hero-forma01.png')}
        alt="Trener personalny pomaga podopiecznej wykonać ćwiczenie z kettlebell w kameralnym studiu"
      />
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__content">
        <motion.div
          className="eyebrow eyebrow--light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease }}
        >
          <span className="eyebrow__dot" /> Trening personalny · Warszawa Mokotów
        </motion.div>
        <div className="hero__headline-wrap">
          <motion.h1
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease }}
          >
            <span>Silniejszy.</span>
            <span className="outline-word">Sprawniejszy.</span>
            <span>Na swoich zasadach.</span>
          </motion.h1>
          <motion.div
            className="hero__side-copy"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.55, ease }}
          >
            <p>
              Bez presji i planów z internetu. Dostajesz trening, który pasuje do Twojego ciała, celu i kalendarza.
            </p>
            <ArrowButton onClick={onBook}>Bezpłatna konsultacja</ArrowButton>
          </motion.div>
        </div>
        <motion.div
          className="hero__footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="hero__proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>MK</span><span>OL</span><span>+97</span>
            </div>
            <div>
              <div className="stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div>
              <small>5.0 · 100+ zrealizowanych celów</small>
            </div>
          </div>
          <a className="scroll-cue" href="#metoda">
            <span>Przewiń i poznaj metodę</span>
            <span className="scroll-cue__line" />
          </a>
        </motion.div>
      </div>
      <Marquee />
    </section>
  )
}

function Marquee() {
  const items = ['SIŁA', 'SPRAWNOŚĆ', 'ENERGIA', 'MOBILNOŚĆ', 'PEWNOŚĆ', 'REGULARNOŚĆ']
  return (
    <div className="marquee" aria-label="Korzyści z treningu">
      <motion.div
        className="marquee__track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
      >
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}><Sparkles size={18} /> {item}</span>
        ))}
      </motion.div>
    </div>
  )
}

function Method() {
  return (
    <section className="section method" id="metoda">
      <div className="container">
        <div className="section-heading split-heading">
          <Reveal>
            <span className="eyebrow"><span className="eyebrow__dot" /> Metoda FORMA/01</span>
            <h2>Plan, który pracuje<br />razem z Tobą.</h2>
          </Reveal>
          <Reveal className="split-heading__copy" delay={0.12}>
            <p>
              Zamiast gonić za idealnym planem, budujemy system, który możesz utrzymać. Mierzymy to, co ma znaczenie i zmieniamy tylko to, co trzeba.
            </p>
            <a className="text-link" href="#proces">Jak wygląda współpraca <MoveRight size={17} /></a>
          </Reveal>
        </div>

        <div className="method-grid">
          <Reveal className="metric-card metric-card--lime">
            <span className="metric-card__label">Skuteczność systemu</span>
            <strong>92<span>%</span></strong>
            <p>podopiecznych utrzymuje regularność po pierwszych 90 dniach.</p>
            <div className="mini-chart" aria-hidden="true">
              {[42, 54, 50, 66, 64, 76, 82, 92].map((height, index) => (
                <motion.span
                  key={index}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.05, duration: 0.55, ease }}
                />
              ))}
            </div>
          </Reveal>
          <Reveal className="method-photo" delay={0.1}>
            <img src={imageUrl('group-training.png')} alt="Kameralny trening funkcjonalny pod opieką trenera" />
            <div className="photo-badge"><Users size={17} /> Maks. 4 osoby</div>
          </Reveal>
          <Reveal className="principles-card" delay={0.2}>
            <div className="principle">
              <span><Activity size={20} /></span>
              <div><strong>Ruch bez bólu</strong><p>Technika i zakres dopasowane do Ciebie.</p></div>
            </div>
            <div className="principle">
              <span><Zap size={20} /></span>
              <div><strong>Progres bez chaosu</strong><p>Małe zmiany, mierzalny kierunek.</p></div>
            </div>
            <div className="principle">
              <span><HeartPulse size={20} /></span>
              <div><strong>Forma na lata</strong><p>Nawyki, które zostają poza siłownią.</p></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Programs({ onBook }) {
  return (
    <section className="section programs" id="oferta">
      <div className="container">
        <Reveal className="section-heading programs__heading">
          <span className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> Wybierz swój format</span>
          <h2>Jedna metoda.<br /><em>Trzy drogi do celu.</em></h2>
        </Reveal>
        <div className="program-grid">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <Reveal key={program.title} delay={index * 0.08}>
                <motion.article
                  className={`program-card program-card--${program.tone}`}
                  whileHover={{ y: -9 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                >
                  <div className="program-card__top">
                    <span className="program-card__number">{program.number}</span>
                    <span className="program-card__icon"><Icon size={24} /></span>
                  </div>
                  <div>
                    <h3>{program.title}</h3>
                    <p>{program.copy}</p>
                  </div>
                  <div className="program-card__footer">
                    <span>{program.meta}</span>
                    <button aria-label={`Sprawdź ${program.title}`} onClick={onBook}><ArrowUpRight size={20} /></button>
                  </div>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function About({ onBook }) {
  return (
    <section className="section about" id="o-mnie">
      <div className="container about__grid">
        <Reveal className="about__image-wrap">
          <div className="about__image">
            <img src={imageUrl('trainer-marek.png')} alt="Marek Lewandowski, trener personalny FORMA/01" />
          </div>
          <motion.div
            className="experience-stamp"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 120 120">
              <defs><path id="circle" d="M 60,60 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0" /></defs>
              <text><textPath href="#circle">TRENUJ MĄDRZE • CZUJ SIĘ MOCNO • </textPath></text>
            </svg>
            <span>8+</span>
          </motion.div>
        </Reveal>
        <div className="about__content">
          <Reveal>
            <span className="eyebrow"><span className="eyebrow__dot" /> Twój trener</span>
            <h2>Marek Lewandowski.<br /><em>Ruch to narzędzie, nie kara.</em></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about__lead">
              Pomagam zapracowanym osobom odzyskać siłę, swobodę ruchu i pewność siebie — bez ekstremów, wyścigu z innymi i życia podporządkowanego siłowni.
            </p>
            <p>
              Przez 8 lat pracy nauczyłem się, że najlepszy plan to nie ten najbardziej efektowny, tylko ten, który naprawdę mieści się w Twoim tygodniu.
            </p>
          </Reveal>
          <Reveal className="credentials" delay={0.18}>
            <div><Award size={20} /><span><strong>PFS</strong> Trener personalny</span></div>
            <div><ShieldCheck size={20} /><span><strong>FMS L1</strong> Ocena ruchu</span></div>
            <div><HeartPulse size={20} /><span><strong>Precision Nutrition</strong> L1</span></div>
          </Reveal>
          <Reveal delay={0.24}>
            <ArrowButton variant="dark" onClick={onBook}>Poznajmy się</ArrowButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    ['01', 'Rozmowa', 'Poznaję Twój cel, rytm dnia i wcześniejsze doświadczenia. Bez oceny i bez zobowiązań.'],
    ['02', 'Diagnoza', 'Sprawdzamy podstawowe wzorce ruchu, ustalamy punkt startu i realny kierunek.'],
    ['03', 'Plan', 'Dostajesz konkretny plan tygodnia: trening, ruch poza siłownią i proste priorytety.'],
    ['04', 'Progres', 'Co 4 tygodnie podsumowujemy wyniki i aktualizujemy plan, żeby nadal działał.'],
  ]

  return (
    <section className="section process" id="proces">
      <div className="container">
        <Reveal className="section-heading process__heading">
          <span className="eyebrow"><span className="eyebrow__dot" /> Bez zgadywania</span>
          <h2>Od pierwszej rozmowy<br />do pierwszego efektu.</h2>
        </Reveal>
        <div className="process-list">
          {steps.map(([number, title, copy], index) => (
            <Reveal key={number} delay={index * 0.06}>
              <motion.article className="process-step" whileHover={{ x: 8 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
                <span className="process-step__number">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <span className="process-step__arrow"><ArrowRight size={21} /></span>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const item = testimonials[active]
  const change = (direction) => {
    setActive((current) => (current + direction + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section testimonials">
      <div className="container testimonials__grid">
        <Reveal className="testimonials__intro">
          <span className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> Historie podopiecznych</span>
          <h2>Rezultat to więcej niż liczba.</h2>
          <div className="testimonial-controls">
            <button onClick={() => change(-1)} aria-label="Poprzednia opinia"><ArrowLeft /></button>
            <span>{String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span>
            <button onClick={() => change(1)} aria-label="Następna opinia"><ArrowRight /></button>
          </div>
        </Reveal>
        <div className="testimonial-card-wrap">
          <AnimatePresence mode="wait">
            <motion.article
              key={active}
              className="testimonial-card"
              initial={{ opacity: 0, x: 30, rotate: 1 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -25, rotate: -1 }}
              transition={{ duration: 0.45, ease }}
            >
              <Quote className="quote-icon" size={44} strokeWidth={1.5} />
              <blockquote>„{item.quote}”</blockquote>
              <div className="testimonial-card__footer">
                <div className="testimonial-person"><span>{item.name.slice(0, 1)}</span><strong>{item.name}</strong></div>
                <span className="result-pill">{item.result}</span>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Pricing({ onBook }) {
  const [mode, setMode] = useState('studio')
  const plans = useMemo(() => pricePlans[mode], [mode])

  return (
    <section className="section pricing" id="cennik">
      <div className="container">
        <div className="section-heading pricing__heading">
          <Reveal>
            <span className="eyebrow"><span className="eyebrow__dot" /> Jasne zasady</span>
            <h2>Wybierz tempo.<br />Resztę zaplanujemy razem.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mode-switch" role="tablist" aria-label="Rodzaj współpracy">
              <button className={mode === 'studio' ? 'is-active' : ''} onClick={() => setMode('studio')} role="tab">W studio</button>
              <button className={mode === 'online' ? 'is-active' : ''} onClick={() => setMode('online')} role="tab">Online</button>
              <span className={mode === 'online' ? 'to-right' : ''} />
            </div>
          </Reveal>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            className="pricing-grid"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {plans.map((plan) => (
              <article className={`price-card ${plan.featured ? 'price-card--featured' : ''}`} key={plan.name}>
                {plan.featured && <span className="popular-pill">Najczęściej wybierany</span>}
                <span className="price-card__name">{plan.name}</span>
                <div className="price"><strong>{plan.price}</strong><span>{plan.unit}</span></div>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => <li key={feature}><Check size={17} /> {feature}</li>)}
                </ul>
                <ArrowButton variant={plan.featured ? 'lime' : 'ghost'} onClick={onBook}>Wybieram {plan.name}</ArrowButton>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
        <p className="pricing-note">Pakiety są ważne 35 dni. Pierwsza konsultacja i trening próbny: <strong>0 zł</strong>.</p>
      </div>
    </section>
  )
}

function FAQ() {
  const [active, setActive] = useState(0)
  return (
    <section className="section faq" id="faq">
      <div className="container faq__grid">
        <Reveal className="faq__intro">
          <span className="eyebrow"><span className="eyebrow__dot" /> FAQ</span>
          <h2>Zanim zaczniemy.</h2>
          <p>Nie widzisz swojej odpowiedzi? Napisz — odpowiem bez sprzedażowego scenariusza.</p>
          <a href="mailto:czesc@forma01.pl" className="text-link">czesc@forma01.pl <MoveRight size={17} /></a>
        </Reveal>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = active === index
            return (
              <Reveal key={faq.q} delay={index * 0.04}>
                <article className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button onClick={() => setActive(isOpen ? -1 : index)} aria-expanded={isOpen}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{faq.q}</strong>
                    <ChevronDown size={20} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ClosingCTA({ onBook }) {
  return (
    <section className="closing-cta">
      <img className="closing-cta__image" src={imageUrl('hero-forma01.png')} alt="" aria-hidden="true" loading="lazy" />
      <div className="closing-cta__overlay" aria-hidden="true" />
      <div className="container closing-cta__content">
        <Reveal>
          <span className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> Zrób pierwszy krok</span>
          <h2>Twoja forma nie musi<br />czekać na „lepszy moment”.</h2>
          <p>30 minut rozmowy. Zero presji. Konkretny pomysł na Twój start.</p>
          <ArrowButton onClick={onBook}>Umów bezpłatną konsultację</ArrowButton>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div>
          <a href="#top" className="footer__brand">FORMA<span>/01</span></a>
          <p>Trening, który pasuje<br />do prawdziwego życia.</p>
        </div>
        <div className="footer__column">
          <span>Menu</span>
          <a href="#metoda">Metoda</a><a href="#oferta">Oferta</a><a href="#o-mnie">O mnie</a><a href="#cennik">Cennik</a>
        </div>
        <div className="footer__column">
          <span>Kontakt</span>
          <a href="mailto:czesc@forma01.pl"><Mail size={15} /> czesc@forma01.pl</a>
          <a href="tel:+48500102030"><Phone size={15} /> +48 500 102 030</a>
          <a href="#mapa"><MapPin size={15} /> Warszawa, Mokotów</a>
        </div>
        <div className="footer__column">
          <span>Social</span>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><Camera size={15} /> Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} FORMA/01</span>
        <span>Szablon demonstracyjny · Polityka prywatności · Wszystkie dane i zeznania na stronie są fikcyjne</span>
        <a href="#top">Do góry <ArrowUpRight size={15} /></a>
      </div>
    </footer>
  )
}

function BookingModal({ open, onClose }) {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const close = () => {
    onClose()
    window.setTimeout(() => setSent(false), 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={close}>
          <motion.div
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={close} aria-label="Zamknij"><X /></button>
            {!sent ? (
              <>
                <div className="booking-modal__header">
                  <span className="eyebrow"><span className="eyebrow__dot" /> Pierwszy krok</span>
                  <h2 id="booking-title">Umów bezpłatną konsultację.</h2>
                  <p>Zostaw kontakt. Oddzwonię w ciągu jednego dnia roboczego i wspólnie wybierzemy termin.</p>
                </div>
                <form onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
                  <label>Jak masz na imię?<input type="text" name="name" placeholder="Twoje imię" required /></label>
                  <div className="form-row">
                    <label>E-mail<input type="email" name="email" placeholder="ty@email.pl" required /></label>
                    <label>Telefon<input type="tel" name="phone" placeholder="+48 000 000 000" required /></label>
                  </div>
                  <label>Co jest Twoim celem?
                    <select name="goal" defaultValue="">
                      <option value="" disabled>Wybierz główny cel</option>
                      <option>Więcej siły i sprawności</option>
                      <option>Redukcja masy ciała</option>
                      <option>Powrót do regularnego ruchu</option>
                      <option>Przygotowanie do wyzwania</option>
                    </select>
                  </label>
                  <button className="form-submit" type="submit">Wyślij zgłoszenie <ArrowUpRight size={18} /></button>
                  <small>Wysyłając formularz, zgadzasz się na kontakt w sprawie konsultacji.</small>
                </form>
              </>
            ) : (
              <motion.div className="success-state" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                <span><Check size={34} /></span>
                <h2>Dobra decyzja.</h2>
                <p>Formularz demonstracyjny działa poprawnie. W wersji produkcyjnej w tym miejscu zgłoszenie trafi do Twojej skrzynki lub kalendarza.</p>
                <button onClick={close}>Wróć do strony</button>
              </motion.div>
            )}
            <div className="booking-modal__aside">
              <div className="aside-mark">F/01</div>
              <div>
                <span><CalendarDays size={18} /> 30 minut</span>
                <span><Clock3 size={18} /> Bez zobowiązań</span>
                <span><MapPin size={18} /> Online lub studio</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header onBook={() => setBookingOpen(true)} />
      <main>
        <Hero onBook={() => setBookingOpen(true)} />
        <Method />
        <Programs onBook={() => setBookingOpen(true)} />
        <About onBook={() => setBookingOpen(true)} />
        <Process />
        <Testimonials />
        <Pricing onBook={() => setBookingOpen(true)} />
        <FAQ />
        <ClosingCTA onBook={() => setBookingOpen(true)} />
      </main>
      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
