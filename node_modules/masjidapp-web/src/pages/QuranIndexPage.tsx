import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, List, Loader2 } from 'lucide-react'
import { fetchJuzText, fetchSurahText } from '../lib/quranApi'

const juzList = Array.from({ length: 30 }, (_, i) => i + 1)
const juzNames = [
  'Juz 1 — ٱلٓمٓ',
  'Juz 2 — سيقول',
  'Juz 3 — تلك الرسل',
  'Juz 4 — لن تنالوا',
  'Juz 5 — والمحصنات',
  'Juz 6 — لا يحب الله',
  'Juz 7 — وإذا سمعوا',
  'Juz 8 — ولو أننا',
  'Juz 9 — قال الملأ',
  'Juz 10 — واعلموا',
  'Juz 11 — يعتذرون',
  'Juz 12 — وما من دابة',
  'Juz 13 — وما أبرئ',
  'Juz 14 — ربما',
  'Juz 15 — سبحان الذي',
  'Juz 16 — قال ألم',
  'Juz 17 — اقتربت',
  'Juz 18 — قد أفلح',
  'Juz 19 — وقال الذين',
  'Juz 20 — أمن خلق',
  'Juz 21 — اتل',
  'Juz 22 — ومن يقنت',
  'Juz 23 — وما لي',
  'Juz 24 — فمن اعتدى',
  'Juz 25 — إليه يرد',
  'Juz 26 — حم',
  'Juz 27 — قال فما خطبكم',
  'Juz 28 — قد سمع الله',
  'Juz 29 — تبارك الذي',
  'Juz 30 — عم'
]

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

type ViewMode = 'index' | 'juz' | 'surah'

type QuranData = { name: string; text: string }

export function QuranIndexPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('index')
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null)
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)
  const [data, setData] = useState<QuranData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastRead = localStorage.getItem('quran:lastRead') || 'None'

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setIsLoading(true)
        setError(null)
        if (viewMode === 'juz' && selectedJuz) {
          const res = await fetchJuzText(selectedJuz)
          if (!cancelled) setData(res)
        } else if (viewMode === 'surah' && selectedSurah) {
          const res = await fetchSurahText(selectedSurah)
          if (!cancelled) setData(res)
        } else {
          setData(null)
        }
      } catch (e) {
        if (!cancelled) setError('Failed to load. Please try again.')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [viewMode, selectedJuz, selectedSurah])

  const handleJuzClick = (juzId: number) => {
    setSelectedJuz(juzId)
    setSelectedSurah(null)
    setViewMode('juz')
    localStorage.setItem('quran:lastRead', `Juz ${juzId}`)
  }

  const handleSurahClick = (surahId: number) => {
    setSelectedSurah(surahId)
    setSelectedJuz(null)
    setViewMode('surah')
    localStorage.setItem('quran:lastRead', `Surah ${surahId} - ${surahNames[surahId - 1]}`)
  }

  const handleBackToIndex = () => {
    setViewMode('index')
    setSelectedJuz(null)
    setSelectedSurah(null)
    setData(null)
  }

  const renderReader = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <motion.button
          onClick={handleBackToIndex}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 dark:bg-black/20 hover:bg-white/80 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Index
        </motion.button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-10 opacity-80">
          <Loader2 className="animate-spin-slow" />
          <span className="ml-2">Loading...</span>
        </div>
      )}

      {error && (
        <div className="rounded bg-red-100/70 text-red-900 dark:bg-red-900/20 dark:text-red-200 p-3 text-sm">
          {error}
        </div>
      )}

      {!isLoading && data && (
        <div>
          <h2 className="text-2xl font-semibold mb-3">{data.name || (viewMode === 'juz' && selectedJuz ? juzNames[selectedJuz - 1] : '')}</h2>
          <div className="rounded bg-white/60 dark:bg-black/20 p-4 leading-9">
            <div className="font-calligraphy text-3xl mb-3">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ</div>
            <div className="font-calligraphy text-2xl whitespace-pre-wrap">{data.text}</div>
          </div>
        </div>
      )}
    </div>
  )

  const renderIndex = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quran</h1>
        <div className="text-sm opacity-80">Last read: {lastRead}</div>
      </div>
      
      <section>
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <List size={20} />
          Juz Index
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {juzList.map((j) => (
            <motion.button
              key={j}
              onClick={() => handleJuzClick(j)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-white/60 dark:bg-black/20 p-3 hover:bg-white/80 dark:hover:bg-black/30 transition-all duration-200 text-left"
            >
              <div className="font-semibold text-secondary">{j}.</div>
              <div className="text-sm opacity-80">{juzNames[j - 1].split(' — ')[1]}</div>
            </motion.button>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <BookOpen size={20} />
          Surah Index
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {surahList.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => handleSurahClick(s.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-white/60 dark:bg-black/20 p-3 hover:bg-white/80 dark:hover:bg-black/30 transition-all duration-200 text-left"
            >
              <div className="font-semibold text-secondary">{s.id}.</div>
              <div className="text-sm opacity-80">{s.name}</div>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  )

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewMode + String(selectedJuz) + String(selectedSurah)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {viewMode === 'index' ? renderIndex() : renderReader()}
      </motion.div>
    </AnimatePresence>
  )
}


