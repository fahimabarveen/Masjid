import React from 'react'

export function ContactPage() {
  const [message, setMessage] = React.useState('')
  const [sent, setSent] = React.useState(false)
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo: store locally; could be wired to backend later
    const list = JSON.parse(localStorage.getItem('feedback:list') || '[]')
    list.push({ at: new Date().toISOString(), message })
    localStorage.setItem('feedback:list', JSON.stringify(list))
    setSent(true)
    setMessage('')
  }
  return (
    <div className="space-y-6">
      <section className="rounded bg-white/60 dark:bg-black/20 p-4">
        <h2 className="text-xl font-semibold mb-2">Emergency Contact</h2>
        <div className="flex gap-2">
          <a className="rounded bg-secondary text-light px-3 py-2 hover:bg-primary" href="tel:+1000000000">Call</a>
          <a className="rounded bg-secondary text-light px-3 py-2 hover:bg-primary" href="https://wa.me/1000000000">WhatsApp</a>
        </div>
      </section>
      <section className="rounded bg-white/60 dark:bg-black/20 p-4">
        <h2 className="text-xl font-semibold mb-2">Help (Chatbot Placeholder)</h2>
        <div className="text-sm opacity-80">Ask a question about prayer times, events, or donations.</div>
        <input className="mt-2 rounded bg-white/70 dark:bg-black/30 w-full px-3 py-2" placeholder="Type your question..." />
      </section>
      <section className="rounded bg-white/60 dark:bg-black/20 p-4">
        <h2 className="text-xl font-semibold mb-2">Feedback</h2>
        {sent && <div className="mb-2 text-green-700 text-sm">Thanks for your feedback!</div>}
        <form onSubmit={submit} className="space-y-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full rounded bg-white/70 dark:bg-black/30 px-3 py-2 min-h-24"
            placeholder="Share your feedback or suggestion..."
          />
          <button type="submit" className="rounded bg-secondary text-light px-3 py-2 hover:bg-primary">Submit</button>
        </form>
      </section>
    </div>
  )
}


