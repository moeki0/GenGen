import { g } from '@moeki0/gengen'

export const peopleSchema = g.block('people', {
  trigger: '複数の重要人物が登場し、それぞれの役割・立場を紹介する必要があるとき。各行「名前: 役割の一言説明」または「名前 — 役割」の形式。',
  schema: {
    people: g.list(1).some(g.matches(/[—–\-：:]/)),
  },
})
