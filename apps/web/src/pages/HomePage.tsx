import React from 'react'
import { motion } from 'framer-motion'
// Removed QiblaCard from Home per new requirements
import { HadithOfTheDay } from '../components/HadithOfTheDay'
import { NextPrayerAlert } from '../components/NextPrayerAlert'
import { Sunrise, Sun, SunMedium, Sunset, Moon, Clock, MapPin, CalendarClock, Globe } from 'lucide-react'


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

function useWorldClock() {
  const [country, setCountry] = React.useState<string>('Saudi Arabia — Asia/Riyadh')
  const [now, setNow] = React.useState<Date>(new Date())
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const zone = country.split(' — ')[1]
  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: zone as any }).format(now)
  return { country, setCountry, time }
}

export function HomePage() {
  const [dateLabel, setDateLabel] = React.useState<string>('')
  const { country, setCountry, time } = useWorldClock()

  React.useEffect(() => {
    const now = new Date()
    const greg = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit' }).format(now)
    // Hijri calendar via Intl if supported
    let hijri = ''
    try {
      // @ts-ignore
      const hijriFmt = new Intl.DateTimeFormat('en-GB-u-ca-islamic', { year: 'numeric', month: 'long', day: '2-digit' })
      hijri = hijriFmt.format(now)
    } catch {
      hijri = 'Hijri unsupported'
    }
    setDateLabel(`${hijri}  |  ${greg}`)
  }, [])

  return (
    <div className="space-y-6 heading-bright">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-calligraphy text-4xl text-white drop-shadow">﷽ Welcome</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm"><CalendarClock size={16}/> {dateLabel}</div>
        </div>
      </div>

      <NextPrayerAlert />

      {/* Masjid Dua section */}
      <section>
        <h2 className="text-2xl mb-2">Masjid Dua:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="rounded-xl p-4 shadow backdrop-blur-md bg-light/80 dark:bg-white/10 border border-secondary/20"
          >
            <div className="text-sm font-semibold mb-1">Entry Dua</div>
            <div className="font-calligraphy text-2xl">اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ</div>
            <div className="text-sm mt-2 opacity-90 italic">Allahumma iftah li abwaba rahmatik</div>
            <div className="text-sm mt-1 opacity-90">O Allah, open for me the doors of Your mercy.</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="rounded-xl p-4 shadow backdrop-blur-md bg-light/80 dark:bg-white/10 border border-secondary/20"
          >
            <div className="text-sm font-semibold mb-1">Exit Dua</div>
            <div className="font-calligraphy text-2xl">اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ</div>
            <div className="text-sm mt-2 opacity-90 italic">Allahumma inni as'aluka min fadlik</div>
            <div className="text-sm mt-1 opacity-90">O Allah, I ask You of Your bounty.</div>
          </motion.div>
        </div>
      </section>

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
          {/* Jummah with merits/demerits inside */}
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow hover:shadow-lg backdrop-blur-md transition">
            <div className="flex items-center justify-between">
              <div className="font-semibold flex items-center gap-2"><Clock size={18} /><span>Jummah</span></div>
              <div className="text-secondary font-bold">12:45</div>
            </div>
            <div className="text-xs mt-1">Khutbah + Salah</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <ul className="list-disc pl-5">
                <li>Sins forgiven between two Fridays</li>
                <li>Special hour of accepted duas</li>
                <li>Reward for walking early to masjid</li>
                <li>Angels record your presence</li>
              </ul>
              <ul className="list-disc pl-5 opacity-80">
                <li>Loss of weekly blessings</li>
                <li>Neglecting khutbah guidance</li>
                <li>Missing communal unity</li>
                <li>Reduced spiritual growth</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HadithOfTheDay />
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow">
          <div className="font-semibold mb-2 flex items-center gap-2"><CalendarClock size={18} /> Announcements</div>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2"><CalendarClock size={16}/> Barath Iravu: Friday 8PM</li>
            <li className="flex items-start gap-2"><CalendarClock size={16}/> Mehraj Iravu: Next Saturday</li>
            <li className="flex items-start gap-2"><MapPin size={16}/> Nikkah: Masjid Hall <span className="opacity-80">— 5:00 PM</span></li>
          </ul>
        </motion.div>
        {/* World clock */}
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg bg-white/60 dark:bg-black/20 p-4 shadow">
          <div className="font-semibold mb-2 flex items-center gap-2"><Globe size={18}/> World Clock</div>
          <div className="flex items-center gap-2 text-2xl font-mono text-[#3E5F44]">{time}</div>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="mt-3 w-full rounded bg-white/70 dark:bg-black/30 px-3 py-2 text-sm">
            <option>Saudi Arabia — Asia/Riyadh</option>
            <option>United Kingdom — Europe/London</option>
            <option>United States (NY) — America/New_York</option>
            <option>Malaysia — Asia/Kuala_Lumpur</option>
            <option>Australia (Sydney) — Australia/Sydney</option>
            <option>UAE — Asia/Dubai</option>
            <option>India — Asia/Kolkata</option>
          </select>
        </motion.div>
      </section>

      {/* Duas section removed per new requirements */}
    </div>
  )
}


