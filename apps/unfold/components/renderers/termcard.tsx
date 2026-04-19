'use client'

import { g } from '@moeki0/gengen'
import { useInlineText, useGengenContext } from '@moeki0/gengen/react'
import { termcardSchema } from './termcard.schema'

function TermcardRenderer({ term, definition }: { term: string; definition: string }) {
  const inlineText = useInlineText()
  const { onAction } = useGengenContext<{ onAction?: (a: { type: string; payload: string }) => void }>()

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      margin: '0.75rem 0',
      padding: '0.75rem 0.875rem',
      background: '#fff',
      border: '1px solid #ebebeb',
      borderLeft: '3px solid #cc3300',
      borderRadius: '6px',
      maxWidth: '100%',
      fontFamily: 'var(--font-sans)',
    }}>
      <h4
        onClick={() => onAction?.({ type: 'deepdive', payload: term })}
        style={{
          fontSize: '0.9375rem',
          fontWeight: 700,
          color: onAction ? '#cc3300' : '#111',
          margin: '0 0 0.375rem',
          lineHeight: 1.3,
          cursor: onAction ? 'pointer' : 'default',
          textDecoration: onAction ? 'underline dotted' : 'none',
        }}
      >
        {term}
      </h4>
      <span style={{
        fontSize: '0.875rem', lineHeight: 1.7, color: '#444',
      }}>
        {inlineText(definition)}
      </span>
    </div>
  )
}

export default g.block('termcard', {
  ...termcardSchema,
  component: TermcardRenderer,
})
