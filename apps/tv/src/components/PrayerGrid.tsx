import React, { useEffect, useRef } from 'react'

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
	const scrollerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = scrollerRef.current
		if (!container) return
		const index = items.findIndex(p => p.name.toLowerCase() === current.toLowerCase())
		if (index >= 0) {
			const card = container.querySelectorAll('[data-prayer-card]')[index] as HTMLElement | undefined
			if (card) {
				const cardLeft = card.offsetLeft
				const cardRight = cardLeft + card.offsetWidth
				const viewLeft = container.scrollLeft
				const viewRight = viewLeft + container.clientWidth
				if (cardLeft < viewLeft || cardRight > viewRight) {
					container.scrollTo({ left: Math.max(cardLeft - 16, 0), behavior: 'smooth' })
				}
			}
		}
	}, [items, current])

	const scrollByAmount = (direction: 'left' | 'right') => {
		const container = scrollerRef.current
		if (!container) return
		const card = container.querySelector('[data-prayer-card]') as HTMLElement | null
		const step = card ? card.offsetWidth + 12 : Math.round(container.clientWidth * 0.6)
		const delta = direction === 'left' ? -step : step
		container.scrollBy({ left: delta, behavior: 'smooth' })
	}

	const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (e.key === 'ArrowLeft') {
			e.preventDefault()
			scrollByAmount('left')
		} else if (e.key === 'ArrowRight') {
			e.preventDefault()
			scrollByAmount('right')
		}
	}

	return (
		<section className="w-full">
			<div className="relative" onKeyDown={onKeyDown} tabIndex={0} aria-label="Prayer times scroller">
				<button
					type="button"
					aria-label="Scroll left"
					onClick={() => scrollByAmount('left')}
					className="hidden lg:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white shadow backdrop-blur-sm"
				>
					◀
				</button>

				<button
					type="button"
					aria-label="Scroll right"
					onClick={() => scrollByAmount('right')}
					className="hidden lg:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white shadow backdrop-blur-sm"
				>
					▶
				</button>

				<div
					ref={scrollerRef}
					className="flex gap-3 overflow-x-auto scroll-smooth px-2 py-1 no-scrollbar"
				>
					{items.map(p => {
						const isCurrent = p.name.toLowerCase() === current.toLowerCase()
						return (
							<div
								key={p.name}
								data-prayer-card
								className={`min-w-[220px] w-[220px] rounded-2xl p-4 shadow border border-white/10 ${isCurrent ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`}
							>
								<div className="text-xl font-semibold flex items-center gap-2 leading-none">
									<span>{iconFor(p.name)}</span>
									<span>{p.name}</span>
								</div>
								<div className="mt-3 space-y-2 text-sm">
									<div className="flex items-center justify-between">
										<div className="opacity-80">Adhan</div>
										<div className="font-medium tabular-nums">{p.adhan}</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="opacity-80">Iqamah</div>
										<div className="font-medium tabular-nums">{p.iqamah}</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
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



