"use client"

import React from "react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navLinks = [
    { href: '#approach', label: 'Подход' },
    { href: '#work-with', label: 'Запросы' },
    { href: '#results', label: 'Результаты' },
    { href: '#methods', label: 'Методы' },
    { href: '#services', label: 'Услуги' },
    { href: '#products', label: 'Продукты' },
    { href: '#reviews-education', label: 'Отзывы' },
    { href: '#contact-me', label: 'Контакты' },
  ]
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm py-6 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a
          href="#top"
          className="text-2xl font-bold tracking-tighter"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          АФИН
        </a>
        <div className="hidden md:flex gap-6 lg:gap-8 text-xs tracking-widest flex-wrap justify-end">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="uppercase hover:opacity-70 transition-opacity">{link.label}</a>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-3 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:opacity-70 transition-opacity"
          aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/20 flex flex-col gap-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="uppercase text-xs tracking-widest hover:opacity-70 transition-opacity py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function TypewriterText({ text }: { text: string }) {
  // Нормализуем переносы: и символ \n, и литерал "\" + "n"
  const normalizedText = text.replace(/\\n/g, '\n')
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hasLeft, setHasLeft] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isComplete) {
            setHasLeft(true)
          }
          if (entry.isIntersecting && isComplete && hasLeft) {
            setDisplayText("")
            setCurrentIndex(0)
            setIsComplete(false)
            setHasLeft(false)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isComplete, hasLeft])

  useEffect(() => {
    if (currentIndex < normalizedText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + normalizedText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else if (currentIndex === normalizedText.length && !isComplete) {
      setIsComplete(true)
    }
  }, [currentIndex, normalizedText, isComplete])

  return (
    <span ref={ref}>
      {displayText.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i < displayText.split('\n').length - 1 ? <br /> : null}
        </span>
      ))}
      {!isComplete && <span>|</span>}
    </span>
  )
}

const TAGLINE_TEXT = "Свобода от тревоги. Внутренняя опора. Здоровые границы."

function HeroSection() {
  return (
    <section id="top" className="min-h-screen flex items-center px-6 pt-24 pb-12 bg-black text-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight mb-8">
              ПРИВЕТ,<br />Я ИГОРЬ<br />АФИН
            </h1>
            {/* Подзаголовок: text-lg (18px) → md:text-xl (20px). Слоган длиннее в 52/22 раз → размер 22/52 от подзаголовка + запас */}
            <span className="inline-block text-lg md:text-xl font-light tracking-widest uppercase mb-2">
              Аналитический психолог
            </span>
            <p className="inline-block font-light tracking-wide mb-8 opacity-60 whitespace-nowrap min-h-[1.5em] leading-tight text-[0.64rem] md:text-[0.71rem]">
              <TypewriterText text={TAGLINE_TEXT} />
            </p>
            <a 
              href="#contact-me" 
              className="inline-flex w-fit bg-white text-black px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-black tracking-widest hover:scale-105 transition-transform"
            >
              Забронировать время
            </a>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] bg-neutral-900 overflow-hidden">
              <Image
                src="/igor-portrait.webp"
                alt="Портрет психолога"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 448px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FadeInText({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasShownRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasShownRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasShownRef.current) {
            hasShownRef.current = true
            setTimeout(() => setIsVisible(true), delay)
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  )
}

function ApproachSection() {
  return (
    <section id="approach" className="py-16 md:py-24 px-6 bg-white text-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-xs tracking-[0.3em] font-bold mb-8 md:mb-12 uppercase opacity-50">Подход</h2>
        <FadeInText delay={0}>
          <p className="text-base md:text-xl lg:text-2xl leading-relaxed mb-4 md:mb-6 text-balance">
            Мой метод — это сочетание глубинной аналитической психологии и доказательных краткосрочных инструментов, таких как КПТ и схема-терапия.
          </p>
        </FadeInText>
        <FadeInText delay={200}>
          <p className="text-sm md:text-lg lg:text-xl leading-relaxed opacity-60">
            Мы не просто исследуем ваше прошлое и внутренний мир, а найдем ресурсы для осознанных изменений в настоящем. Благодаря интегративному подходу, мои клиенты видят первые положительные результаты уже после 3–5 сессий.
          </p>
        </FadeInText>
      </div>
    </section>
  )
}

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => setIsVisible(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTimeout(show, delay)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)

    const checkVisibleOnResize = () => {
      const current = ref.current
      if (!current) return
      const rect = current.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (inView) show()
    }

    window.addEventListener("resize", checkVisibleOnResize)
    // Проверка после раскладки (первый кадр), чтобы на первой загрузке картинки не оставались невидимыми из-за ещё не посчитанных размеров
    const afterLayout = () => requestAnimationFrame(() => checkVisibleOnResize())
    afterLayout()
    const t = setTimeout(afterLayout, 50)

    return () => {
      clearTimeout(t)
      observer.disconnect()
      window.removeEventListener("resize", checkVisibleOnResize)
    }
  }, [delay])

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  )
}

