import { g } from '@moeki0/gengen'

export const whatifSchema = g.block('whatif', {
  trigger: '歴史には必ず偶然性と分岐点がある。「もし〜だったら？」と問える場面では積極的に使うこと。## もし〜たら？ という見出しを書き、直後のリストに分岐シナリオを列挙する。',
  schema: {
    heading: g.heading([2, 3]).content(/もし/),
    paths: g.list(2),
  },
})
