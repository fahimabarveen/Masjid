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
				primary: '#222831',
				secondary: '#393E46',
				tertiary: '#948979',
				accent: '#DFD0B8',
			},
			backgroundImage: {
				'brand-gradient': 'linear-gradient(135deg, #222831 0%, #393E46 35%, #948979 70%, #DFD0B8 100%)',
			},
			fontFamily: {
				calligraphy: ['"Scheherazade New"', 'serif'],
			},
			animation: {
				'fade-in': 'fadeIn 0.6s ease-in-out',
				'slide-up': 'slideUp 0.4s ease-out',
				'scale-in': 'scaleIn 0.25s ease-out',
				'float': 'float 3s ease-in-out infinite',
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
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' },
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



