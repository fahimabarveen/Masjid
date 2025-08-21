import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Menu, HeartHandshake, BookOpen, Star, Phone, Notebook } from 'lucide-react'

export function TopNavBar({ rightSlot }: { rightSlot?: React.ReactNode }) {
  const items = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/menu', label: 'Menu', icon: Menu },
    { to: '/donation', label: 'Donation', icon: HeartHandshake },
    { to: '/quran', label: 'Quran', icon: BookOpen },
    { to: '/special', label: 'Special', icon: Star },
    { to: '/contact', label: 'Contact', icon: Phone },
    { to: '/blog', label: 'Blog', icon: Notebook },
  ]
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <div className="font-calligraphy text-2xl text-secondary">﷽ Masjid</div>
        <nav className="hidden md:flex items-center gap-1">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-md text-sm transition ${
                  isActive ? 'bg-secondary text-white' : 'hover:bg-white/60 dark:hover:bg-white/10'
                }`
              }
            >
              <i.icon size={16} />
              <span>{i.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">{rightSlot}</div>
    </div>
  )
}

