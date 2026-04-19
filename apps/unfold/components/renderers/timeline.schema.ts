import { g } from '@moeki0/gengen'

export const timelineSchema = g.block('timeline', {
  trigger: '出来事の流れ・経緯を時系列で示すとき。特に短期間に複数の事件が連続して起きた場面。',
  schema: {
    events: g.list().all(g.split(/[：:]\s*/, g.yearStr('year'), g.str('event'))),
  },
})
