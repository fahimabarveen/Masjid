import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Menu, HeartHandshake, BookOpen, Star, Phone, Notebook, X, LogIn, UserPlus } from 'lucide-react'
import { MenuSection } from '../ui/WebAppLayout'

interface TopNavBarProps {
  rightSlot?: React.ReactNode
  activeSection: MenuSection
  onSectionChange: (section: MenuSection) => void
}

export function TopNavBar({ rightSlot, activeSection, onSectionChange }: TopNavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const items = [
    { id: 'home' as MenuSection, label: 'Home', icon: Home },
    { id: 'menu' as MenuSection, label: 'Menu', icon: Menu },
    { id: 'donation' as MenuSection, label: 'Donation', icon: HeartHandshake },
    { id: 'quran' as MenuSection, label: 'Quran', icon: BookOpen },
    { id: 'special' as MenuSection, label: 'Special', icon: Star },
    { id: 'contact' as MenuSection, label: 'Contact', icon: Phone },
    { id: 'blog' as MenuSection, label: 'Blog', icon: Notebook },
  ]

  const handleMenuClick = (section: MenuSection) => {
    onSectionChange(section)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <div className="font-calligraphy text-2xl text-secondary">﷽ Masjid</div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-secondary text-white shadow-lg' 
                    : 'text-primary hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => onSectionChange('login' as MenuSection)} className="hidden md:flex items-center gap-1 text-sm px-2 py-1 rounded hover:bg-white/60 dark:hover:bg-white/10">
            <LogIn size={16} /> Login
          </button>
          <button onClick={() => onSectionChange('signup' as MenuSection)} className="hidden md:flex items-center gap-1 text-sm px-2 py-1 rounded hover:bg-white/60 dark:hover:bg-white/10">
            <UserPlus size={16} /> Sign Up
          </button>
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-md text-primary hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          {rightSlot}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1]
            }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur border-b border-white/20 dark:border-white/10 z-50 overflow-hidden"
          >
            <nav className="p-4 space-y-2">
              {items.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.3
                  }}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'bg-secondary text-white shadow-lg' 
                      : 'text-primary hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
              <div className="pt-2 border-t border-white/20 dark:border-white/10 grid grid-cols-2 gap-2">
                <button onClick={() => handleMenuClick('login' as MenuSection)} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/60 dark:hover:bg-white/10"><LogIn size={18}/> Login</button>
                <button onClick={() => handleMenuClick('signup' as MenuSection)} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/60 dark:hover:bg-white/10"><UserPlus size={18}/> Sign Up</button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

