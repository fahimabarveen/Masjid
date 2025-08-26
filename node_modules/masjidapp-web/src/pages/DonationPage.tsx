import React from 'react'
import { motion } from 'framer-motion'

type Cause = {
	key: string
	label: string
	icon: string
	desc: string
}

const causes: Cause[] = [
	{ key: 'general', label: 'General Fund', icon: '🤍', desc: 'Support daily masjid operations' },
	{ key: 'construction', label: 'Construction', icon: '📑', desc: 'Help expand our facilities' },
	{ key: 'education', label: 'Islamic Education', icon: '📗', desc: 'Fund educational programs' },
	{ key: 'charity', label: 'Charity Fund', icon: '🫶', desc: 'Help those in need' },
	{ key: 'iftar', label: 'Iftar Program', icon: '🍽️', desc: 'Sponsor community iftars' },
	{ key: 'zakat', label: 'Zakat Collection', icon: '🧮', desc: 'Fulfill your zakat obligation' },
]

const presetAmounts = [10, 25, 50, 100, 250, 500]

export function DonationPage() {
	const [selectedCause, setSelectedCause] = React.useState<Cause>(causes[0])
	const [selectedAmount, setSelectedAmount] = React.useState<number>(0)
	const [customAmount, setCustomAmount] = React.useState<string>('')
	const [name, setName] = React.useState<string>('')
	const [email, setEmail] = React.useState<string>('')
	const [message, setMessage] = React.useState<string>('')
	const [method, setMethod] = React.useState<'qr' | 'card' | 'paypal'>('qr')

	const amount = customAmount ? Number(customAmount) || 0 : selectedAmount

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold">Donations</h1>
				<div className="text-xs text-white">Support Your Community</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left: selection form */}
				<div className="lg:col-span-2 space-y-6">
					<section>
						<h2 className="text-lg font-semibold mb-3">Choose a Cause</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
							{causes.map((c) => (
								<motion.button
									key={c.key}
									whileHover={{ y: -2 }}
									onClick={() => setSelectedCause(c)}
									className={`text-left rounded-xl p-4 bg-white/70 dark:bg-black/30 shadow border ${
										selectedCause.key === c.key ? 'border-secondary' : 'border-transparent'
									}`}
								>
									<div className="flex items-center gap-3">
										<div className="text-2xl">{c.icon}</div>
										<div>
											<div className="font-semibold">{c.label}</div>
											<div className="text-xs opacity-80">{c.desc}</div>
										</div>
									</div>
								</motion.button>
							))}
						</div>
					</section>

					<section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div>
								<div className="font-semibold mb-2">Select Amount</div>
								<div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
									{presetAmounts.map((a) => (
										<button
											key={a}
											onClick={() => { setSelectedAmount(a); setCustomAmount('') }}
											className={`rounded px-3 py-2 bg-white/70 dark:bg-black/30 border shadow text-sm ${selectedAmount === a && !customAmount ? 'border-secondary' : 'border-transparent'}`}
										>
											${a}
										</button>
									))}
								</div>
							</div>
							<div>
								<div className="font-semibold mb-2">Custom Amount</div>
								<input
									type="number"
									placeholder="Enter amount"
									value={customAmount}
									onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0) }}
									className="w-full rounded bg-white/70 dark:bg-black/30 px-3 py-2 shadow"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<div className="space-y-3">
								<div className="font-semibold">Donor Information (Optional)</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
									<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="rounded bg-white/70 dark:bg-black/30 px-3 py-2 shadow" />
									<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded bg-white/70 dark:bg-black/30 px-3 py-2 shadow" />
								</div>
								<textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Leave a message or prayer request..." rows={3} className="w-full rounded bg-white/70 dark:bg-black/30 px-3 py-2 shadow" />
							</div>

							<div className="space-y-3">
								<div className="font-semibold">Payment Method</div>
								<div className="flex gap-2">
									{[
										{ key: 'qr', label: 'QR Code' },
										{ key: 'card', label: 'Card' },
										{ key: 'paypal', label: 'PayPal' },
									].map((m) => (
										<button key={m.key} onClick={() => setMethod(m.key as any)} className={`rounded px-3 py-2 bg-white/70 dark:bg-black/30 border shadow text-sm ${method === m.key ? 'border-secondary' : 'border-transparent'}`}>
											{m.label}
										</button>
									))}
								</div>
							</div>
						</div>
					</section>
				</div>

				{/* Right: summary + QR */}
				<div className="space-y-6">
					<section className="rounded-xl bg-white/70 dark:bg-black/30 p-4 shadow">
						<div className="flex items-center justify-between">
							<div className="text-sm opacity-80">Category:</div>
							<span className="text-xs rounded-full bg-secondary text-light px-2 py-1">{selectedCause.label}</span>
						</div>
						<div className="mt-2 text-sm">Amount: <span className="font-semibold">${amount.toFixed(0)}</span></div>
						<hr className="my-3 border-primary/20" />
						<div className="text-lg font-semibold flex items-center justify-between">
							<span>Total</span>
							<span>${amount.toFixed(0)}</span>
						</div>
					</section>

					<section className="rounded-xl bg-white/70 dark:bg-black/30 p-4 shadow">
						<div className="font-semibold mb-2">Complete Payment</div>
						{method === 'qr' ? (
							<div className="text-center">
								<div className="mx-auto mb-3 w-28 h-28 rounded bg-white flex items-center justify-center text-3xl">🔳</div>
								<div className="text-sm opacity-80 mb-2">Generate QR code for UPI payment</div>
								<button className="w-full rounded bg-secondary text-light px-3 py-2 hover:bg-primary">Generate QR Code</button>
							</div>
						) : method === 'card' ? (
							<div className="text-sm opacity-80">Card payment placeholder integration</div>
						) : (
							<div className="text-sm opacity-80">PayPal payment placeholder integration</div>
						)}
					</section>

					<section className="rounded-xl bg-white/70 dark:bg-black/30 p-4 shadow">
						<div className="font-semibold mb-2">Recent Donations</div>
						<ul className="text-sm space-y-1">
							<li>01 Jan 2025 — $25 — General Fund</li>
							<li>12 Feb 2025 — $50 — Education</li>
						</ul>
					</section>
				</div>
			</div>
		</div>
	)
}


