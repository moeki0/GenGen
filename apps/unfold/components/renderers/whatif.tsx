'use client'

import { useState } from 'react'
import { g } from '@moeki0/gengen'
import { useInlineText } from '@moeki0/gengen/react'
import { whatifSchema } from './whatif.schema'

type Path = { prob: string; headline: string; text: string }

function parsePathItem(raw: string): Path {
  // Format: "40%: 立憲君主制の継続 → 詳細説明"
  // or: "40%: Headline → Details"
  const m = raw.match(/^(\d+%?)\s*[：:]\s*(.+?)\s*[→>]\s*(.+)$/)
  if (m) {
    return { prob: m[1], headline: m[2].trim(), text: m[3].trim() }
  }
  // Fallback: "40%: 説明"
  const m2 = raw.match(/^(\d+%?)\s*[：:]\s*(.+)$/)
  if (m2) {
    return { prob: m2[1], headline: m2[2].trim(), text: '' }
  }
  return { prob: '', headline: raw.trim(), text: '' }
}

function WhatifRenderer({ heading, paths: pathStrings }: { heading: string; paths: string[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const inlineText = useInlineText()
  const paths = pathStrings.map(parsePathItem)

  return (
    <div style={{
      margin: '1.25rem 0',
      padding: '1rem',
      background: 'linear-gradient(135deg, #f7f4fa, #fafafa)',
      border: '1px solid #e8e4ec',
      borderRadius: '10px',
      fontFamily: 'var(--font-sans)',
    }}>
      <p style={{
        fontSize: '0.625rem', fontWeight: 700, color: '#6b4e8a',
        letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.25rem',
      }}>
        反事実 / WHAT IF
      </p>
      <p style={{
        fontSize: '1rem', color: '#111', fontWeight: 600,
        lineHeight: 1.5, margin: '0 0 0.875rem',
      }}>
        {inlineText(heading)}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {paths.map((p, i) => (
          <div
            key={i}
            onClick={() => setOpen(o => o === i ? null : i)}
            style={{
              padding: '0.75rem',
              background: '#fff',
              border: `1px solid ${open === i ? '#a98bc4' : '#eee'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: open === i ? '0 2px 8px rgba(107,78,138,0.08)' : undefined,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              if (open !== i) (e.currentTarget as HTMLElement).style.borderColor = '#a98bc4'
            }}
            onMouseLeave={e => {
              if (open !== i) (e.currentTarget as HTMLElement).style.borderColor = '#eee'
            }}
          >
            {p.prob && (
              <span style={{
                display: 'inline-block',
                fontSize: '0.625rem', fontWeight: 800,
                color: '#6b4e8a', background: 'rgba(107,78,138,0.1)',
                padding: '2px 6px', borderRadius: '3px',
                letterSpacing: '0.05em', marginRight: '0.5rem',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {p.prob}
              </span>
            )}
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111' }}>
              {inlineText(p.headline)}
            </span>
            {open === i && p.text && (
              <p style={{
                fontSize: '0.8125rem', color: '#555', lineHeight: 1.65,
                margin: '0.5rem 0 0',
                animation: 'fadeIn 0.2s ease',
              }}>
                {inlineText(p.text)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default g.block('whatif', {
  ...whatifSchema,
  component: WhatifRenderer,
})
