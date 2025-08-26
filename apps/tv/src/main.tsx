import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import LoginScreen from './components/LoginScreen'

// ---- Utilities ----
const useInterval = (callback: () => void, delayMs: number) => {
	const saved = React.useRef(callback)
	React.useEffect(() => {
		saved.current = callback
	}, [callback])
	React.useEffect(() => {
		if (delayMs === null as any) return
		const id = setInterval(() => saved.current(), delayMs)
		return () => clearInterval(id)
	}, [delayMs])
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
	<div className={`glass rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 animate-slide-up ${className}`}>{children}</div>
)

const BigIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-secondary to-tertiary flex items-center justify-center text-4xl md:text-5xl text-accent shadow-2xl transform transition-transform animate-float">
		{children}
		</div>
	)

// ---- Shared prayer schedule & helpers ----
const PRAYERS = [
	{ key: 'tahajjud', icon: '🌙', name: 'Tahajjud', adhan: '02:30', iqamah: '-' },
	{ key: 'fajr', icon: '🌅', name: 'Fajr', adhan: '05:10', iqamah: '05:30' },
	{ key: 'sunrise', icon: '🌅', name: 'Sunrise', adhan: '06:32', iqamah: '-' },
	{ key: 'ishraq', icon: '🔆', name: 'Ishraq', adhan: '06:45', iqamah: '-' },
	{ key: 'duha', icon: '☀️', name: 'Duha', adhan: '08:00', iqamah: '-' },
	{ key: 'dhuhr', icon: '🏙️', name: 'Dhuhr', adhan: '13:15', iqamah: '13:30' },
	{ key: 'asr', icon: '🌇', name: 'Asr', adhan: '17:00', iqamah: '17:15' },
	{ key: 'maghrib', icon: '🌆', name: 'Maghrib', adhan: '20:22', iqamah: '20:22' },
	{ key: 'isha', icon: '🌃', name: 'Isha', adhan: '22:00', iqamah: '22:15' },
	{ key: 'sunset', icon: '🌇', name: 'Sunset', adhan: '20:22', iqamah: '-' },
]

const parseToMinutes = (hhmm: string) => {
	const [h, m] = hhmm.split(':').map(Number)
	return h * 60 + m
}

const getNextPrayer = (now: Date) => {
	const nowMin = now.getHours() * 60 + now.getMinutes()
	for (const p of PRAYERS) {
		const aMin = parseToMinutes(p.adhan)
		if (aMin > nowMin) return p
	}
	return PRAYERS[0]
}

// ---- Top persistent menu ----
const countries = [
	{ code: 'US', name: 'United States', tz: 'America/New_York', flag: '🇺🇸' },
	{ code: 'GB', name: 'United Kingdom', tz: 'Europe/London', flag: '🇬🇧' },
	{ code: 'SA', name: 'Saudi Arabia', tz: 'Asia/Riyadh', flag: '🇸🇦' },
	{ code: 'PK', name: 'Pakistan', tz: 'Asia/Karachi', flag: '🇵🇰' },
	{ code: 'IN', name: 'India', tz: 'Asia/Kolkata', flag: '🇮🇳' },
]

