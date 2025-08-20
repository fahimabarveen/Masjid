import React from 'react'
import { motion } from 'framer-motion'

const duas = [
  {
    id: 'in',
    title: 'Entering the Masjid',
    arabic: 'اللّهُـمَّ افْتَـحْ لِي أَبْوَابَ رَحْمَتِـكَ',
    transliteration: 'Allahumma iftah li abwaba rahmatika',
    meaning: 'O Allah, open for me the doors of Your mercy.'
  },
  {
    id: 'out',
    title: 'Leaving the Masjid',
    arabic: 'اللّهُـمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: 'Allahumma inni as’aluka min fadhlika',
    meaning: 'O Allah, I ask of You from Your bounty.'
  }
]

export function MenuPage() {
  const [lang, setLang] = React.useState<'en' | 'ta' | 'ar'>('en')
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <label>Language:</label>
        <select className="rounded bg-white/70 dark:bg-black/30 px-2 py-1" value={lang} onChange={(e) => setLang(e.target.value as any)}>
          <option value="en">English</option>
          <option value="ta">Tamil</option>
          <option value="ar">Arabic</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {duas.map((d) => (
          <motion.div key={d.id} whileHover={{ y: -4 }} className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow">
            <div className="font-semibold mb-2">{d.title}</div>
            <div className="font-calligraphy text-2xl">{d.arabic}</div>
            <div className="text-sm mt-2 italic">{d.transliteration}</div>
            <div className="text-sm mt-1 opacity-80">{d.meaning}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


