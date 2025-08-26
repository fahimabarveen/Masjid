import React, { useState } from 'react'

interface LoginScreenProps {
	onLogin: (masjidName: string, location: string) => void
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
	const [masjidName, setMasjidName] = useState('')
	const [location, setLocation] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!masjidName.trim() || !location.trim()) return

		setIsSubmitting(true)
		// Simulate login process
		await new Promise(resolve => setTimeout(resolve, 1000))
		onLogin(masjidName.trim(), location.trim())
		setIsSubmitting(false)
	}

	return (
		<div className="min-h-screen w-full bg-brand-gradient flex items-center justify-center p-4 animate-fade-in">
			<div className="w-full max-w-md animate-slide-up">
				{/* Logo and Title */}
				<div className="text-center mb-8">
					<div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg animate-bounce-gentle">
						<span className="text-4xl">🕌</span>
					</div>
					<h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide">
						Masjid Dashboard
					</h1>
					<p className="text-white/80 text-lg">Sign in to continue</p>
				</div>

				{/* Login Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<label htmlFor="masjidName" className="block text-white font-medium text-lg">
							Masjid Name
						</label>
						<input
							id="masjidName"
							type="text"
							value={masjidName}
							onChange={(e) => setMasjidName(e.target.value)}
							placeholder="Masjid Name"
							className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 text-lg"
							required
							disabled={isSubmitting}
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="location" className="block text-white font-medium text-lg">
							Location
						</label>
						<input
							id="location"
							type="text"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							placeholder="Location"
							className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 text-lg"
							required
							disabled={isSubmitting}
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting || !masjidName.trim() || !location.trim()}
						className="w-full py-3 px-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-semibold text-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
					>
						{isSubmitting ? (
							<div className="flex items-center justify-center gap-2">
								<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
								Signing In...
							</div>
						) : (
							'Sign In'
						)}
					</button>
				</form>

				{/* Footer */}
				<div className="text-center mt-8 text-white/60 text-sm">
					<p>Welcome to your Masjid Management System</p>
				</div>
			</div>
		</div>
	)
}

export default LoginScreen