function WorkWithSection() {
  const items = [
    {
      title: "КРИЗИСЫ",
      description: "Потеря смысла, ощущение тупика, прокрастинация и нехватка жизненных сил."
    },
    {
      title: "Тревога",
      description: "Изматывающий контроль, фоновое беспокойство и страх перед будущим."
    },
    {
      title: "Отношения",
      description: "Эмоциональная зависимость, проживание предательства и повторяющиеся сценарии."
    },
    {
      title: "ПСИХОСОМАТИКА",
      description: "Телесные проявления подавленных переживаний и скрытых эмоций."
    }
  ]

  return (
    <section id="work-with" className="relative overflow-hidden py-32 px-6 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_2.2fr] gap-12 lg:gap-20">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.9] tracking-tight">
              С ЧЕМ Я<br />РАБОТАЮ
            </h2>
            <FadeInText delay={150} className="mt-8">
              <div className="max-w-2xl border-l-2 border-white/30 pl-6">
                <div className="space-y-3 text-base md:text-lg lg:text-xl text-white/60 italic leading-relaxed epigraph-text">
                  <p>
                    В терапии мы работаем с тем, что мешает вам чувствовать полноту жизни.
                  </p>
                  <p>
                    Это пространство для глубокого исследования ваших состояний и поиска <strong className="font-semibold text-white">скрытых ресурсов</strong> для перемен.
                  </p>
                </div>
              </div>
            </FadeInText>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:[grid-template-columns:repeat(2,minmax(0,1fr))] gap-6 lg:gap-8 group w-full max-w-full">
              {items.map((item, index) => {
                const isPsychosomatics = item.title === "ПСИХОСОМАТИКА"
                return (
                <RevealCard key={item.title} delay={index * 100}>
                  <div
                    className={
                      "group/card @container relative h-auto w-[calc(100%-2rem)] md:w-full mx-auto min-w-0 overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 md:p-8 lg:p-10 backdrop-blur-md transition-all duration-300 ease-out flex flex-col gap-y-6 " +
                      "hover:scale-[1.02] hover:bg-white/10 hover:border-white/30 " +
                      "group-hover:opacity-60 group-hover/card:opacity-100 " +
                      (index % 2 === 1 ? " md:mt-10 lg:mt-16" : "")
                    }
                  >
                    <div className={`flex items-start justify-between gap-4 ${isPsychosomatics ? "min-w-0" : ""}`}>
                      <h3
                        className={
                          "mt-4 font-semibold uppercase tracking-[0.15em] md:tracking-[0.25em] text-[clamp(1rem,2vw,1.5rem)] pr-12 " +
                          (isPsychosomatics
                            ? "min-w-0 break-words [hyphens:auto] @[260px]:whitespace-nowrap"
                            : "whitespace-nowrap break-all max-w-full")
                        }
                        lang={isPsychosomatics ? "ru" : undefined}
                      >
                        {isPsychosomatics ? "ПСИ\u00ADХО\u00ADСО\u00ADМА\u00ADТИ\u00ADКА" : item.title}
                      </h3>
                      <span className="pointer-events-none absolute top-4 right-4 md:top-5 md:right-5 lg:top-6 lg:right-6 text-xs font-medium tracking-[0.3em] opacity-20 group-hover/card:opacity-70 transition-opacity">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex mt-0 space-x-4">
                      <div className="w-px bg-white/20 mr-4 md:mr-6" />
                      <p className="text-base md:text-base opacity-70 leading-relaxed max-w-full">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealCard>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResultsSection() {
  const results = [
    {
      title: "Ясность",
      description: "Понимание истинных причин своих состояний и автоматических реакций."
    },
    {
      title: "Устойчивость",
      description: "Обретение надежных внутренних опор и значительное снижение тревоги."
    },
    {
      title: "Свобода",
      description: "Выход из навязчивых сценариев и замена неэффективных убеждений."
    },
    {
      title: "Энергия",
      description: "Возвращение ресурса для реализации личных целей и творческого роста."
    }
  ]

  return (
    <section id="results" className="relative overflow-hidden py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[2.2fr_1.1fr] gap-12 lg:gap-20 w-full max-w-full">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 md:[grid-template-columns:repeat(2,minmax(0,1fr))] gap-6 lg:gap-8 group w-full max-w-full">
              {results.map((item, index) => {
                const isStability = item.title === "Устойчивость"
                return (
                <RevealCard key={item.title} delay={index * 100}>
                  <div
                    className={
                      "group/card @container relative h-auto w-[calc(100%-2rem)] md:w-full mx-auto min-w-0 overflow-hidden border border-black/10 bg-gradient-to-br from-black/5 to-transparent p-6 md:p-8 lg:p-10 backdrop-blur-md transition-all duration-300 ease-out flex flex-col gap-y-6 " +
                      "hover:scale-[1.02] hover:bg-black/5 hover:border-black/30 " +
                      "group-hover:opacity-60 group-hover/card:opacity-100 " +
                      (index % 2 === 1 ? " md:mt-10 lg:mt-16" : "")
                    }
                  >
                    <div className={`flex items-start justify-between gap-4 ${isStability ? "min-w-0" : ""}`}>
                      <h3
                        className={"mt-4 font-semibold uppercase tracking-[0.15em] md:tracking-[0.25em] text-[clamp(1rem,2vw,1.5rem)] pr-12 " + (isStability ? "min-w-0 break-words [hyphens:auto] @[260px]:whitespace-nowrap" : "whitespace-nowrap break-all max-w-full")}
                        lang={isStability ? "ru" : undefined}
                      >
                        {isStability ? "УС\u00ADТОЙ\u00ADЧИ\u00ADВО\u00ADСТЬ" : item.title}
                      </h3>
                      <span className="pointer-events-none absolute top-4 right-4 md:top-5 md:right-5 lg:top-6 lg:right-6 text-xs font-medium tracking-[0.3em] opacity-20 group-hover/card:opacity-70 transition-opacity">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex mt-0 space-x-4">
                      <div className="w-px bg-black/10 mr-4 md:mr-6" />
                      <p className="text-base md:text-base opacity-70 leading-relaxed max-w-full">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealCard>
              );
              })}
            </div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col items-end lg:items-center justify-start lg:justify-center space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.9] tracking-tight text-right max-w-xs">
              РЕЗУЛЬТАТ<br />ТЕРАПИИ
            </h2>
            <FadeInText delay={150} className="mt-8">
              <div className="max-w-2xl border-l-2 border-black/30 pl-6">
                <div className="space-y-3 text-base md:text-lg lg:text-xl text-black/60 italic leading-relaxed text-right epigraph-text">
                  <p>
                    Терапия — это путь, на котором <strong className="font-semibold text-black">каждый шаг</strong> ведет к большей устойчивости.
                  </p>
                  <p>
                    Результатом нашей работы станет не просто решение проблемы, а <strong className="font-semibold text-black">новое качество</strong> вашей жизни.
                  </p>
                </div>
              </div>
            </FadeInText>
          </div>
        </div>
      </div>
    </section>
  )
}

function MethodsSection() {
  const methods = [
    {
      number: "01",
      title: "Аналитическая психология",
      description: "Поиск истинных причин ваших состояний через работу с подсознанием. Помогает лучше понять себя и найти выход из повторяющихся жизненных сценариев."
    },
    {
      number: "02",
      title: "Психосинтез",
      description: "Устранение внутренних конфликтов и обретение согласия с собой. Помогает собрать разобранное состояние в единое целое и найти внутреннюю опору."
    },
    {
      number: "03",
      title: "КПТ и Схема-терапия",
      description: "Работа с навязчивыми мыслями и поведением. Конкретные техники, чтобы снизить уровень тревоги и научиться реагировать на стресс по-новому."
    }
  ]

  return (
    <section id="methods" className="pt-24 pb-12 px-6 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight mb-20">
          МЕТОДЫ
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {methods.map((method, index) => (
            <RevealCard key={method.number} delay={index * 150}>
              <div className="border border-white/10 bg-white/5 p-8 h-full group hover:bg-white/10 transition-all duration-300">
                <span className="text-7xl md:text-8xl font-black opacity-10 group-hover:opacity-20 transition-opacity block leading-none">{method.number}</span>
                <h3 className="text-lg font-black mt-6 mb-4 uppercase tracking-widest min-h-[2.8em] leading-tight">{method.title}</h3>
                <p className="text-sm opacity-60 leading-relaxed text-left break-words [text-wrap:balance] min-w-0" lang="ru">{method.description}</p>
              </div>
            </RevealCard>
          ))}
        </div>
        <div className="mt-12 flex justify-center min-h-[5rem] items-center">
          <a
            href="https://t.me/Igor_Athen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-white text-black px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-black tracking-widest uppercase hover:scale-105 transition-transform"
          >
            УЗНАТЬ ПОДРОБНЕЕ
          </a>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      title: "ЛИЧНАЯ ТЕРАПИЯ",
      description: "Синтез глубокого анализа и доказательных методов. Работаем с первопричиной проблемы, используя понятные инструменты для изменений в реальной жизни.",
      price: "2500₽",
      duration: "50 минут"
    },
    {
      title: "МАК-СЕССИЯ",
      description: "Мягкий и быстрый способ найти ответы в бессознательном через визуальные образы. Эффективно для точечных запросов.",
      price: "1500₽",
      duration: "50 минут"
    },
    {
      title: "ПРАКТИКА ПСИХОИНТЕГРАЦИИ",
      description: "Психологический практикум в игровом формате. Возможность открыть новые модели поведения и найти необходимые смыслы.",
      price: "7500₽",
      duration: "120-150 минут"
    }
  ]

  return (
    <section id="services" className="pt-24 pb-12 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight mb-20">
          УСЛУГИ
        </h2>
        <div className="space-y-4">
          {services.map((service, index) => (
            <RevealCard key={service.title} delay={index * 100}>
              <div 
                className="border-b border-black/10 p-10 hover:bg-black/5 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                    <p className="opacity-60 text-lg leading-relaxed">{service.description}</p>
                  </div>
                  <div className="md:text-right shrink-0">
                    <div className="text-3xl font-black">{service.price}</div>
                    <div className="text-xs opacity-40 uppercase tracking-widest mt-2">{service.duration}</div>
                  </div>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductsSection() {
  const products = [
    {
      title: "Метафорические карты",
      description: "Ассоциативная колода для глубокой работы с собственными страхами и подавленными эмоциями.",
      image: "/cards.webp",
      buttonText: "Заказать",
      href: "https://t.me/Igor_Athen"
    },
    {
      title: "Ролевая игра",
      description: "Авторский инструмент для путешествия в мир бессознательного и развития творческого начала.",
      image: "/game.webp",
      buttonText: "Купить PDF",
      href: "https://rpgbook.ru/rules/unique/Archetypum"
    }
  ]
  return (
    <section id="products" className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight mb-20">
          ПРОДУКТЫ
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <RevealCard key={product.title} delay={index * 100}>
              <div className="group w-full min-w-0">
                <div className="relative w-full aspect-square overflow-hidden bg-neutral-900 min-h-[200px]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 672px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-2">{product.title}</h3>
                <p className="opacity-70 text-base leading-relaxed mb-4">{product.description}</p>
                <a
                  href={product.href}
                  target={product.href.startsWith("http") ? "_blank" : undefined}
                  rel={product.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-block border border-white/40 px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                >
                  {product.buttonText}
                </a>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  )
}

const TESTIMONIALS = [
  {
    name: "Александр, 31 год",
    text: "После двухчасового сеанса ощущение детской беззаботности и какой-то психологической чистоты, мне наконец-то удалось расслабиться. Игорь направляет во время практики доходчивым языком, всем рекомендую."
  },
  {
    name: "Мария, 34 года",
    text: "До созвона с Игорем я испытывала тревогу и никак не могла определить ее причину. Но после сеанса я чувствовала себя не только спокойнее, но и словно наконец нашла ответ, который очень давно искала. Во время звонка было приятное ощущение безопасности и легкости."
  },
  {
    name: "Елена, 29 лет",
    text: "Это была невероятно интересная практика, которая подарила мне массу эмоций. Я испытала всё: от радости до грусти, от злости до расслабления. Игорь отлично объяснил основы и помог понять, как научиться слышать внутренний голос."
  },
  {
    name: "Дарья, 27 лет",
    text: "Мой главный запрос — быть честной и избавиться от иллюзий — был выполнен. Сессия помогла мне в этом. После практики усиливается осознание себя, словно попадаешь на новую ступень реальности. Спасибо!"
  },
  {
    name: "Анна, 22 года",
    text: "Сессия должна была быть в формате созвона, но Игорь пошёл мне навстречу и провёл её в текстовом формате, за что очень благодарна. Работать с ним было комфортно: меня не торопили, давали время подумать. Игорь располагает к себе ясной речью, интересными рассуждениями и примерами, что помогло лучше понять себя."
  }
]

const EDUCATION = [
  { institution: "НИУ ВШЭ", program: "Психология", year: "2026" },
  { institution: "НАДПО", program: "Аналитическая психология", year: "2025" },
  { institution: "НАДПО", program: "Интегративная психотерапия в работе со страхами", year: "2025" }
]

const ADDITIONAL_EDUCATION = [
  { program: "Интегративная психотерапия в работе со страхами", institution: "НАДПО", year: "2025" },
  { program: "Клиническая психология в работе с кризисными состояниями", institution: "НАДПО", year: "2025" },
  { program: "Схема-терапия: переписывание застывших убеждений", institution: "НАДПО", year: "2025" },
  { program: "Эксперт по КПТ: стратегии когнитивной терапии", institution: "НАДПО", year: "2025" },
  { program: "Арт-терапия: язык подсознания", institution: "НАДПО", year: "2025" },
  { program: "Метафорические карты: инструмент инсайтов", institution: "НАДПО", year: "2025" },
  { program: "Стресс: взаимодействие тела и психики", institution: "НАДПО", year: "2025" }
]

function ReviewsEducationSection() {
  const [reviewIndex, setReviewIndex] = useState(0)
  const [educationTab, setEducationTab] = useState<"main" | "additional">("main")
  const [isReviewTransitioning, setIsReviewTransitioning] = useState(false)
  const educationListRef = useRef<HTMLUListElement>(null)
  
  const next = () => {
    setIsReviewTransitioning(true)
    setTimeout(() => {
      setReviewIndex((i) => (i + 1) % TESTIMONIALS.length)
      setIsReviewTransitioning(false)
    }, 250)
  }
  
  const prev = () => {
    setIsReviewTransitioning(true)
    setTimeout(() => {
      setReviewIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
      setIsReviewTransitioning(false)
    }, 250)
  }
  
  const review = TESTIMONIALS[reviewIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsReviewTransitioning(true)
      setTimeout(() => {
        setReviewIndex((i) => (i + 1) % TESTIMONIALS.length)
        setIsReviewTransitioning(false)
      }, 250)
    }, 6000)
    return () => clearInterval(interval)
  }, [])


  return (
    <section id="reviews-education" className="py-24 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          <FadeInText delay={0}>
            <div className="bg-neutral-50 text-black p-8 md:p-10 border border-black/10 h-[500px] flex flex-col">
              <h2 className="text-2xl font-bold mb-8 uppercase tracking-wide">Отзывы</h2>
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="overflow-hidden relative min-h-[200px]">
                  <div className={`transition-opacity duration-500 ${isReviewTransitioning ? 'opacity-0' : 'opacity-100 fade-in'}`}>
                    <blockquote className="italic text-base leading-relaxed mb-6">
                      «{review.text}»
                    </blockquote>
                    <p className="text-sm font-medium opacity-80">— {review.name}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-8 shrink-0">
                  <button type="button" onClick={prev} className="border border-black/30 px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors" aria-label="Предыдущий отзыв">
                    ←
                  </button>
                  <button type="button" onClick={next} className="border border-black/30 px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors" aria-label="Следующий отзыв">
                    →
                  </button>
                </div>
              </div>
            </div>
          </FadeInText>
          <FadeInText delay={100}>
            <div className="bg-black text-white p-8 md:p-10 h-[500px] flex flex-col">
              <h2 className="text-2xl font-bold mb-8 uppercase tracking-wide">Образование</h2>
              <div className="flex gap-2 mb-6 border-b border-white/20 shrink-0">
                <button
                  type="button"
                  onClick={() => setEducationTab("main")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    educationTab === "main"
                      ? "border-b-2 border-white text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Основное
                </button>
                <button
                  type="button"
                  onClick={() => setEducationTab("additional")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    educationTab === "additional"
                      ? "border-b-2 border-white text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Дополнительное
                </button>
              </div>
              <div className="flex-1 relative">
                {educationTab === "main" ? (
                  <ul className="space-y-4 h-full overflow-y-auto custom-scrollbar pr-1">
                    {EDUCATION.map((item, index) => (
                      <li key={index} className="border-l-2 border-white pl-6">
                        <div className="font-bold text-lg mb-1">{item.institution}</div>
                        <div className="text-white/70 text-base">{item.program} — {item.year}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="h-full relative max-h-[280px] overflow-hidden">
                    <ul 
                      ref={educationListRef} 
                      className="education-scrollbar max-h-[280px] overflow-y-auto pt-4 pb-6 pr-4"
                    >
                      {ADDITIONAL_EDUCATION.map((item, index) => (
                        <li key={index} className="border-l-2 border-white pl-4 mb-4">
                          <div className="text-white/70 text-sm mb-0.5">{item.program}</div>
                          <div className="text-white/50 text-xs">({item.institution}, {item.year})</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </FadeInText>
        </div>
      </div>
    </section>
  )
}

function ContactMeSection() {
  return (
    <section id="contact-me" className="pt-24 pb-12 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-10">
          СВЯЖИТЕСЬ<br />СО МНОЙ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          <FadeInText delay={0}>
            <div className="flex flex-col">
              <p className="text-lg md:text-xl mb-6">
                <span className="opacity-70">Оставьте заявку на </span>
                <span className="text-white font-bold">бесплатную консультацию</span>
                <span className="opacity-70">. Познакомимся, наметим вектор работы и сделаем первый шаг к решению вашего запроса.</span>
              </p>
              <a
                href="/zayavka"
                className="inline-flex w-fit bg-white text-black px-9 py-[1.1rem] text-sm font-black tracking-widest hover:scale-105 transition-transform"
              >
                Оставить заявку
              </a>
            </div>
          </FadeInText>
          <FadeInText delay={100}>
            <div className="flex flex-col justify-between">
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://t.me/IgorAthen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-white px-6 py-4 text-xl md:text-2xl font-bold text-white hover:bg-white hover:text-black transition-colors"
                >
                  TELEGRAM
                </a>
                <a
                  href="https://www.youtube.com/@igor_athen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-white px-6 py-4 text-xl md:text-2xl font-bold text-white hover:bg-white hover:text-black transition-colors"
                >
                  YOUTUBE
                </a>
              </div>
              <div className="space-y-2 text-lg md:text-xl mt-6">
                <p>📧 <a href="mailto:i.athen@yandex.ru" className="hover:underline text-white/90">i.athen@yandex.ru</a></p>
                <p>📱 <a href="tel:+79526664794" className="hover:underline text-white/90">+79526664794</a></p>
              </div>
            </div>
          </FadeInText>
        </div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 px-6 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight mb-20">
          ФИЛОСОФИЯ
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed text-balance">
          Моя философия основана на интеграции глубинных аналитических методов с практическими инструментами для достижения осознанных изменений в жизни. Я верю, что каждый человек имеет в себе все необходимые ресурсы для преодоления трудностей и достижения гармонии.
        </p>
      </div>
    </section>
  )
}

function FooterLinks() {
  return (
    <div className="py-8 px-6 bg-black text-center">
      <p className="max-w-2xl mx-auto text-[9px] md:text-[10px] text-white/25 leading-relaxed mb-4">
        Игорь Афин – творческий псевдоним самозанятого Жуковец Игоря Валерьевича (ИНН: 470615438771). Услуги, представленные на сайте, носят консультативный характер и не являются медицинской помощью. При наличии диагностированных психических расстройств или подозрении на них необходимо проконсультироваться с врачом-психиатром или психотерапевтом.
      </p>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] md:text-xs text-white/50">
        <a href="/politika-konfidencialnosti" className="hover:text-white/70 hover:underline transition-colors">
          Политика конфиденциальности
        </a>
        <a href="/polzovatelskie-soglasheniya" className="hover:text-white/70 hover:underline transition-colors">
          Пользовательские соглашения
        </a>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ApproachSection />
      <WorkWithSection />
      <ResultsSection />
      <MethodsSection />
      <ServicesSection />
      <ProductsSection />
      <ReviewsEducationSection />
      <ContactMeSection />
      <FooterLinks />
    </main>
  )
}
