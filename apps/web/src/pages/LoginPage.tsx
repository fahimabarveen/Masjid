import React from 'react'

export function LoginPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    // Placeholder auth flow
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    alert('Logged in (demo)')
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white/70 dark:bg-black/30 p-6 shadow">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        {error && <div className="mb-3 text-sm text-red-700">{error}</div>}
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 rounded bg-white/70 dark:bg-black/30 px-3 py-2"
        />
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 rounded bg-white/70 dark:bg-black/30 px-3 py-2"
        />
        <button type="submit" className="w-full rounded bg-secondary text-light px-3 py-2 hover:bg-primary">Sign in</button>
      </form>
    </div>
  )
}

