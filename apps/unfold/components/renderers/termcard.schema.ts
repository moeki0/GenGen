import { g } from '@moeki0/gengen'

export const termcardSchema = g.block('termcard', {
  trigger: '本文中に登場した専門用語・歴史概念の意味を補足したいとき。#### 用語名 と書き、直後の段落に定義を書く。',
  schema: {
    term: g.heading(4),
    definition: g.text(),
  },
})
