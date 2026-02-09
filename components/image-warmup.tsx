"use client"

import { useEffect } from "react"

/**
 * Один раз при загрузке страницы запрашивает API оптимизации изображений Next.js,
 * чтобы при первой отрисовке картинок сервер уже был «прогрет» и не было сбоев загрузки.
 */
export function ImageWarmup() {
  useEffect(() => {
    const url = `/_next/image?url=%2Figor-portrait.webp&w=256&q=75`
    fetch(url).catch(() => {})
  }, [])
  return null
}
