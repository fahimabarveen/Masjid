import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function ThemeToggle() {
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
      className="mt-2 rounded-md bg-secondary px-3 py-2 text-light hover:bg-primary transition-colors"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export function WebAppLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-primary/80 text-light p-4 backdrop-blur-md">
        <div className="font-calligraphy text-3xl mb-6">﷽ Masjid</div>
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={({ isActive }) => `rounded px-3 py-2 hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>Home</NavLink>
          <NavLink to="/menu" className={({ isActive }) => `rounded px-3 py-2 hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>Menu</NavLink>
          <NavLink to="/donation" className={({ isActive }) => `rounded px-3 py-2 hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>Donation</NavLink>
          <NavLink to="/quran" className={({ isActive }) => `rounded px-3 py-2 hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>Quran</NavLink>
          <NavLink to="/special" className={({ isActive }) => `rounded px-3 py-2 hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>Special</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `rounded px-3 py-2 hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>Contact</NavLink>
          <NavLink to="/blog" className={({ isActive }) => `rounded px-3 py-2 hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>Blog</NavLink>
        </nav>
        <ThemeToggle />
      </aside>
      <main className="flex-1 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}


