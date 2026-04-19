'use client'

import { g } from '@moeki0/gengen'
import { useInlineText } from '@moeki0/gengen/react'
import { bignumSchema } from './bignum.schema'

type Item = { label: string; value: string }

function splitNumeric(value: string): { pre: string; num: string; post: string } {
  const m = value.match(/^(.*?)([\d,，.．]+(?:\s*[〜~–\-]\s*[\d,，.．]+)?)(.*)$/)
  if (!m) return { pre: '', num: value, post: '' }
  return { pre: m[1].trim(), num: m[2].trim(), post: m[3].trim() }
}

function BignumRenderer({ items }: { heading: string; items: Item[] }) {
  const inlineText = useInlineText()
  return (
    <div style={{
      margin: '1.5rem 0',
      borderTop: '1px solid #eee',
      borderBottom: '1px solid #eee',
      padding: '1.25rem 0',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
    }}>
      {items.map((item, i) => {
        const { pre, num, post } = splitNumeric(item.value)
        const isFirst = i === 0
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <p style={{
              fontSize: '0.75rem',
              color: '#888',
              margin: 0,
              lineHeight: 1.4,
              flexShrink: 1,
              minWidth: 0,
            }}>
              {inlineText(item.label)}
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.15em', flexShrink: 0 }}>
              {pre && (
                <span style={{ fontSize: '1rem', color: '#888', fontWeight: 400 }}>{pre}</span>
              )}
              <span style={{
                fontSize: isFirst ? 'clamp(2.5rem, 7vw, 4rem)' : 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: '#cc3300',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {num}
              </span>
              {post && (
                <span style={{
                  fontSize: isFirst ? '1.125rem' : '0.875rem',
                  color: '#555',
                  fontWeight: 600,
                }}>
                  {post}
                </span>
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default g.block('bignum', {
  ...bignumSchema,
  component: BignumRenderer,
})
