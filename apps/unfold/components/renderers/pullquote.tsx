'use client'

import { g } from '@moeki0/gengen'
import { useInlineText } from '@moeki0/gengen/react'
import { pullquoteSchema } from './pullquote.schema'

function PullquoteRenderer({ quote, attribution }: { heading: string; quote: string; attribution?: string }) {
  const inlineText = useInlineText()
  return (
    <div style={{
      margin: '2rem -0.5rem',
      padding: '1.25rem 0.5rem',
      borderTop: '1px solid #e8e8e8',
      borderBottom: '1px solid #e8e8e8',
      textAlign: 'center',
    }}>
      <q style={{
        display: 'block',
        fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
        fontWeight: 500,
        lineHeight: 1.4,
        color: '#111',
        letterSpacing: '-0.015em',
        margin: '0 0 0.5rem',
        quotes: '\u201C \u201D',
      }}>
        {inlineText(quote.replace(/^[">]\s*/, ''))}
      </q>
      {attribution && (
        <cite style={{
          fontStyle: 'normal',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#999',
        }}>
          — {attribution.replace(/^—\s*/, '')}
        </cite>
      )}
    </div>
  )
}

export default g.block('pullquote', {
  ...pullquoteSchema,
  component: PullquoteRenderer,
})
