"use client"

import React, { useState } from "react"
import Link from "next/link"

type Step = 1 | 2 | 3 | 4

const STEP_1_OPTIONS = [
  "Тревога, панические атаки.",
  "Кризис в отношениях, одиночество.",
  "Поиск себя, низкая самооценка.",
  "Прокрастинация, апатия, выгорание.",
  "Другое",
] as const

const STEP_2_OPTIONS = [
  "Да, есть опыт длительной терапии.",
  "Был краткосрочный опыт или разовые сессии.",
  "Нет, это будет мой первый опыт.",
  "Другое",
] as const

const STEP_3_OPTIONS = [
  "Понять причины моего состояния и увидеть выход.",
  "Почувствовать, насколько мне комфортно и безопасно в работе с вами.",
  "Просто проговорить проблему и получить профессиональную поддержку.",
  "Другое",
] as const

export default function ZayavkaPage() {
  const [step, setStep] = useState<Step>(1)
  const [step1, setStep1] = useState<string>("")
  const [step1Other, setStep1Other] = useState("")
  const [step2, setStep2] = useState<string>("")
  const [step2Other, setStep2Other] = useState("")
  const [step3, setStep3] = useState<string>("")
  const [step3Other, setStep3Other] = useState("")
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const nextDisabled =
    (step === 1 && !step1) ||
    (step === 1 && step1 === "Другое" && !step1Other.trim()) ||
    (step === 2 && (!step2 || (step2 === "Другое" && !step2Other.trim()))) ||
    (step === 3 && (!step3 || (step3 === "Другое" && !step3Other.trim())))

  const goNext = () => {
    if (step < 4 && !nextDisabled) {
      setStep((prev) => (prev + 1) as Step)
    }
  }

  const goPrev = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) {
      setError("Пожалуйста, укажите имя и контакт для связи.")
      return
    }
    setError(null)
    setSubmitting(true)
    const s1 =
      step1 === "Другое" && step1Other.trim()
        ? `${step1} — ${step1Other.trim()}`
        : step1 || "—"
    const s2 =
      step2 === "Другое" && step2Other.trim()
        ? `${step2} — ${step2Other.trim()}`
        : step2 || "—"
    const s3 =
      step3 === "Другое" && step3Other.trim()
        ? `${step3} — ${step3Other.trim()}`
        : step3 || "—"

    const summary = [
      "Новая заявка на бесплатную консультацию:",
      "",
      `Имя: ${name.trim()}`,
      `Контакт (Telegram / телефон): ${contact.trim()}`,
      "",
      "Шаг 1. С чем хочет поработать:",
      s1,
      "",
      "Шаг 2. Предыдущий опыт:",
      s2,
      "",
      "Шаг 3. Ожидание от встречи:",
      s3,
      "",
      "Отправлено из опросника на сайте athenpsy.ru",
    ].join("\n")

    try {
      const res = await fetch("https://formspree.io/f/mbdanknw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Новая заявка на консультацию с athenpsy.ru",
          name: name.trim(),
          contact: contact.trim(),
          step1: step1 || "—",
          step1_other: step1 === "Другое" ? step1Other.trim() : "",
          step2: step2 || "—",
          step2_other: step2 === "Другое" ? step2Other.trim() : "",
          step3: step3 || "—",
          step3_other: step3 === "Другое" ? step3Other.trim() : "",
          message: summary,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          data?.error ||
            "Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.",
        )
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(
        err?.message ||
          "Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            ← На главную
          </Link>
          <span className="text-xs uppercase tracking-[0.25em] text-white/40">
            Заявка на консультацию
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-10 px-6">
        <div className="mb-8 text-white/60 text-xs tracking-[0.3em] uppercase">
          Шаг {step} из 4
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-10">
            {step === 1 && (
              <section className="space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold">
                  Шаг 1. С чем вы хотели бы поработать в первую очередь?
                </h2>
                <div className="space-y-3">
                  {STEP_1_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className={`flex items-start gap-3 text-sm md:text-base cursor-pointer ${
                        step1 === option
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="step1"
                        value={option}
                        checked={step1 === option}
                        onChange={() => setStep1(option)}
                        className="mt-1 h-4 w-4 cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {step1 === "Другое" && (
                  <textarea
                    value={step1Other}
                    onChange={(e) => setStep1Other(e.target.value)}
                    placeholder="Опишите ваш запрос"
                    className="mt-3 w-full rounded border border-white/20 bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/60"
                    rows={3}
                  />
                )}
              </section>
            )}

            {step === 2 && (
              <section className="space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold">
                  Шаг 2. Обращались ли вы к помогающим специалистам ранее?
                </h2>
                <div className="space-y-3">
                  {STEP_2_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className={`flex items-start gap-3 text-sm md:text-base cursor-pointer ${
                        step2 === option
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="step2"
                        value={option}
                        checked={step2 === option}
                        onChange={() => setStep2(option)}
                        className="mt-1 h-4 w-4 cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {step2 === "Другое" && (
                  <textarea
                    value={step2Other}
                    onChange={(e) => setStep2Other(e.target.value)}
                    placeholder="Кратко опишите ваш опыт"
                    className="mt-3 w-full rounded border border-white/20 bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/60"
                    rows={3}
                  />
                )}
              </section>
            )}

            {step === 3 && (
              <section className="space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold">
                  Шаг 3. Что для вас станет лучшим результатом консультации?
                </h2>
                <div className="space-y-3">
                  {STEP_3_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className={`flex items-start gap-3 text-sm md:text-base cursor-pointer ${
                        step3 === option
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="step3"
                        value={option}
                        checked={step3 === option}
                        onChange={() => setStep3(option)}
                        className="mt-1 h-4 w-4 cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {step3 === "Другое" && (
                  <textarea
                    value={step3Other}
                    onChange={(e) => setStep3Other(e.target.value)}
                    placeholder="Опишите, чего вы ждёте от консультации"
                    className="mt-3 w-full rounded border border-white/20 bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/60"
                    rows={3}
                  />
                )}
              </section>
            )}

            {step === 4 && (
              <section className="space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold">
                  Спасибо за доверие!
                </h2>
                <p className="text-sm md:text-base text-white/70">
                  Оставьте свои данные, и я свяжусь с вами в Telegram или WhatsApp,
                  чтобы подобрать удобное время для созвона.
                </p>
                <p className="text-xs md:text-sm text-white/50">
                  Первичная консультация длится 30 минут и проводится онлайн в
                  Яндекс Телемост. Это бесплатно и полностью конфиденциально.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-[0.25em] text-white/50">
                      Имя
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/60"
                      placeholder="Как к вам обращаться"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-[0.25em] text-white/50">
                      Ссылка на Telegram или номер телефона
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/60"
                      placeholder="@username или +7..."
                    />
                  </div>
                </div>
              </section>
            )}

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={goPrev}
                disabled={step === 1}
                className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/50 disabled:opacity-30 disabled:cursor-default hover:text-white transition-colors"
              >
                {step === 1 ? " " : "← Назад"}
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={nextDisabled}
                  className="inline-flex items-center justify-center bg-white text-black px-6 py-3 text-xs md:text-sm font-black tracking-[0.25em] uppercase hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
                >
                  Далее →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center bg-white text-black px-6 py-3 text-xs md:text-sm font-black tracking-[0.25em] uppercase hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  {submitting ? "ОТПРАВКА..." : "ОТПРАВИТЬ ЗАЯВКУ"}
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="mt-10 max-w-xl space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">
              Заявка отправлена
            </h2>
            <p className="text-sm md:text-base text-white/70">
              Спасибо, что поделились своим запросом. Я свяжусь с вами в ближайшее время,
              чтобы согласовать удобное время для консультации.
            </p>
            <p className="text-xs md:text-sm text-white/50">
              Если хотите написать прямо сейчас, вы можете сделать это в{" "}
              <a
                href="https://t.me/IgorAthen"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Telegram
              </a>
              .
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

