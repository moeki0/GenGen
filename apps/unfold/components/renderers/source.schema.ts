import { g } from '@moeki0/gengen'

export const sourceSchema = g.block('source', {
  trigger: '史料・法令・書簡・宣言文・条約など一次資料を引用できるとき。',
  schema: {
    heading: g.heading([2, 3]).content(/^source[：:].+/i).split(':', 'title'),
    text: g.blockquote(),
    note: g.text().optional(),
  },
})
