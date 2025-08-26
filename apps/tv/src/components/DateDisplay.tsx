import React from 'react'

const DateDisplay: React.FC = () => {
	const [label, setLabel] = React.useState<string>('')
	React.useEffect(() => {
		let mounted = true
		;(async () => {
			try {
				const moment = (await import('moment'))
				await import('moment-hijri')
				const now = moment.default()
				const hijri = now.format("iMMMM iD, iYYYY")
				const greg = now.format("(ddd, DD MMMM YYYY)")
				if (mounted) setLabel(`${hijri} ${greg}`)
			} catch {
				const now = new Date()
				if (mounted) setLabel(now.toDateString())
			}
		})()
		return () => { mounted = false }
	}, [])
	return (
		<div className="w-full text-center text-xl md:text-2xl text-white/90">
			{label}
		</div>
	)
}

export default DateDisplay



