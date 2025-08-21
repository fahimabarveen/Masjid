import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TopNavBar } from '../components/TopNavBar'
import { ThemeToggle } from '../components/ThemeToggle'

export function WebAppLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex relative">
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-black/30 backdrop-blur border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <TopNavBar rightSlot={<ThemeToggle />} />
        </div>
      </header>
      {/* Sidebar removed as requested */}
      <main className="flex-1 p-6 md:ml-0">
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


