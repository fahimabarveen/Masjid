import React from 'react'

type Language = 'en' | 'ar' | 'ta'

export function LanguageSwitcher() {
  const [lang, setLang] = React.useState<Language>(() => {
    const v = localStorage.getItem('lang') as Language | null
    return v || 'en'
  })

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    localStorage.setItem('lang', lang)
  }, [lang])

  return (
    <select
      aria-label="Language"
      className="rounded bg-white/70 dark:bg-black/30 px-2 py-1"
      value={lang}
      onChange={(e) => setLang(e.target.value as Language)}
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
      <option value="ta">தமிழ்</option>
    </select>
  )
}

