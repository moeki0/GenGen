import { g } from '@moeki0/gengen'

export const quizSchema = g.block('quiz', {
  trigger: 'セクションの終わりで読者の理解を確認したいとき。答えが意外な事実につながるとき。1ターンに1つまで。',
  schema: {
    label: g.heading([2, 3]).content(/^(クイズ|quiz)$/i),
    question: g.text(),
    choices: g.list(3).some(g.endsWith('★').is('answer')),
  },
})
