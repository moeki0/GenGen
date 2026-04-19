import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

const SLICES_BC = [123000, 10000, 8000, 5000, 4000, 3000, 2000, 1500, 1000, 700, 500, 400, 323, 300, 200, 100, 1]
const SLICES_AD = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1279, 1300, 1400, 1492, 1500, 1530, 1600, 1650, 1700, 1715, 1783, 1800, 1815, 1880, 1900, 1914, 1920, 1930, 1938, 1945, 1960, 1994, 2000, 2010]
const BASE_URL = 'https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson'

function yearToSlice(yearStr: string): string {
  const num = parseInt(yearStr.replace(/[^0-9\-]/g, ''), 10)
  if (isNaN(num)) return '2000'
  if (num <= 0) {
    const bc = Math.abs(num) || 1
    const nearest = SLICES_BC.reduce((p, c) => Math.abs(c - bc) < Math.abs(p - bc) ? c : p)
    return `bc${nearest}`
  }
  const nearest = SLICES_AD.reduce((p, c) => Math.abs(c - num) < Math.abs(p - num) ? c : p)
  return String(nearest)
}

// In-memory cache: "slice|loc1,loc2" → { name: englishName }
const cache = new Map<string, Record<string, string>>()

async function fetchTerritoryNames(slice: string): Promise<string[]> {
  const url = `${BASE_URL}/world_${slice}.geojson`
  const res = await fetch(url, { next: { revalidate: 86400 } }) // cache 1 day
  if (!res.ok) return []
  const data = await res.json()
  return [...new Set<string>(
    (data.features as { properties: { NAME?: string } }[])
      .map(f => f.properties?.NAME)
      .filter((n): n is string => typeof n === 'string' && n.length > 0)
  )].sort()
}

async function matchWithGemini(
  locations: string[],
  territories: string[],
): Promise<Record<string, string>> {
  const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' })

  const prompt = `You are a historical geography expert. Match each Japanese/general location name to the correct historical territory name from the provided list.

Historical territory names available:
${territories.join('\n')}

Japanese/general location names to match:
${locations.map((l, i) => `${i + 1}. ${l}`).join('\n')}

Rules:
- Match as many as possible. A location may map to the same territory as another.
- If no match, return null for that location.
- Reply ONLY as JSON: {"location": "territory_name_or_null"}`

  const result = await model.generateContent(prompt)
  const text = result.response.text().trim()
  const json = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '')
  return JSON.parse(json)
}

export async function POST(request: Request) {
  const { year, locations } = await request.json() as { year: string; locations: string[] }

  if (!year || !Array.isArray(locations) || locations.length === 0) {
    return new Response('year and locations required', { status: 400 })
  }

  const slice = yearToSlice(year)
  const cacheKey = `${slice}|${locations.sort().join(',')}`

  if (cache.has(cacheKey)) {
    return Response.json(cache.get(cacheKey))
  }

  const territories = await fetchTerritoryNames(slice)
  if (territories.length === 0) {
    return Response.json({})
  }

  const matched = await matchWithGemini(locations, territories)

  cache.set(cacheKey, matched)
  return Response.json(matched)
}
