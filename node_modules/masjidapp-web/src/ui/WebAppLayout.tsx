import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopNavBar } from '../components/TopNavBar'
import { ThemeToggle } from '../components/ThemeToggle'
import { HomePage } from '../pages/HomePage'
import { MenuPage } from '../pages/MenuPage'
import { DonationPage } from '../pages/DonationPage'
import { QuranIndexPage } from '../pages/QuranIndexPage'
import { SpecialPages } from '../pages/SpecialPages'
import { ContactPage } from '../pages/ContactPage'
import { BlogPage } from '../pages/BlogPage'
import { LoginPage } from '../pages/LoginPage'
import { SignUpPage } from '../pages/SignUpPage'

export type MenuSection = 'home' | 'menu' | 'donation' | 'quran' | 'special' | 'contact' | 'blog' | 'login' | 'signup'

export function WebAppLayout() {
  const [activeSection, setActiveSection] = useState<MenuSection>('home')

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeSection])

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />
      case 'menu':
        return <MenuPage />
      case 'donation':
        return <DonationPage />
      case 'quran':
        return <QuranIndexPage />
      case 'special':
        return <SpecialPages />
      case 'contact':
        return <ContactPage />
      case 'blog':
        return <BlogPage />
      case 'login':
        return <LoginPage />
      case 'signup':
        return <SignUpPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-black/30 backdrop-blur border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <TopNavBar 
            rightSlot={<ThemeToggle />} 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
      </header>
      
      <main className="flex-1 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ 
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
              scale: {
                duration: 0.3
              }
            }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}


