import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { WebAppLayout } from './ui/WebAppLayout'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { DonationPage } from './pages/DonationPage'
import { QuranIndexPage } from './pages/QuranIndexPage'
import { SurahPage } from './pages/SurahPage'
import { SpecialPages } from './pages/SpecialPages'
import { ContactPage } from './pages/ContactPage'
import { BlogPage } from './pages/BlogPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <WebAppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'donation', element: <DonationPage /> },
      { path: 'quran', element: <QuranIndexPage /> },
      { path: 'quran/surah/:id', element: <SurahPage /> },
      { path: 'special', element: <SpecialPages /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'blog', element: <BlogPage /> },
    ],
  },
])

const root = createRoot(document.getElementById('root')!)
root.render(<RouterProvider router={router} />)


