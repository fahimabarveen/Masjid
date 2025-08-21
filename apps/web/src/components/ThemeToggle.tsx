import React from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'dark'
  })

  React.useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark((v) => !v)}
      className="rounded-md bg-secondary px-3 py-2 text-light hover:bg-primary transition-colors"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

