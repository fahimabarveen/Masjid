import React from 'react'
import { motion } from 'framer-motion'
import { QiblaCard } from '../components/QiblaCard'


const prayerTimes = {
  date: '',
  times: [
    { name: 'Fajr', time: '05:10', rakaat: '2 Sunnah + 2 Farz', merits: ['Angels witness', 'Barakah in day', 'Face shines'], demerits: ['Missed Rizq', 'Heavier day', 'Loss of protection'] },
    { name: 'Dhuhr', time: '12:30', rakaat: '4 Sunnah + 4 Farz + 2 Sunnah + 2 Nafl', merits: ['Sins forgiven', 'Protection', 'Tranquility'], demerits: ['Weak heart', 'Loss of barakah', 'Neglect'] },
    { name: 'Asr', time: '15:45', rakaat: '4 Sunnah + 4 Farz', merits: ['Blessings', 'Saved from hellfire', 'Increase rizq'], demerits: ['Hard heart', 'Loss of blessings', 'Regret'] },
    { name: 'Maghrib', time: '18:20', rakaat: '3 Farz + 2 Sunnah + 2 Nafl', merits: ['Dua accepted', 'Forgiveness', 'Peace'], demerits: ['Darkness in heart', 'Miss barakah', 'Restlessness'] },
    { name: 'Isha', time: '20:00', rakaat: '4 Farz + 2 Sunnah + 2 Nafl + 3 Witr', merits: ['Night protection', 'Reward of qiyam', 'Light in grave'], demerits: ['Unsafe sleep', 'Loss of reward', 'Weak iman'] },
  ],
}

export function HomePage() {
  const [dateLabel, setDateLabel] = React.useState<string>('')

  React.useEffect(() => {
    const now = new Date()
    const greg = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
    // Hijri calendar via Intl if supported
    let hijri = ''
    try {
      // @ts-ignore
      hijri = new Intl.DateTimeFormat('en-GB-u-ca-islamic', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
    } catch {
      hijri = 'Hijri unsupported'
    }
    setDateLabel(`${hijri} / ${greg}`)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-calligraphy text-4xl text-white drop-shadow">﷽ Welcome</h1>
        <div className="text-sm">Hijri/Gregorian: {dateLabel}</div>
      </div>

      <section>
        <h2 className="text-2xl mb-2">Daily Prayer Times</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prayerTimes.times.map((p) => (
            <motion.div
              key={p.name}
              whileHover={{ scale: 1.02 }}
              className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow hover:shadow-lg backdrop-blur-md transition"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.name}</div>
                <div className="text-secondary font-bold">{p.time}</div>
              </div>
              <div className="text-xs mt-1">Rakaat: {p.rakaat}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <ul className="list-disc pl-5">
                  {p.merits.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <ul className="list-disc pl-5 opacity-80">
                  {p.demerits.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow">
          <div className="font-semibold mb-2">Hadith of the Day</div>
          <p className="text-sm">“Actions are judged by intentions...” — Bukhari</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow">
          <div className="font-semibold mb-2">Announcements</div>
          <ul className="text-sm list-disc pl-5">
            <li>Barath Iravu: Friday 8PM</li>
            <li>Mehraj Iravu: Next Saturday</li>
            <li>Nikkah: Masjid Hall, 5PM</li>
          </ul>
        </motion.div>
        <QiblaCard />
      </section>
    </div>
  )
}


