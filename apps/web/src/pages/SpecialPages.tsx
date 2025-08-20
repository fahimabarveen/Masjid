import React from 'react'

export function SpecialPages() {
  return (
    <div className="space-y-6">
      <section className="rounded bg-white/60 dark:bg-black/20 p-4">
        <h2 className="text-xl font-semibold mb-2">Death Salath Guide</h2>
        <ol className="list-decimal pl-5 text-sm space-y-1">
          <li>Intention (Niyyah)</li>
          <li>Takbeer without Ruku or Sujood</li>
          <li>Four Takbeers with specific duas (placeholder)</li>
          <li>Salam to end</li>
        </ol>
      </section>
      <section className="rounded bg-white/60 dark:bg-black/20 p-4">
        <h2 className="text-xl font-semibold mb-2">Tasbeeh & Nafil</h2>
        <p className="text-sm">Explanation and a digital counter:</p>
        <TasbeehCounter />
      </section>
    </div>
  )
}

function TasbeehCounter() {
  const [count, setCount] = React.useState<number>(0)
  return (
    <div className="flex items-center gap-3">
      <div className="text-3xl font-bold">{count}</div>
      <button onClick={() => setCount((c) => c + 1)} className="rounded bg-secondary text-light px-3 py-2 hover:bg-primary">+1</button>
      <button onClick={() => setCount(0)} className="rounded bg-secondary text-light px-3 py-2 hover:bg-primary">Reset</button>
    </div>
  )
}


