import React from "react"
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Игорь Афин — Аналитический психолог | Выход из кризисов и работа с тревогой',
  description: 'Помогаю найти опору в сложные периоды, справиться с тревогой и найти выход из жизненного тупика. Начните решать вашу проблему на первой бесплатной сессии.',
  generator: 'v0.app',
  metadataBase: new URL('https://athenpsy.ru'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Игорь Афин — Психолог',
    description: 'Первая сессия — бесплатно. Разберемся в причинах вашего состояния и наметим план конкретных перемен.',
    images: ['/igor-portrait.webp'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          id="yandex-metrika"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106739734', 'ym');

    ym(106739734, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `.trim(),
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/106739734" style={{ position: 'absolute', left: -9999 }} alt="" />
          </div>
        </noscript>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
