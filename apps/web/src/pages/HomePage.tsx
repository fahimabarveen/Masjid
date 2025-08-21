import React from 'react'
import { motion } from 'framer-motion'
// Removed QiblaCard from Home per new requirements
import { HadithOfTheDay } from '../components/HadithOfTheDay'
import { NextPrayerAlert } from '../components/NextPrayerAlert'
import { HijriDate } from '../components/HijriDate'
import { Bell, Megaphone, Sunrise, Sun, SunMedium, Sunset, Moon, Clock } from 'lucide-react'


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
    <div className="space-y-6 heading-bright">
      <div className="flex items-center justify-between">
        <h1 className="font-calligraphy text-4xl text-white drop-shadow">﷽ Welcome</h1>
        <div className="flex items-center gap-3">
          <HijriDate />
          <div className="text-sm">{dateLabel}</div>
        </div>
      </div>

      <NextPrayerAlert />

      <section>
        <h2 className="text-2xl mb-2 text-yellow-300">Daily Prayer Times</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prayerTimes.times.map((p) => (
            <motion.div
              key={p.name}
              whileHover={{ scale: 1.02 }}
              className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow hover:shadow-lg backdrop-blur-md transition"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold flex items-center gap-2">
                  {p.name === 'Fajr' && <Sunrise size={18} />}
                  {p.name === 'Dhuhr' && <Sun size={18} />}
                  {p.name === 'Asr' && <SunMedium size={18} />}
                  {p.name === 'Maghrib' && <Sunset size={18} />}
                  {p.name === 'Isha' && <Moon size={18} />}
                  <span>{p.name}</span>
                </div>
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
          {/* Jummah */}
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow hover:shadow-lg backdrop-blur-md transition">
            <div className="flex items-center justify-between">
              <div className="font-semibold flex items-center gap-2"><Clock size={18} /><span>Jummah</span></div>
              <div className="text-secondary font-bold">12:45</div>
            </div>
            <div className="text-xs mt-1">Khutbah + Salah</div>
          </motion.div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HadithOfTheDay />
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow">
          <div className="font-semibold mb-2 flex items-center gap-2"><Megaphone size={18} /> Announcements</div>
          <ul className="text-sm list-disc pl-5">
            <li>Barath Iravu: Friday 8PM</li>
            <li>Mehraj Iravu: Next Saturday</li>
            <li>Nikkah: Masjid Hall, 5PM</li>
          </ul>
        </motion.div>
        {/* Qibla removed from Home as requested */}
      </section>

      {/* Duas section removed per new requirements */}
    </div>
  )
}


