import React from 'react'
import { motion } from 'framer-motion'
import { QiblaCard } from '../components/QiblaCard'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

// Duas removed as requested

export function MenuPage() {
  const [lang, setLang] = React.useState<'en' | 'ta' | 'ar'>('en')
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <label className="text-white">Language:</label>
        <LanguageSwitcher />
      </div>

      <QiblaCard />

      <section className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow">
        <div className="font-semibold mb-2 text-white">Our Events & Programs</div>
        <div className="aspect-[4/3] w-full">
          <iframe
            title="Masjid Calendar"
            src="https://calendar.google.com/calendar/embed?src=c_classroomebd8272d15f48670633af6d1064c37b2ebe9c78e72f9c33921c03a27c6e992f0%40group.calendar.google.com&ctz=UTC"
            className="w-full h-[600px] border-0 rounded"
          />
        </div>
      </section>
    </div>
  )
}


