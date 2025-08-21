import React from 'react'

type Prayer = { name: string; time: string }

const DEFAULT_PRAYERS: Prayer[] = [
  { name: 'Fajr', time: '05:10' },
  { name: 'Dhuhr', time: '12:30' },
  { name: 'Asr', time: '15:45' },
  { name: 'Maghrib', time: '18:20' },
  { name: 'Isha', time: '20:00' },
]

function parseTodayTime(hhmm: string): Date {
  const [h, m] = hhmm.split(':').map((v) => Number(v))
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d
}

export function NextPrayerAlert({ prayers = DEFAULT_PRAYERS }: { prayers?: Prayer[] }) {
  const [label, setLabel] = React.useState<string>('')

  const calculate = React.useCallback(() => {
    const now = new Date()
    const upcoming = prayers
      .map((p) => ({ ...p, date: parseTodayTime(p.time) }))
      .find((p) => p.date.getTime() > now.getTime())
    const target = upcoming || { name: prayers[0].name, date: new Date(parseTodayTime(prayers[0].time).getTime() + 24 * 3600 * 1000) }
    const diffMs = target.date.getTime() - now.getTime()
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    setLabel(`${target.name} in ${hours}h ${minutes}m`)
  }, [prayers])

  React.useEffect(() => {
    calculate()
    const id = setInterval(calculate, 60 * 1000)
    return () => clearInterval(id)
  }, [calculate])

  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-900/30 p-3 text-amber-800 dark:text-amber-200 shadow">
      ⏰ Next Prayer: <span className="font-semibold">{label}</span>
    </div>
  )
}

