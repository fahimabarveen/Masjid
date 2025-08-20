import React from 'react'
import { Link } from 'react-router-dom'

const juzList = Array.from({ length: 30 }, (_, i) => i + 1)
const surahNames = [
  'Al-Fatiha', 'Al-Baqarah', 'Aal-Imran', 'An-Nisa\'', 'Al-Ma\'idah', 'Al-An\'am',
  'Al-A\'raf', 'Al-Anfal', 'At-Tawbah', 'Yunus', 'Hud', 'Yusuf', 'Ar-Ra\'d', 'Ibrahim',
  'Al-Hijr', 'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha', 'Al-Anbiya\'', 'Al-Hajj',
  'Al-Mu\'minun', 'An-Nur', 'Al-Furqan', 'Ash-Shu\'ara', 'An-Naml', 'Al-Qasas',
  'Al-\'Ankabut', 'Ar-Rum', 'Luqman', 'As-Sajdah', 'Al-Ahzab', 'Saba\'', 'Fatir', 'Ya-Sin',
  'As-Saffat', 'Sad', 'Az-Zumar', 'Ghafir', 'Fussilat', 'Ash-Shura', 'Az-Zukhruf', 'Ad-Dukhan',
  'Al-Jathiyah', 'Al-Ahqaf', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf', 'Adh-Dhariyat', 'At-Tur',
  'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqi\'ah', 'Al-Hadid', 'Al-Mujadila', 'Al-Hashr',
  'Al-Mumtahanah', 'As-Saff', 'Al-Jumu\'ah', 'Al-Munafiqun', 'At-Taghabun', 'At-Talaq', 'At-Tahrim',
  'Al-Mulk', 'Al-Qalam', 'Al-Haqqah', 'Al-Ma\'arij', 'Nuh', 'Al-Jinn', 'Al-Muzzammil', 'Al-Muddaththir',
  'Al-Qiyamah', 'Al-Insan', 'Al-Mursalat', 'An-Naba\'', 'An-Nazi\'at', '\'Abasa', 'At-Takwir', 'Al-Infitar',
  'Al-Mutaffifin', 'Al-Inshiqaq', 'Al-Buruj', 'At-Tariq', 'Al-A\'la', 'Al-Ghashiyah', 'Al-Fajr', 'Al-Balad',
  'Ash-Shams', 'Al-Layl', 'Ad-Duhaa', 'Ash-Sharh', 'At-Tin', 'Al-\'Alaq', 'Al-Qadr', 'Al-Bayyinah',
  'Az-Zalzalah', 'Al-\'Adiyat', 'Al-Qari\'ah', 'At-Takathur', 'Al-\'Asr', 'Al-Humazah', 'Al-Fil', 'Quraysh',
  'Al-Ma\'un', 'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'
]
const surahList = surahNames.map((name, idx) => ({ id: idx + 1, name }))

export function QuranIndexPage() {
  const lastRead = localStorage.getItem('quran:lastRead') || 'None'
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quran</h1>
        <div className="text-sm opacity-80">Last read: {lastRead}</div>
      </div>
      <section>
        <h2 className="text-xl mb-2">Juz</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {juzList.map((j) => (
            <div key={j} className="rounded bg-white/60 dark:bg-black/20 p-2 text-center hover:bg-white/80">Juz {j}</div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl mb-2">Surah Index</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {surahList.map((s) => (
            <Link key={s.id} to={`/quran/surah/${s.id}`} className="rounded bg-white/60 dark:bg-black/20 p-3 hover:bg-white/80">
              {s.id}. {s.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}


