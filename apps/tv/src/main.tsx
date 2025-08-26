import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import LoginScreen from './components/LoginScreen'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

interface User {
	masjidName: string
	location: string
}

const App: React.FC = () => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isLoggingIn, setIsLoggingIn] = useState(false)

	// Check for existing session on component mount
	useEffect(() => {
		const checkExistingSession = () => {
			try {
				const savedUser = localStorage.getItem('masjid_user')
				if (savedUser) {
					const parsedUser = JSON.parse(savedUser)
					setUser(parsedUser)
				}
			} catch (error) {
				console.error('Error loading saved session:', error)
				// Clear invalid session data
				localStorage.removeItem('masjid_user')
			} finally {
				setIsLoading(false)
			}
		}

		checkExistingSession()
	}, [])

	const handleLogin = async (masjidName: string, location: string) => {
		setIsLoggingIn(true)
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000))
		
		const newUser = { masjidName, location }
		setUser(newUser)
		
		// Save user session to localStorage
		try {
			localStorage.setItem('masjid_user', JSON.stringify(newUser))
		} catch (error) {
			console.error('Error saving session:', error)
		}
		
		setIsLoggingIn(false)
	}

	const handleLogout = () => {
		setUser(null)
		// Clear user session from localStorage
		try {
			localStorage.removeItem('masjid_user')
		} catch (error) {
			console.error('Error clearing session:', error)
		}
	}

	// Show loading screen while checking for existing session
	if (isLoading) {
	return (
			<div className="min-h-screen w-full bg-brand-gradient flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 mx-auto mb-4 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
					<div className="text-white text-xl font-semibold">Loading...</div>
				</div>
		</div>
	)
}

	// Show login screen if no user is logged in
	if (!user) {
		return <LoginScreen onLogin={handleLogin} />
	}

	// Show main dashboard if user is logged in
	return (
		<div className="min-h-screen bg-brand-gradient">
			<Header
				masjidName={user.masjidName}
				location={user.location}
				onLogout={handleLogout}
			/>
			<Dashboard />
		</div>
	)
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)


