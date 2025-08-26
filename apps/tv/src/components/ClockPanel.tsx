import React from 'react'

type ClockPanelProps = {
	currentPrayer: string
	currentPrayerTime: string
	countdown: string
	sunrise: string
}

const ClockPanel: React.FC<ClockPanelProps> = ({ currentPrayer, currentPrayerTime, countdown, sunrise }) => {
	const [now, setNow] = React.useState<Date>(new Date())
	React.useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(id)
	}, [])

	return (
		<section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-6 items-center">
			{/* Analog + digital clock */}
			<div className="flex items-center gap-6 bg-white/10 rounded-xl p-6 shadow-lg">
				<div className="relative w-56 h-56 md:w-64 md:h-64 bg-white rounded-full shadow-inner">
					{/* simple analog clock */}
					<AnalogClock date={now} />
				</div>
				<div className="flex-1">
					<div className="text-4xl md:text-6xl font-bold">{now.toLocaleTimeString()}</div>
					<div className="mt-3 inline-flex items-center gap-2 bg-amber-200/20 text-amber-100 px-3 py-1 rounded-full">
						<span className="text-xl">☀️</span>
						<span className="text-lg">Sunrise: {sunrise}</span>
					</div>
				</div>
			</div>

			{/* Current prayer card */}
			<div className="bg-primary/80 rounded-xl p-6 shadow-lg text-white">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3 text-2xl font-semibold">
						<span>🕌</span>
						<span>{currentPrayer}</span>
					</div>
					<div className="text-right">
						<div className="text-3xl font-bold">{currentPrayerTime}</div>
						<div className="text-emerald-200 text-lg">({countdown})</div>
					</div>
				</div>
			</div>

			{/* Jummah card */}
			<div className="bg-white/10 rounded-xl p-6 shadow-lg w-full lg:w-64">
				<h3 className="text-xl font-semibold mb-3 text-center">Jummah</h3>
				<div className="space-y-3">
					<div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
						<span>12:30 PM</span>
						<span className="text-sm text-white/80">1st</span>
					</div>
					<div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
						<span>01:30 PM</span>
						<span className="text-sm text-white/80">2nd</span>
					</div>
				</div>
			</div>
		</section>
	)
}

const AnalogClock: React.FC<{ date: Date }> = ({ date }) => {
	const seconds = date.getSeconds()
	const minutes = date.getMinutes() + seconds / 60
	const hours = (date.getHours() % 12) + minutes / 60

	const hourDeg = hours * 30
	const minuteDeg = minutes * 6
	const secondDeg = seconds * 6

	return (
		<div className="absolute inset-0 flex items-center justify-center">
			<div className="relative w-[85%] h-[85%] rounded-full bg-white shadow">
				{/* ticks */}
				{Array.from({ length: 60 }).map((_, i) => (
					<div
						key={i}
						className="absolute left-1/2 top-1/2 origin-[0_0]"
						style={{ transform: `rotate(${i * 6}deg) translateX(42%)`, width: i % 5 === 0 ? 12 : 6, height: 2, backgroundColor: i % 5 === 0 ? '#3E5F44' : '#b0b0b0' }}
					/>
				))}
				{/* hands */}
				<div className="absolute left-1/2 top-1/2 origin-[0_0] bg-black" style={{ width: '28%', height: 4, transform: `rotate(${hourDeg}deg)` }} />
				<div className="absolute left-1/2 top-1/2 origin-[0_0] bg-black/70" style={{ width: '36%', height: 3, transform: `rotate(${minuteDeg}deg)` }} />
				<div className="absolute left-1/2 top-1/2 origin-[0_0] bg-red-500" style={{ width: '40%', height: 2, transform: `rotate(${secondDeg}deg)` }} />
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
			</div>
		</div>
	)
}

export default ClockPanel



