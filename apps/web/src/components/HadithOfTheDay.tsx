import React from 'react'

type Hadith = {
  id: string
  arabic: string
  transliteration?: string
  translation: string
  source: string
}

// Small curated list; can be expanded. Rotation logic guarantees no repeat until all are shown.
const HADITHS: Hadith[] = [
  {
    id: 'muslim-657',
    arabic: 'مَنْ صَلَّى الْفَجْرَ فَهُوَ فِي ذِمَّةِ اللَّهِ',
    transliteration: 'Man salla al-fajra fahuwa fī dhimmat Allāh',
    translation: "Whoever prays Fajr is under Allah's protection.",
    source: 'Sahih Muslim 657',
  },
  {
    id: 'bukhari-1',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
    transliteration: 'Innamā al-aʿmālu bin-niyyāt',
    translation: 'Actions are but by intentions.',
    source: 'Sahih al-Bukhari 1',
  },
  {
    id: 'muslim-2699',
    arabic: 'لَا يَرْحَمُ اللَّهُ مَنْ لَا يَرْحَمُ النَّاسَ',
    transliteration: 'Lā yarḥamullāhu man lā yarḥamun-nās',
    translation: 'Allah does not show mercy to one who does not show mercy to people.',
    source: 'Sahih Muslim 2699',
  },
  {
    id: 'tirmidhi-2517',
    arabic: 'الدُّعَاءُ هُوَ الْعِبَادَةُ',
    transliteration: 'Ad-duʿāʾu huwa al-ʿibādah',
    translation: 'Supplication is worship.',
    source: 'Jamiʿ at-Tirmidhi 2969',
  },
  {
    id: 'muslim-1015',
    arabic: 'الطُّهُورُ شَطْرُ الإِيمَانِ',
    transliteration: 'At-ṭuhūru shaṭrul-īmān',
    translation: 'Purification is half of faith.',
    source: 'Sahih Muslim 223',
  },
]

function getTodayKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function HadithOfTheDay() {
  const [hadith, setHadith] = React.useState<Hadith | null>(null)

  React.useEffect(() => {
    const orderKey = 'hadith:order'
    const indexKey = 'hadith:index'
    const dateKey = 'hadith:date'

    const today = new Date()
    const todayKey = getTodayKey(today)

    let order: string[] = []
    try {
      const stored = localStorage.getItem(orderKey)
      order = stored ? JSON.parse(stored) : []
    } catch {
      order = []
    }

    if (order.length !== HADITHS.length) {
      order = shuffle(HADITHS.map((h) => h.id))
      localStorage.setItem(orderKey, JSON.stringify(order))
      localStorage.setItem(indexKey, '0')
      localStorage.setItem(dateKey, '')
    }

    const lastDate = localStorage.getItem(dateKey) || ''
    let idx = Number(localStorage.getItem(indexKey) || '0')

    if (lastDate !== todayKey) {
      // Advance once per day; wrap at end and reshuffle to avoid same order next cycle
      idx = (idx + 1) % order.length
      if (idx === 0) {
        order = shuffle(order)
        localStorage.setItem(orderKey, JSON.stringify(order))
      }
      localStorage.setItem(indexKey, String(idx))
      localStorage.setItem(dateKey, todayKey)
    }

    const currentId = order[idx]
    const found = HADITHS.find((h) => h.id === currentId) || HADITHS[0]
    setHadith(found)
  }, [])

  if (!hadith) return null

  return (
    <div className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow">
      <div className="font-semibold mb-2">📖 Daily Hadith</div>
      <div className="font-calligraphy text-2xl text-center">{hadith.arabic}</div>
      {hadith.transliteration && (
        <div className="mt-2 text-center italic text-sm">{hadith.transliteration}</div>
      )}
      <div className="mt-3 text-center text-sm">"{hadith.translation}"</div>
      <div className="mt-2 text-center text-xs opacity-70">— {hadith.source}</div>
    </div>
  )
}

