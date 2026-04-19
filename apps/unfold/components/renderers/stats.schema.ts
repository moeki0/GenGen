import { g } from '@moeki0/gengen'

export const statsSchema = g.block('stats', {
  trigger: '複数の数字・統計を並べてセクションの規模感を伝えるとき。個々の数字よりセット全体が意味を持つとき。',
  schema: {
    items: g.list(1).all(g.split(/[：:]\s*/, g.str('label'), g.str('value'))),
  },
})
