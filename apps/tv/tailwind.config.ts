import type { Config } from 'tailwindcss'

export default {
	darkMode: 'class',
	content: [
		'./index.html',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#3B1E54',
				secondary: '#9B7EBD',
				tertiary: '#D4BEE4',
				accent: '#B2B0E8',
				// Keep existing colors for backward compatibility
				'primary-old': '#9B7EBD',
				'secondary-old': '#D4BEE4',
				'tertiary-old': '#B2B0E8',
				'accent-old': '#B2B0E8',
			},
			backgroundImage: {
				'brand-gradient': 'linear-gradient(135deg, #3B1E54 0%, #9B7EBD 35%, #D4BEE4 70%, #B2B0E8 100%)',
				'brand-gradient-old': 'linear-gradient(135deg, #9B7EBD 0%, #D4BEE4 35%, #B2B0E8 70%, #B2B0E8 100%)',
			},
			fontFamily: {
				calligraphy: ['"Scheherazade New"', 'serif'],
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
				'scale-in': 'scaleIn 0.2s ease-out',
				'bounce-gentle': 'bounceGentle 2s infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				bounceGentle: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
			},
			screens: {
				'tv': '1920px',
				'mobile': '768px',
			},
		},
	},
	plugins: [],
} satisfies Config



