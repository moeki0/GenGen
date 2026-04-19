'use client'

import { g } from '@moeki0/gengen'
import { useInlineText } from '@moeki0/gengen/react'
import { sourceSchema } from './source.schema'

function SourceRenderer({ heading, text, note }: { heading: string; text: string; note?: string }) {
  const inlineText = useInlineText()
  const titlePart = heading.replace(/^[^:]*:\s*/, '').trim()
  // Extract date from parentheses
  const dateMatch = titlePart.match(/\(([^)]+)\)\s*$/)
  const date = dateMatch ? dateMatch[1] : ''
  const title = dateMatch ? titlePart.slice(0, dateMatch.index).trim() : titlePart

  return (
    <div style={{
      margin: '1rem 0',
      padding: '1rem 1.125rem 0.875rem',
      background: '#fbf9f3',
      border: '1px solid #e8e0cc',
      borderRadius: '8px',
      fontFamily: "'Times New Roman', Georgia, serif",
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        inset: '4px',
        border: '1px solid rgba(180,150,90,0.2)',
        borderRadius: '5px',
        pointerEvents: 'none',
      }} />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.625rem',
        fontWeight: 700,
        color: '#8a7a4a',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '0.5rem',
      }}>
        <span>{title}</span>
        {date && <span>{date}</span>}
      </div>
      <p style={{
        fontSize: '0.9375rem',
        lineHeight: 1.85,
        color: '#3d3122',
        margin: '0 0 0.625rem',
      }}>
        &ldquo;{inlineText(text.replace(/^[">]\s*/, ''))}&rdquo;
      </p>
      {note && (
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          color: '#9a8a5a',
          fontStyle: 'italic',
          margin: 0,
          lineHeight: 1.6,
        }}>
          — {inlineText(note)}
        </p>
      )}
    </div>
  )
}

export default g.block('source', {
  ...sourceSchema,
  component: SourceRenderer,
})
