import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-black text-white">
      <div className="text-center max-w-md">
        <p className="text-xs tracking-[0.3em] uppercase opacity-50 mb-4">Ошибка 404</p>
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight tracking-tight mb-6">
          Страница не найдена
        </h1>
        <p className="text-white/60 mb-10">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          href="/"
          className="inline-flex bg-white text-black px-8 py-4 text-sm font-black tracking-widest uppercase hover:scale-105 transition-transform"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
