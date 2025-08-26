import React, { useState, useEffect } from 'react'

interface PrayerTime {
	name: string
	time: string
	icon: string
	isNext: boolean
}

const Dashboard: React.FC = () => {
	const [currentTime, setCurrentTime] = useState(new Date())
	const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null)

	const prayerTimes: PrayerTime[] = [
		{ name: 'Fajr', time: '05:30', icon: '🌅', isNext: false },
		{ name: 'Sunrise', time: '06:45', icon: '🌞', isNext: false },
		{ name: 'Dhuhr', time: '12:30', icon: '☀️', isNext: false },
		{ name: 'Asr', time: '16:00', icon: '🌇', isNext: false },
		{ name: 'Maghrib', time: '19:15', icon: '🌆', isNext: false },
		{ name: 'Isha', time: '20:45', icon: '🌃', isNext: false },
	]

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		// Calculate next prayer
		const now = currentTime
		const currentHour = now.getHours()
		const currentMinute = now.getMinutes()
		const currentTimeInMinutes = currentHour * 60 + currentMinute

		let nextPrayerFound = false
		const updatedPrayerTimes = prayerTimes.map(prayer => {
			const [prayerHour, prayerMinute] = prayer.time.split(':').map(Number)
			const prayerTimeInMinutes = prayerHour * 60 + prayerMinute
			
			if (prayerTimeInMinutes > currentTimeInMinutes && !nextPrayerFound) {
				nextPrayerFound = true
				return { ...prayer, isNext: true }
			}
			return { ...prayer, isNext: false }
		})

		const next = updatedPrayerTimes.find(p => p.isNext)
		setNextPrayer(next || null)

		return () => clearInterval(timer)
	}, [currentTime])

	const announcements = [
		'Jumu\'ah prayer will be held at 1:00 PM today',
		'Community iftar dinner this Saturday after Maghrib',
		'Islamic studies class for children every Sunday',
		'Ramadan preparation meeting next week',
	]

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString('en-US', {
			hour12: true,
			hour: 'numeric',
			minute: '2-digit',
			second: '2-digit'
		})
	}

	return (
		<div className="min-h-screen bg-brand-gradient p-4 lg:p-8 animate-fade-in">
			{/* Current Time Display */}
			<div className="text-center mb-8">
				<div className="text-6xl lg:text-8xl font-bold text-white mb-4 font-mono animate-pulse">
					{formatTime(currentTime)}
				</div>
				{nextPrayer && (
					<div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block animate-bounce-gentle">
						<div className="text-2xl lg:text-3xl text-white mb-2">
							Next Prayer: {nextPrayer.name}
						</div>
						<div className="text-4xl lg:text-5xl font-bold text-white">
							{nextPrayer.icon} {nextPrayer.time}
						</div>
					</div>
				)}
			</div>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
				{/* Prayer Times Card */}
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-up">
					<h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
						🕌 Prayer Times
					</h2>
					<div className="space-y-3">
						{prayerTimes.map((prayer, index) => (
							<div
								key={prayer.name}
								className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
									prayer.isNext
										? 'bg-secondary/30 border border-secondary/50 shadow-lg scale-105'
										: 'bg-white/10 hover:bg-white/20'
								}`}
							>
								<div className="flex items-center gap-3">
									<span className="text-2xl">{prayer.icon}</span>
									<span className={`font-semibold text-lg ${
										prayer.isNext ? 'text-secondary' : 'text-white'
									}`}>
										{prayer.name}
									</span>
								</div>
								<span className={`text-xl font-mono ${
									prayer.isNext ? 'text-secondary font-bold' : 'text-white/90'
								}`}>
									{prayer.time}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Announcements Card */}
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-up">
					<h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
						📢 Announcements
					</h2>
					<div className="space-y-4">
						{announcements.map((announcement, index) => (
							<div
								key={index}
								className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-200 hover:scale-105"
							>
								<div className="flex items-start gap-3">
									<span className="text-yellow-300 text-lg">•</span>
									<p className="text-white/90 text-sm lg:text-base leading-relaxed">
										{announcement}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Quick Actions Card */}
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-up">
					<h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
						⚡ Quick Actions
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<button className="bg-secondary/30 hover:bg-secondary/40 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105 border border-secondary/50">
							<div className="text-3xl mb-2">📖</div>
							<div className="text-white font-semibold">Quran</div>
						</button>
						<button className="bg-tertiary/30 hover:bg-tertiary/40 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105 border border-tertiary/50">
							<div className="text-3xl mb-2">🕌</div>
							<div className="text-white font-semibold">Qibla</div>
						</button>
						<button className="bg-accent/30 hover:bg-accent/40 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105 border border-accent/50">
							<div className="text-3xl mb-2">💝</div>
							<div className="text-white font-semibold">Donate</div>
						</button>
						<button className="bg-primary/30 hover:bg-primary/40 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105 border border-primary/50">
							<div className="text-3xl mb-2">📞</div>
							<div className="text-white font-semibold">Contact</div>
						</button>
					</div>
				</div>

				{/* Weather and Additional Info */}
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-up">
					<h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
						🌤️ Weather & Info
					</h2>
					<div className="space-y-4">
						<div className="bg-white/10 rounded-lg p-4 text-center">
							<div className="text-4xl mb-2">☀️</div>
							<div className="text-white text-2xl font-bold">72°F</div>
							<div className="text-white/80">Partly Cloudy</div>
						</div>
						<div className="bg-white/10 rounded-lg p-4">
							<div className="text-white/90 text-center">
								<div className="font-semibold mb-2">Adhan Volume</div>
								<div className="text-2xl">🔊</div>
								<div className="text-sm">High</div>
							</div>
						</div>
					</div>
				</div>

				{/* Recent Activities */}
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-up">
					<h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
						📊 Recent Activities
					</h2>
					<div className="space-y-3">
						{[
							{ activity: 'Fajr prayer completed', time: '5:30 AM', icon: '✅' },
							{ activity: 'Dhuhr prayer started', time: '12:30 PM', icon: '🕌' },
							{ activity: 'Community meeting', time: '2:00 PM', icon: '👥' },
							{ activity: 'Quran recitation', time: '4:00 PM', icon: '📖' },
						].map((item, index) => (
							<div key={index} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
								<span className="text-xl">{item.icon}</span>
								<div className="flex-1">
									<div className="text-white font-medium">{item.activity}</div>
									<div className="text-white/60 text-sm">{item.time}</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Donation Progress */}
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-up">
					<h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
						💝 Donation Progress
					</h2>
					<div className="space-y-4">
						<div className="bg-white/10 rounded-lg p-4">
							<div className="flex justify-between text-white mb-2">
								<span>Monthly Goal</span>
								<span>$5,000</span>
							</div>
							<div className="w-full bg-white/20 rounded-full h-3">
								<div className="bg-secondary h-3 rounded-full" style={{ width: '75%' }}></div>
							</div>
							<div className="text-white/80 text-center mt-2">
								$3,750 raised (75%)
							</div>
						</div>
						<button className="w-full bg-secondary/30 hover:bg-secondary/40 rounded-lg p-3 text-white font-semibold transition-all duration-200 hover:scale-105 border border-secondary/50">
							Make a Donation
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard

