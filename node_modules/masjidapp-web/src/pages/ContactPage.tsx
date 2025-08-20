import React from 'react'

export function ContactPage() {
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
    </div>
  )
}


