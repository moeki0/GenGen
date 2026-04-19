import { g } from '@moeki0/gengen'

export const calloutSchema = g.block('callout', {
  trigger: '当時の人物の発言・史料の一節・重要な法令の文言など、一次資料に近い引用を強調するとき。',
  schema: {
    note: g.blockquote(),
  },
})
