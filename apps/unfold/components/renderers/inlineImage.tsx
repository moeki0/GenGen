'use client'

import { g } from '@moeki0/gengen'
import { imageInline } from './index'

function ImageSearchPlaceholder({ text }: { text: string }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      background: '#f5f5f5',
      border: '1px solid #e8e8e8',
      borderRadius: '4px',
      padding: '1px 6px',
      fontSize: '0.8125rem',
      color: '#999',
      fontStyle: 'italic',
      verticalAlign: 'middle',
    }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      {text}
    </span>
  )
}

export const inlineImageRenderer = g.inline('image', {
  ...imageInline,
  component: ImageSearchPlaceholder,
})
