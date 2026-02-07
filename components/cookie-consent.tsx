"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"

const STORAGE_KEY = "cookie-consent-accepted"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const accepted = localStorage.getItem(STORAGE_KEY)
      if (!accepted) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true")
    } catch {
      //
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-sm py-4 px-4 sm:px-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center gap-3 sm:gap-4 text-center">
        <p className="text-[11px] sm:text-xs text-white/60 max-w-full break-words px-0 sm:px-2">
          Мой сайт использует куки. Продолжая им пользоваться, вы соглашаетесь на обработку персональных данных в соответствии с{" "}
          <Link
            href="/politika-konfidencialnosti"
            className="text-white/80 underline hover:text-white transition-colors"
          >
            политикой конфиденциальности.
          </Link>
        </p>
        <button
          type="button"
          onClick={accept}
          className="min-h-[44px] min-w-[44px] border border-white/40 px-5 py-3 sm:py-2 text-xs font-bold tracking-widest uppercase text-white hover:bg-white hover:text-black transition-colors touch-manipulation"
        >
          Согласен
        </button>
      </div>
    </div>
  )
}
