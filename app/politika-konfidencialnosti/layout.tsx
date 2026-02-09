import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Игорь Афин",
  description: "Политика в отношении персональных данных и использование cookie на сайте.",
}

export default function PolitikaKonfidencialnostiLayout({
  children,
}: { children: React.ReactNode }) {
  return children
}
