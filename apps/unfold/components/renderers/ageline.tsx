'use client'

import { useState, useEffect } from 'react'
import { g } from '@moeki0/gengen'
import { agelineSchema } from './ageline.schema'

type Person = { name: string; age: number; role: string }

function parseLine(line: string): Person | null {
  const m = line.match(/^(.+?)[：:]\s*(\d+)(?:歳)?(?:\s*[（(]([^）)]+)[）)])?/)
  if (!m) return null
  const age = parseInt(m[2], 10)
  if (age <= 0 || age > 120) return null
  return { name: m[1].trim(), age, role: m[3]?.trim() ?? '' }
}

function parseData(raw: string): { title: string; people: Person[] } {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean)
  const people: Person[] = []
  let title = ''
  for (const line of lines) {
    const p = parseLine(line)
    if (p) people.push(p)
    else if (!title) title = line
  }
  return { title, people: people.sort((a, b) => a.age - b.age) }
}

function AgelineRenderer({ data }: { data: string }) {
  const { title, people } = parseData(data)
  const [images, setImages] = useState<Record<string, string>>({})

  useEffect(() => {
    if (people.length === 0) return
    fetch('/api/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ names: people.map(p => p.name) }),
    })
      .then(r => r.json())
      .then(data => setImages(data))
      .catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (people.length === 0) return null

  return (
    <div style={{ margin: '1rem 0', fontFamily: 'var(--font-sans)' }}>
      {title && (
        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>
          {title}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {people.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Age */}
            <span style={{
              fontSize: '0.9375rem', fontWeight: 800, color: '#cc3300',
              fontVariantNumeric: 'tabular-nums', minWidth: '2rem', textAlign: 'right', flexShrink: 0,
            }}>
              {p.age}
            </span>

            {/* Dot + line */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#cc3300', border: '2px solid #fff', boxShadow: '0 0 0 1.5px #cc3300' }} />
              {i < people.length - 1 && (
                <div style={{ position: 'absolute', left: '50%', top: '100%', width: '1.5px', height: 'calc(0.75rem + 10px)', background: '#e0e0e0', transform: 'translateX(-50%)' }} />
              )}
            </div>

            {/* Photo */}
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#f0f0f0', border: '1px solid #eee' }}>
              {images[p.name] ? (
                <img src={images[p.name]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e0e0e0, #f5f5f5)' }} />
              )}
            </div>

            {/* Name + role */}
            <div>
              <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111', lineHeight: 1.3 }}>{p.name}</p>
              {p.role && <p style={{ margin: 0, fontSize: '0.75rem', color: '#999', lineHeight: 1.3 }}>{p.role}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default g.block('ageline', {
  ...agelineSchema,
  component: AgelineRenderer,
})
