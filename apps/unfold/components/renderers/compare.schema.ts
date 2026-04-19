import { g } from '@moeki0/gengen'

export const compareSchema = g.block('compare', {
  trigger: '制度・身分・勢力・政策・時代などを対比できる場面。「前後」「対立する二者」「複数の選択肢」を並べて比べるとき。自由なタイトルの ## 見出しの直後にMarkdownテーブルを書く。最初の列ヘッダーは「比較項目」「項目」「観点」など。',
  schema: {
    heading: g.heading([2, 3]),
    table: g.table().match(t => t.headers.length >= 2),
  },
})
