import { g } from '@moeki0/gengen'

export const insightSchema = g.block('insight', {
  trigger: 'この出来事が現代とつながる洞察、または歴史的意義を一言で言い表せるとき。',
  schema: {
    note: g.blockquote(),
  },
})
