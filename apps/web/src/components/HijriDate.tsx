import React from 'react'

const ARABIC_MONTHS = [
  'مُحَرَّم',
  'صَفَر',
  'رَبِيع ٱلْأَوَّل',
  'رَبِيع ٱلثَّانِي',
  'جُمَادَىٰ ٱلْأُولَىٰ',
  'جُمَادَىٰ ٱلآخِرَة',
  'رَجَب',
  'شَعْبَان',
  'رَمَضَان',
  'شَوَّال',
  'ذُو ٱلْقَعْدَة',
  'ذُو ٱلْحِجَّة',
]

function getHijriParts(): { day: number; monthIndex: number; year: number } {
  try {
    // @ts-ignore custom calendar
    const fmt = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })
    const parts = fmt.formatToParts(new Date())
    const day = Number(parts.find((p) => p.type === 'day')?.value || '0')
    const monthIndex = Number(parts.find((p) => p.type === 'month')?.value || '1') - 1
    const year = Number(parts.find((p) => p.type === 'year')?.value || '1446')
    return { day, monthIndex, year }
  } catch {
    return { day: 0, monthIndex: 0, year: 1446 }
  }
}

export function HijriDate() {
  const { day, monthIndex, year } = getHijriParts()
  const monthName = ARABIC_MONTHS[Math.max(0, Math.min(11, monthIndex))]
  return (
    <div title="Hijri date" className="text-sm">
      {day} {monthName} {year}
    </div>
  )
}

