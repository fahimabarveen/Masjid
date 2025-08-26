import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">Masjid Mobile App</h1>
          <p className="text-emerald-600">Access Masjid services on your mobile device</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">Prayer Times</h3>
            <p className="text-emerald-600 text-sm">Get accurate prayer times for your location</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">Qibla Direction</h3>
            <p className="text-emerald-600 text-sm">Find the direction to the Kaaba</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">Islamic Calendar</h3>
            <p className="text-emerald-600 text-sm">Hijri calendar and important dates</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-emerald-600">
            This is the web version of the mobile app
          </p>
        </div>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
