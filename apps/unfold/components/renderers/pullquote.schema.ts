import { g } from '@moeki0/gengen'

export const pullquoteSchema = g.block('pullquote', {
  trigger: '歴史的人物の印象的な発言・宣言・スローガンがある、またはフレーズを強調したいとき。',
  schema: {
    heading: g.heading([2, 3]).content(/^(pullquote|プルクォート|名言|pull quote)$/i),
    quote: g.blockquote(),
    attribution: g.text().optional(),
  },
})
