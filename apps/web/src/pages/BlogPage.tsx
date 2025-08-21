import React from 'react'

export function BlogPage() {
  return (
    <div className="space-y-6">
      <section className="rounded bg-white/60 dark:bg-black/20 p-4">
        <h2 className="text-xl font-semibold mb-2 text-[#3E5F44] dark:text-[#93DA97]">Thalim History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <article key={i} className="rounded bg-white/70 dark:bg-black/30 p-3">
              <h3 className="font-semibold text-[#3E5F44] dark:text-[#93DA97]">Article {i + 1}</h3>
              <p className="text-sm opacity-80">Preview content... <a className="underline" href="#">Read more</a></p>
            </article>
          ))}
        </div>
      </section>
      <section className="rounded bg-white/60 dark:bg-black/20 p-4">
        <h2 className="text-xl font-semibold mb-2 text-[#3E5F44] dark:text-[#93DA97]">Masjid History</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video rounded bg-white/70 dark:bg-black/30" />
          ))}
        </div>
        <p className="text-sm opacity-80 mt-2">Images and description placeholder.</p>
      </section>
    </div>
  )
}


