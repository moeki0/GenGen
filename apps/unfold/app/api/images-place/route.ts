import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

const model = genAI.getGenerativeModel({
  model: 'gemini-3.1-flash-lite-preview',
  systemInstruction: `You are an image editor for a history article.

Given a history article in Japanese markdown, insert 1–3 image placeholders at appropriate points.

Rules:
- Images must be of places, buildings, battles, artifacts, maps, landscapes — NOT people (people already have their own section).
- Write ![検索ワード]() on its own line, surrounded by blank lines, right after a paragraph where the image is relevant.
- 検索ワード should be a specific, searchable Japanese term (e.g. コロッセオ, トラファルガーの戦い, ヴェルサイユ宮殿).
- Do NOT add images inside code blocks or structured blocks (lines starting with \`\`\` or ##).
- Return the FULL article text with placeholders inserted. Do not change any other content.`,
  generationConfig: { maxOutputTokens: 8192 },
})

export async function POST(request: Request) {
  const { content } = await request.json()
  if (!content) return new Response('content required', { status: 400 })

  try {
    const result = await model.generateContent(content)
    const text = result.response.text()
    return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  } catch {
    // Best-effort: return original content unchanged
    return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
}
