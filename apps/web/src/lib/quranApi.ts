export type QuranFetchResult = { name: string; text: string }

const JUZ_NAMES_AR = [
  'ٱلٓمٓ',
  'سَيَقُولُ',
  'تِلْكَ ٱلرُّسُلُ',
  'لَن تَنَالُوا۟',
  'وَٱلْمُحْصَنَٰتُ',
  'لَا يُحِبُّ ٱللَّهُ',
  'وَإِذَا سَمِعُوا۟',
  'وَلَوْ أَنَّنَا',
  'قَالَ ٱلْمَلَأُ',
  'وَٱعْلَمُوا۟',
  'يَعْتَذِرُونَ',
  'وَمَا مِن دَآبَّةٍ',
  'وَمَآ أُبَرِّئُ',
  'رُبَمَا',
  'سُبْحَانَ ٱلَّذِىٓ',
  'قَالَ أَلَمْ',
  'ٱقْتَرَبَ',
  'قَدْ أَفْلَحَ',
  'وَقَالَ ٱلَّذِينَ',
  'أَمَّنْ خَلَقَ',
  'ٱتْلُ',
  'وَمَن يَقْنُتْ',
  'وَمَا لِىَ',
  'فَمَنِ ٱعْتَدَىٰ',
  'إِلَيْهِ يُرَدُّ',
  'حَمٓ',
  'قَالَ فَمَا خَطْبُكُمْ',
  'قَدْ سَمِعَ ٱللَّهُ',
  'تَبَارَكَ ٱلَّذِى',
  'عَمَّ'
]

export async function fetchJuzText(juz: number): Promise<QuranFetchResult> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/juz/${juz}/quran-uthmani`)
    const data = await res.json()
    if (data?.data?.ayahs) {
      const text = (data.data.ayahs as any[])
        .map((a) => `${a.text} ﴿${a.numberInSurah}﴾`)
        .join(' ')
      const name = `جزء ${juz} — ${JUZ_NAMES_AR[juz - 1] || ''}`.trim()
      return { name, text }
    }
  } catch {
    // fall through
  }
  return { name: `Juz ${juz}`, text: '—' }
}

export async function fetchSurahText(surah: number): Promise<QuranFetchResult> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surah}/ar.alafasy`)
    const data = await res.json()
    if (data?.data?.ayahs) {
      const name = data.data.englishName || `Surah ${surah}`
      const text = (data.data.ayahs as any[])
        .map((a) => `${a.text} ﴿${a.numberInSurah}﴾`)
        .join(' ')
      return { name, text }
    }
  } catch {
    // ignore and return placeholder
  }
  return { name: `Surah ${surah}`, text: '—' }
}

