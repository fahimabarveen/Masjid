import React from 'react'
import { useParams } from 'react-router-dom'

export function SurahPage() {
  const { id } = useParams()
  const surahId = Number(id)
  const [progress, setProgress] = React.useState<number>(() => {
    const key = `quran:surah:${surahId}:progress`
    const v = localStorage.getItem(key)
    return v ? Number(v) : 0
  })

  const saveProgress = () => {
    const key = `quran:surah:${surahId}:progress`
    localStorage.setItem(key, String(progress))
    localStorage.setItem('quran:lastRead', `Surah ${surahId} - Line ${progress}`)
    alert('Progress saved (placeholder)')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Surah {surahId}</h1>
      <div className="rounded bg-white/60 dark:bg-black/20 p-4">
        <div className="font-calligraphy text-3xl">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ</div>
        <p className="mt-2 text-sm opacity-90">[Arabic + translation placeholder...]</p>
        <audio className="mt-3 w-full" controls>
          <source src="#" />
        </audio>
        <div className="mt-3 flex items-center gap-2">
          <label className="text-sm">Last read line:</label>
          <input type="number" value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="rounded bg-white/70 dark:bg-black/30 px-2 py-1 w-24" />
          <button onClick={saveProgress} className="rounded bg-secondary text-light px-3 py-2 hover:bg-primary">Save</button>
        </div>
        <div className="mt-4 flex gap-3 text-sm">
          <a className="underline" href="#">Download PDF</a>
          <a className="underline" href="#">Download Audio</a>
        </div>
      </div>
    </div>
  )
}


