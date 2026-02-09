import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Пользовательские соглашения | Игорь Афин",
  description: "Пользовательское соглашение и согласие на обработку персональных данных.",
}

export default function PolzovatelskieSoglasheniyaLayout({
  children,
}: { children: React.ReactNode }) {
  return children
}
