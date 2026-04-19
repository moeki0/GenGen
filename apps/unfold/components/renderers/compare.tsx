'use client'

import { g } from '@moeki0/gengen'
import { useInlineText } from '@moeki0/gengen/react'
import { compareSchema } from './compare.schema'

function CompareRenderer({ heading, table }: { heading: string; table: { headers: string[]; rows: string[][] } }) {
  const inlineText = useInlineText()
  const title = heading.trim()
  const cols = table.headers.length
  // First header is the row-label column
  const gridStyle = { gridTemplateColumns: `100px repeat(${Math.max(cols - 1, 1)}, 1fr)` }

  return (
    <div style={{
      margin: '1rem 0',
      border: '1px solid #ebebeb',
      borderRadius: '10px',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
    }}>
      {title && (
        <div style={{
          fontSize: '0.65rem', fontWeight: 700, color: '#aaa',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '0.5rem 0.75rem',
          background: '#fff',
          borderBottom: '1px solid #ebebeb',
        }}>
          {title.trim()}
        </div>
      )}
      {/* Header row */}
      <div style={{
        display: 'grid',
        ...gridStyle,
        fontSize: '0.6875rem', fontWeight: 700, color: '#777',
        letterSpacing: '0.04em',
        background: '#fafafa',
        borderBottom: '1px solid #ebebeb',
      }}>
        {table.headers.map((h, i) => (
          <div key={i} style={{
            padding: '0.625rem 0.75rem',
            borderRight: i < table.headers.length - 1 ? '1px solid #ebebeb' : undefined,
          }}>
            {i === 0 ? '' : inlineText(h)}
          </div>
        ))}
      </div>
      {/* Data rows */}
      {table.rows.map((row, ri) => (
        <div key={ri} style={{
          display: 'grid',
          ...gridStyle,
          borderBottom: ri < table.rows.length - 1 ? '1px solid #f3f3f3' : undefined,
          fontSize: '0.8125rem',
        }}>
          {row.map((cell, ci) => (
            <div key={ci} style={{
              padding: '0.625rem 0.75rem',
              borderRight: ci < row.length - 1 ? '1px solid #f3f3f3' : undefined,
              color: ci === 0 ? '#888' : '#333',
              fontWeight: ci === 0 ? 600 : 400,
              fontSize: ci === 0 ? '0.7rem' : '0.8125rem',
              background: ci === 0 ? '#fcfcfc' : undefined,
            }}>
              {inlineText(cell)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default g.block('compare', {
  ...compareSchema,
  component: CompareRenderer,
})