const TopMenu: React.FC<{ onPrev: () => void; onNext: () => void; onLogout: () => void }> = ({ onPrev, onNext, onLogout }) => {
	const [now, setNow] = React.useState(new Date())
	const [ddOpen, setDdOpen] = React.useState(false)
	const [country, setCountry] = React.useState(countries[0])
	React.useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(id)
	}, [])

	const getHijri = () => {
		try {
			const day = new Intl.DateTimeFormat('en-TN-u-ca-islamic', { day: '2-digit' as any }).format(now)
			const monthName = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { month: 'long' as any }).format(now)
			const year = new Intl.DateTimeFormat('en-TN-u-ca-islamic', { year: 'numeric' as any }).format(now)
			return `${day} – ${monthName} – ${year}`
		} catch {
			return '— Hijri —'
		}
	}

	const countryTime = () => {
		try {
			return now.toLocaleTimeString('en-US', { timeZone: country.tz, hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' })
		} catch {
			return now.toLocaleTimeString('en-US')
		}
	}

	return (
		<header className="w-full bg-secondary/40 backdrop-blur-md border-b border-white/20">
			<div className="max-w-[1920px] mx-auto px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-tertiary flex items-center justify-center text-2xl text-accent shadow-lg">🕌</div>
					<div>
						<div className="text-xl md:text-2xl font-semibold">Minara Masjid</div>
						<div className="text-white/70 text-sm">{now.toLocaleDateString()} • {now.toLocaleTimeString()}</div>
					</div>
				</div>
				<div className="hidden md:block text-accent font-mono">{getHijri()}</div>
				<div className="flex items-center gap-2">
					{/* World clock dropdown */}
					<div className="relative">
						<button onClick={() => setDdOpen(!ddOpen)} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 shadow flex items-center gap-2">
							<span>🌍</span><span className="hidden sm:inline">{country.flag} {country.code}</span><span className="hidden lg:inline text-accent font-mono">{countryTime()}</span>
						</button>
						{ddOpen && (
							<div className="absolute right-0 mt-2 w-64 bg-white/95 text-gray-800 rounded-lg shadow-xl border border-white/30 p-2 z-50">
								{countries.map(c => (
									<button key={c.code} onClick={() => { setCountry(c); setDdOpen(false) }} className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${c.code===country.code?'bg-accent/30':'hover:bg-gray-100'}`}>
										<span className="flex items-center gap-2"><span>{c.flag}</span><span>{c.name}</span></span>
										<span className="font-mono text-sm">{now.toLocaleTimeString('en-US', { timeZone: c.tz, hour12: true, hour: 'numeric', minute: '2-digit' })}</span>
									</button>
								))}
							</div>
						)}
					</div>
					<button onClick={onPrev} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 shadow">◀</button>
					<button onClick={onNext} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 shadow">▶</button>
					<button onClick={onLogout} className="px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-400/40 text-red-100 shadow">Logout</button>
				</div>
		</div>
		</header>
	)
}

// ---- Persistent bottom bar (always visible) ----
const PrayerTimesBar: React.FC = () => {
	const today = new Date()
	const isFriday = today.getDay() === 5
	const [isRamadan, setIsRamadan] = React.useState(false)

	React.useEffect(() => {
		try {
			const formatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', { month: 'numeric' as any })
			const hijriMonth = Number(formatter.format(today)) // 9 => Ramadan
			setIsRamadan(hijriMonth === 9)
		} catch {
			setIsRamadan(today.getMonth() === 2 || today.getMonth() === 3)
		}
	}, [])

	return (
		<div className="w-full bg-secondary/40 backdrop-blur-md border-t border-white/20">
			<div className="max-w-[1920px] mx-auto px-4 py-4">
				{/* Friday & Ramadan Alerts */}
				<div className="flex flex-wrap items-center gap-3 mb-3">
					{isFriday && (
						<span className="px-3 py-1 rounded-lg bg-accent/20 text-accent font-semibold shadow">
							🕌 Jumu’ah Today: Khutbah 1:30 PM — Salah 2:00 PM
						</span>
					)}
					{isRamadan && (
						<span className="px-3 py-1 rounded-lg bg-tertiary/20 text-accent font-semibold shadow">
							🌙 Ramadan: Suhur 05:00 AM — Iftar 08:22 PM — Taraweeh 10:15 PM
						</span>
					)}
				</div>
				{/* Responsive grid with clear typography */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
					{PRAYERS.map(p => (
						<div key={p.key} className="rounded-xl p-3 bg-gradient-to-br from-secondary/50 to-tertiary/40 border border-white/20 shadow-xl backdrop-blur-md">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-tertiary flex items-center justify-center text-lg text-accent shadow">{p.icon}</div>
								<div className="flex-1 min-w-0">
									<div className="font-semibold tracking-wide text-sm md:text-base">{p.name}</div>
									<div className="font-mono text-xs md:text-sm text-accent/90 whitespace-nowrap">Adhan {p.adhan} • Iqamah {p.iqamah}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

// ---- Screens ----
const ScreenContainer: React.FC<{ children: React.ReactNode; onPrev: () => void; onNext: () => void; onLogout: () => void }> = ({ children, onPrev, onNext, onLogout }) => (
	<div className="min-h-screen w-full bg-brand-gradient text-white">
		<div className="flex flex-col min-h-screen">
			<TopMenu onPrev={onPrev} onNext={onNext} onLogout={onLogout} />
			<main className="flex-1 flex items-center justify-center p-6 md:p-10">{children}</main>
			<PrayerTimesBar />
		</div>
	</div>
)

const Screen1: React.FC<{ onDone: () => void; onPrev: () => void; onNext: () => void; onLogout: () => void }> = ({ onDone, onPrev, onNext, onLogout }) => {
	useInterval(onDone, 10000)
	return (
		<ScreenContainer onPrev={onPrev} onNext={onNext} onLogout={onLogout}>
			<div className="max-w-5xl mx-auto text-center space-y-6">
				<div className="text-5xl md:text-7xl font-calligraphy animate-fade-in">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ</div>
				<div className="flex items-center justify-center gap-4">
					<BigIcon>🕌</BigIcon>
					<h1 className="text-3xl md:text-5xl font-bold tracking-wide">Welcome to Minara Masjid</h1>
					<BigIcon>🕌</BigIcon>
				</div>
		</div>
		</ScreenContainer>
	)
}

const Screen2: React.FC<{ onDone: () => void; onPrev: () => void; onNext: () => void; onLogout: () => void }> = ({ onDone, onPrev, onNext, onLogout }) => {
	useInterval(onDone, 10000)
	return (
		<ScreenContainer onPrev={onPrev} onNext={onNext} onLogout={onLogout}>
			<Card>
					<div className="grid md:grid-cols-2 gap-6 text-left">
						<div>
							<div className="text-2xl md:text-3xl mb-2">Masjid Entry Dua</div>
							<p className="text-xl">اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ</p>
							<p className="mt-2 text-accent">O Allah, open for me the doors of Your mercy.</p>
						</div>
						<div>
							<div className="text-2xl md:text-3xl mb-2">Masjid Exit Dua</div>
							<p className="text-xl">اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ</p>
							<p className="mt-2 text-accent">O Allah, I ask You of Your bounty.</p>
						</div>
					</div>
				</Card>
		</ScreenContainer>
	)
}

const Screen3: React.FC<{ onDone: () => void; onPrev: () => void; onNext: () => void; onLogout: () => void }> = ({ onDone, onPrev, onNext, onLogout }) => {
	useInterval(onDone, 10000)
	return (
		<ScreenContainer onPrev={onPrev} onNext={onNext} onLogout={onLogout}>
			<Card className="text-center max-w-3xl">
				<div className="flex items-center justify-center gap-5 mb-4">
					<BigIcon>🔕</BigIcon>
					<h2 className="text-4xl md:text-5xl font-bold">Mobile Silent Reminder</h2>
					<BigIcon>📱</BigIcon>
			</div>
				<p className="text-accent text-lg">Please keep your phones on silent inside the Masjid.</p>
			</Card>
	</ScreenContainer>
)
}

const Screen4: React.FC<{ onDone: () => void; onPrev: () => void; onNext: () => void; onLogout: () => void }> = ({ onDone, onPrev, onNext, onLogout }) => {
	useInterval(onDone, 10000)
	const [now, setNow] = React.useState(new Date())
	React.useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(id)
	}, [])
	const nextPrayer = getNextPrayer(now)
	return (
		<ScreenContainer onPrev={onPrev} onNext={onNext} onLogout={onLogout}>
			<Card className="text-center max-w-3xl">
				<div className="flex items-center justify-center gap-5 mb-4">
					<BigIcon>🛎️</BigIcon>
					<h2 className="text-4xl md:text-5xl font-bold">Prayer Alert</h2>
					<BigIcon>🕰️</BigIcon>
				</div>
				<div className="flex items-center justify-center gap-3 text-3xl md:text-4xl">
					<span>{nextPrayer.icon}</span>
					<span className="font-bold">{nextPrayer.name}</span>
					<span className="text-accent font-mono">{nextPrayer.adhan}</span>
		</div>
				<div className="mt-2 text-accent">Iqamah: {nextPrayer.iqamah}</div>
			</Card>
	</ScreenContainer>
)
}

const hadiths = [
	{ ar: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ', en: 'Actions are but by intentions. — Sahih al-Bukhari 1' },
	{ ar: 'الدِّينُ النَّصِيحَةُ', en: 'Religion is sincere advice. — Muslim 55' },
	{ ar: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ', en: 'A Muslim is the one from whose tongue and hand others are safe. — Bukhari 10' },
]

const Screen5: React.FC<{ onDone: () => void; onPrev: () => void; onNext: () => void; onLogout: () => void }> = ({ onDone, onPrev, onNext, onLogout }) => {
	useInterval(onDone, 10000)
	const [idx] = React.useState<number>(Math.floor(Date.now() / (24 * 60 * 60 * 1000)) % hadiths.length)
	const h = hadiths[idx]
	return (
		<ScreenContainer onPrev={onPrev} onNext={onNext} onLogout={onLogout}>
			<Card className="text-center max-w-4xl">
				<div className="flex items-center justify-center gap-5 mb-4">
					<BigIcon>📖</BigIcon>
					<h2 className="text-4xl md:text-5xl font-bold">Daily Hadith</h2>
					<BigIcon>✨</BigIcon>
			</div>
				<div className="text-3xl md:text-4xl mb-3">{h.ar}</div>
				<div className="text-accent text-xl md:text-2xl">{h.en}</div>
			</Card>
		</ScreenContainer>
	)
}

const Screen6: React.FC<{ onDone: () => void; onPrev: () => void; onNext: () => void; onLogout: () => void }> = ({ onDone, onPrev, onNext, onLogout }) => {
	useInterval(onDone, 10000)
	return (
		<ScreenContainer onPrev={onPrev} onNext={onNext} onLogout={onLogout}>
			<Card className="max-w-4xl">
				<h2 className="text-4xl md:text-5xl font-bold text-center mb-4">📢 Announcements</h2>
				<ul className="space-y-2 text-xl">
					<li>⭐ Baraat Night – Program after Isha</li>
					<li>🌙 Milad-un-Nabi – Community Mawlid Gathering</li>
					<li>🕯️ Ashura – Fasting on 9th and 10th Muharram</li>
			</ul>
			</Card>
	</ScreenContainer>
)
}

const Screen7: React.FC<{ onDone: () => void; onPrev: () => void; onNext: () => void; onLogout: () => void }> = ({ onDone, onPrev, onNext, onLogout }) => {
	useInterval(onDone, 10000)
	return (
		<ScreenContainer onPrev={onPrev} onNext={onNext} onLogout={onLogout}>
			<Card className="max-w-3xl text-center">
				<div className="flex items-center justify-center gap-5 mb-4">
					<BigIcon>💝</BigIcon>
					<h2 className="text-4xl md:text-5xl font-bold">Donation</h2>
					<BigIcon>🤝</BigIcon>
				</div>
			<div className="flex flex-col items-center gap-4">
					<div className="bg-white rounded p-4 text-black shadow-xl">QR CODE</div>
			</div>
			</Card>
	</ScreenContainer>
)
}

const Screen8: React.FC<{ onDone: () => void; onPrev: () => void; onNext: () => void; onLogout: () => void }> = ({ onDone, onPrev, onNext, onLogout }) => {
	useInterval(onDone, 10000)
	return (
		<ScreenContainer onPrev={onPrev} onNext={onNext} onLogout={onLogout}>
			<Card className="text-center max-w-3xl">
				<div className="flex items-center justify-center gap-5 mb-4">
					<BigIcon>📞</BigIcon>
					<h2 className="text-4xl md:text-5xl font-bold">Contact & Support</h2>
					<BigIcon>🔗</BigIcon>
				</div>
			<div className="text-2xl">Helpline: (555) 123-4567</div>
				<div className="text-2xl flex items-center gap-2 justify-center mt-2">Website: <a className="underline text-accent" href="https://example.com" target="_blank" rel="noreferrer">example.com</a></div>
			</Card>
	</ScreenContainer>
)
}

// ---- App ----

type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

const App: React.FC = () => {
	const [screen, setScreen] = React.useState<ScreenId>(1)
	const [user, setUser] = React.useState<{ masjidName: string; location: string } | null>(null)
	const gotoNext = React.useCallback(() => setScreen(prev => (prev === 8 ? 1 : ((prev + 1) as ScreenId))), [])
	const gotoPrev = React.useCallback(() => setScreen(prev => (prev === 1 ? 8 : ((prev - 1) as ScreenId))), [])

	if (!user) {
		return <LoginScreen onLogin={(mn, loc) => setUser({ masjidName: mn, location: loc })} />
	}

	return (
		<div className="text-white">
			{screen === 1 && <Screen1 onDone={gotoNext} onPrev={gotoPrev} onNext={gotoNext} onLogout={() => setUser(null)} />}
			{screen === 2 && <Screen2 onDone={gotoNext} onPrev={gotoPrev} onNext={gotoNext} onLogout={() => setUser(null)} />}
			{screen === 3 && <Screen3 onDone={gotoNext} onPrev={gotoPrev} onNext={gotoNext} onLogout={() => setUser(null)} />}
			{screen === 4 && <Screen4 onDone={gotoNext} onPrev={gotoPrev} onNext={gotoNext} onLogout={() => setUser(null)} />}
			{screen === 5 && <Screen5 onDone={gotoNext} onPrev={gotoPrev} onNext={gotoNext} onLogout={() => setUser(null)} />}
			{screen === 6 && <Screen6 onDone={gotoNext} onPrev={gotoPrev} onNext={gotoNext} onLogout={() => setUser(null)} />}
			{screen === 7 && <Screen7 onDone={gotoNext} onPrev={gotoPrev} onNext={gotoNext} onLogout={() => setUser(null)} />}
			{screen === 8 && <Screen8 onDone={gotoNext} onPrev={gotoPrev} onNext={gotoNext} onLogout={() => setUser(null)} />}
		</div>
	)
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)


