import React, { useState, useEffect } from 'react'

interface HeaderProps {
	masjidName: string
	location: string
	onLogout: () => void
}

interface Country {
	code: string
	name: string
	timezone: string
	flag: string
}

const countries: Country[] = [
	{ code: 'US', name: 'United States', timezone: 'America/New_York', flag: '🇺🇸' },
	{ code: 'GB', name: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
	{ code: 'SA', name: 'Saudi Arabia', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
	{ code: 'PK', name: 'Pakistan', timezone: 'Asia/Karachi', flag: '🇵🇰' },
	{ code: 'IN', name: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
	{ code: 'TR', name: 'Turkey', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
	{ code: 'MY', name: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
	{ code: 'ID', name: 'Indonesia', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
	{ code: 'EG', name: 'Egypt', timezone: 'Africa/Cairo', flag: '🇪🇬' },
	{ code: 'AE', name: 'UAE', timezone: 'Asia/Dubai', flag: '🇦🇪' },
	{ code: 'JO', name: 'Jordan', timezone: 'Asia/Amman', flag: '🇯🇴' },
	{ code: 'LB', name: 'Lebanon', timezone: 'Asia/Beirut', flag: '🇱🇧' },
	{ code: 'SY', name: 'Syria', timezone: 'Asia/Damascus', flag: '🇸🇾' },
	{ code: 'IQ', name: 'Iraq', timezone: 'Asia/Baghdad', flag: '🇮🇶' },
	{ code: 'IR', name: 'Iran', timezone: 'Asia/Tehran', flag: '🇮🇷' },
	{ code: 'AF', name: 'Afghanistan', timezone: 'Asia/Kabul', flag: '🇦🇫' },
	{ code: 'BD', name: 'Bangladesh', timezone: 'Asia/Dhaka', flag: '🇧🇩' },
	{ code: 'LK', name: 'Sri Lanka', timezone: 'Asia/Colombo', flag: '🇱🇰' },
	{ code: 'NP', name: 'Nepal', timezone: 'Asia/Kathmandu', flag: '🇳🇵' },
	{ code: 'MM', name: 'Myanmar', timezone: 'Asia/Yangon', flag: '🇲🇲' },
	{ code: 'TH', name: 'Thailand', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
	{ code: 'VN', name: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
	{ code: 'PH', name: 'Philippines', timezone: 'Asia/Manila', flag: '🇵🇭' },
	{ code: 'SG', name: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' },
	{ code: 'BR', name: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
	{ code: 'AR', name: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
	{ code: 'MX', name: 'Mexico', timezone: 'America/Mexico_City', flag: '🇲🇽' },
	{ code: 'CA', name: 'Canada', timezone: 'America/Toronto', flag: '🇨🇦' },
	{ code: 'AU', name: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' },
	{ code: 'NZ', name: 'New Zealand', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
	{ code: 'JP', name: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
	{ code: 'KR', name: 'South Korea', timezone: 'Asia/Seoul', flag: '🇰🇷' },
	{ code: 'CN', name: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
	{ code: 'RU', name: 'Russia', timezone: 'Europe/Moscow', flag: '🇷🇺' },
	{ code: 'DE', name: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪' },
	{ code: 'FR', name: 'France', timezone: 'Europe/Paris', flag: '🇫🇷' },
	{ code: 'IT', name: 'Italy', timezone: 'Europe/Rome', flag: '🇮🇹' },
	{ code: 'ES', name: 'Spain', timezone: 'Europe/Madrid', flag: '🇪🇸' },
	{ code: 'NL', name: 'Netherlands', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
	{ code: 'BE', name: 'Belgium', timezone: 'Europe/Brussels', flag: '🇧🇪' },
	{ code: 'CH', name: 'Switzerland', timezone: 'Europe/Zurich', flag: '🇨🇭' },
	{ code: 'AT', name: 'Austria', timezone: 'Europe/Vienna', flag: '🇦🇹' },
	{ code: 'SE', name: 'Sweden', timezone: 'Europe/Stockholm', flag: '🇸🇪' },
	{ code: 'NO', name: 'Norway', timezone: 'Europe/Oslo', flag: '🇳🇴' },
	{ code: 'DK', name: 'Denmark', timezone: 'Europe/Copenhagen', flag: '🇩🇰' },
	{ code: 'FI', name: 'Finland', timezone: 'Europe/Helsinki', flag: '🇫🇮' },
	{ code: 'PL', name: 'Poland', timezone: 'Europe/Warsaw', flag: '🇵🇱' },
	{ code: 'CZ', name: 'Czech Republic', timezone: 'Europe/Prague', flag: '🇨🇿' },
	{ code: 'HU', name: 'Hungary', timezone: 'Europe/Budapest', flag: '🇭🇺' },
	{ code: 'RO', name: 'Romania', timezone: 'Europe/Bucharest', flag: '🇷🇴' },
	{ code: 'BG', name: 'Bulgaria', timezone: 'Europe/Sofia', flag: '🇧🇬' },
	{ code: 'GR', name: 'Greece', timezone: 'Europe/Athens', flag: '🇬🇷' },
	{ code: 'PT', name: 'Portugal', timezone: 'Europe/Lisbon', flag: '🇵🇹' },
	{ code: 'IE', name: 'Ireland', timezone: 'Europe/Dublin', flag: '🇮🇪' },
]

const Header: React.FC<HeaderProps> = ({ masjidName, location, onLogout }) => {
	const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [currentTime, setCurrentTime] = useState(new Date())
	const [hijriDate, setHijriDate] = useState('')

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		// Calculate Hijri date (improved calculation)
		const calculateHijriDate = () => {
			const now = new Date()
			const gregorianYear = now.getFullYear()
			const gregorianMonth = now.getMonth() + 1
			const gregorianDay = now.getDate()
			
			// Convert to Julian Day Number
			const jd = Math.floor((gregorianYear + 4716) * 365.25) + 
					  Math.floor((gregorianMonth + 1) * 30.6) + 
					  gregorianDay - 1524.5
			
			// Convert Julian Day to Hijri date
			const hijriYear = Math.floor((jd - 1948086.5) / 365.25)
			const hijriMonth = Math.floor((jd - 1948086.5 - hijriYear * 365.25) / 30.6) + 1
			const hijriDay = Math.floor(jd - 1948086.5 - hijriYear * 365.25 - (hijriMonth - 1) * 30.6)
			
			const hijriMonths = [
				'Muḥarram', 'Ṣafar', 'Rabīʿ al-Awwal', 'Rabīʿ al-Thānī',
				'Jumādā al-Awwal', 'Jumādā al-Thānī', 'Rajab', 'Shaʿbān',
				'Ramaḍān', 'Shawwāl', 'Dhū al-Qaʿdah', 'Dhū al-Ḥijjah'
			]
			
			// Ensure valid month index
			const monthIndex = Math.max(0, Math.min(11, Math.floor(hijriMonth) - 1))
			const monthName = hijriMonths[monthIndex]
			
			// Format: 1447 – (Rabīʿ al-Awwal in Arabic) – 03
			return `${Math.floor(hijriYear + 1)} – (${monthName}) – ${Math.floor(hijriDay).toString().padStart(2, '0')}`
		}
		
		setHijriDate(calculateHijriDate())

		return () => clearInterval(timer)
	}, [])

	const formatTime = (date: Date, timezone: string) => {
		try {
			return date.toLocaleTimeString('en-US', {
				timeZone: timezone,
				hour12: true,
				hour: 'numeric',
				minute: '2-digit',
				second: '2-digit'
			})
		} catch (error) {
			// Fallback to local time if timezone is invalid
			return date.toLocaleTimeString('en-US', {
				hour12: true,
				hour: 'numeric',
				minute: '2-digit',
				second: '2-digit'
			})
		}
	}

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	return (
		<header className="w-full bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20 animate-fade-in">
			<div className="max-w-[1920px] mx-auto px-4 py-3 lg:px-8 lg:py-4">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-4">
					{/* Left Section - Logo and Masjid Info */}
					<div className="flex items-center gap-3 lg:gap-4">
						{/* 3D Masjid Logo */}
						<div className="relative group">
							<div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white text-2xl lg:text-3xl font-bold shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
						🕌
					</div>
							{/* 3D shadow effect */}
							<div className="absolute -bottom-1 -right-1 w-12 h-12 lg:w-16 lg:h-16 bg-black/20 rounded-xl -z-10"></div>
				</div>
						
						<div className="flex flex-col">
							<h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white tracking-wide leading-tight">
					{masjidName}
				</h1>
							<p className="text-white/80 text-sm lg:text-base">{location}</p>
						</div>
					</div>

					{/* Center Section - Dates */}
					<div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
						{/* Hijri Date */}
						<div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
							<div className="relative group">
								<div className="w-8 h-8 bg-gradient-to-br from-secondary to-tertiary rounded-lg flex items-center justify-center text-white text-lg shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-2">
									📅
								</div>
								{/* 3D shadow effect */}
								<div className="absolute -bottom-1 -right-1 w-8 h-8 bg-black/20 rounded-lg -z-10"></div>
							</div>
							<div className="text-center">
								<div className="text-white font-semibold text-sm lg:text-base">Hijri</div>
								<div className="text-white/90 text-xs lg:text-sm font-mono">{hijriDate}</div>
							</div>
						</div>

						{/* Gregorian Date */}
						<div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
							<div className="relative group">
								<div className="w-8 h-8 bg-gradient-to-br from-tertiary to-accent rounded-lg flex items-center justify-center text-white text-lg shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-2">
									📅
								</div>
								{/* 3D shadow effect */}
								<div className="absolute -bottom-1 -right-1 w-8 h-8 bg-black/20 rounded-lg -z-10"></div>
							</div>
							<div className="text-center">
								<div className="text-white font-semibold text-sm lg:text-base">Gregorian</div>
								<div className="text-white/90 text-xs lg:text-sm">{formatDate(currentTime)}</div>
							</div>
						</div>
					</div>

					{/* Right Section - World Clock and Logout */}
					<div className="flex items-center gap-4">
						{/* World Clock Dropdown */}
						<div className="relative">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm transition-all duration-200 border border-white/20 hover:border-white/30"
							>
								<span className="text-lg">🌍</span>
								<span className="text-white font-medium text-sm lg:text-base hidden sm:block">
									{selectedCountry.flag} {selectedCountry.code}
								</span>
								<span className="text-white/90 text-xs lg:text-sm hidden lg:block">
									{formatTime(currentTime, selectedCountry.timezone)}
								</span>
								<span className="text-white/60">▼</span>
							</button>

							{/* Dropdown Menu */}
							{isDropdownOpen && (
								<div className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 z-50 animate-slide-up">
									<div className="p-3">
										<div className="text-center mb-3">
											<h3 className="text-lg font-semibold text-gray-800">Select Country</h3>
										</div>
										<div className="max-h-96 overflow-y-auto custom-scrollbar">
											<div className="space-y-1">
												{countries.map((country) => (
													<button
														key={country.code}
														onClick={() => {
															setSelectedCountry(country)
															setIsDropdownOpen(false)
														}}
														className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
															selectedCountry.code === country.code
																? 'bg-primary/20 text-primary border border-primary/30'
																: 'hover:bg-gray-100/50 text-gray-700'
														}`}
													>
														<div className="flex items-center gap-3">
															<span className="text-xl">{country.flag}</span>
															<span className="font-medium text-left">{country.name}</span>
														</div>
														<span className="text-sm font-mono text-right min-w-[80px]">
															{formatTime(currentTime, country.timezone)}
														</span>
													</button>
												))}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Logout Button */}
						<button
							onClick={onLogout}
							className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg px-3 py-2 backdrop-blur-sm transition-all duration-200 border border-red-500/30 hover:border-red-500/50 text-red-100 hover:text-red-200"
						>
							<span className="text-lg">🚪</span>
							<span className="font-medium text-sm lg:text-base hidden sm:block">Logout</span>
						</button>
					</div>
				</div>
			</div>

			{/* Click outside to close dropdown */}
			{isDropdownOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setIsDropdownOpen(false)}
				/>
			)}
		</header>
	)
}

export default Header



