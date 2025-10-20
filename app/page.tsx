export default function Page() {
  const projects = [
    { title: 'Концепт виджетов macOS', year: '2023' },
    { title: 'UI Kit эксперименты', year: '2024' },
    { title: 'Анимации и микро-взаимодействия', year: '2024' },
    { title: 'Система иконок', year: '2023' },
    { title: 'Презентационный лендинг', year: '2025' },
    { title: 'Наброски интерфейсов', year: '2022' },
  ];
  return (
    <main className="min-h-screen px-6 py-16 md:px-10 lg:px-14">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Илья / дизайнер</h1>
        <p className="mt-3 text-neutral-600">Проекты, концепты и эксперименты с анимациями</p>
      </header>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <article key={i} className="group">
            <div className="aspect-[4/3] rounded-xl bg-neutral-200/80 border border-neutral-200 overflow-hidden">
              <div className="w-full h-full grid place-items-center text-neutral-400 text-sm">
                Плейсхолдер изображения
              </div>
            </div>
            <h3 className="mt-3 text-lg font-medium">{p.title}</h3>
            <p className="text-sm text-neutral-500">{p.year}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
