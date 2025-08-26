import React from 'react'

export type PrayerTime = {
	name: string
	adhan: string
	iqamah: string
}

type PrayerGridProps = {
	items: PrayerTime[]
	current: string
}

const PrayerGrid: React.FC<PrayerGridProps> = ({ items, current }) => {
	return (
		<section className="w-full">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
				{items.map(p => {
					const isCurrent = p.name.toLowerCase() === current.toLowerCase()
					return (
						<div key={p.name} className={`rounded-xl p-3 shadow ${isCurrent ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`}>
							<div className="text-lg font-semibold flex items-center gap-2">
								<span>{iconFor(p.name)}</span>
								<span>{p.name}</span>
							</div>
							<div className="mt-2 grid grid-cols-2 text-sm">
								<div className="opacity-80">Adhan</div>
								<div className="text-right font-medium">{p.adhan}</div>
								<div className="opacity-80">Iqamah</div>
								<div className="text-right font-medium">{p.iqamah}</div>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}

const iconFor = (name: string) => {
	const key = name.toLowerCase()
	if (key.includes('fajr') || key.includes('fajar')) return '🌅'
	if (key.includes('dhu') || key.includes('zuhr') || key.includes('dhur')) return '🏙️'
	if (key.includes('asr')) return '🌇'
	if (key.includes('magh')) return '🌆'
	if (key.includes('isha')) return '🌃'
	if (key.includes('sunrise')) return '🌞'
	if (key.includes('tahaj')) return '🌙'
	return '🕌'
}

export default PrayerGrid



