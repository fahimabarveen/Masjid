import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchJuzText } from '../lib/quranApi'

export function JuzPage() {
  const { id } = useParams()
  const juz = Number(id)
  const [name, setName] = React.useState('')
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    let mounted = true
    fetchJuzText(juz).then((res) => {
      if (!mounted) return
      setName(res.name)
      setText(res.text)
    })
    return () => {
      mounted = false
    }
  }, [juz])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <div className="rounded bg-white/60 dark:bg-black/20 p-4 leading-9">
        <div className="font-calligraphy text-3xl mb-3">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ</div>
        <div className="font-calligraphy text-2xl whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  )
}

