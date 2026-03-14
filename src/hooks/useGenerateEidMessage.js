import { useState } from 'react'

// Only used if the API call completely fails (no internet, invalid key, etc.)
const FALLBACK = {
  arabic:      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  translation: 'In the name of Allah, the Most Gracious, the Most Merciful.',
  reference:   'Surah Al-Fatihah, 1:1',
}

const THEMES = [
  'gratitude and thankfulness after Ramadan',
  'peace, mercy, and forgiveness',
  'blessings, joy, and Eid celebration',
  'hope, light, and new beginnings',
  'family, love, and togetherness',
  'patience and trust in Allah',
  'generosity and kindness to others',
  'the beauty of prayer and remembrance of Allah',
  'victory and reward after fasting',
  'Allah\'s infinite mercy and compassion',
]

export function useGenerateEidMessage() {
  const [msg,     setMsg]     = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  async function generate() {
    setLoading(true)
    setError(null)

    const theme   = THEMES[Math.floor(Math.random() * THEMES.length)]
    const randNum = Math.floor(Math.random() * 6236) + 1 // total verses in Quran

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type':      'application/json',
          'x-api-key':         import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model:      'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: `You are a knowledgeable Islamic scholar specializing in Quranic verses.
Your job is to select and return authentic Quran verses in Arabic with accurate English translations.
Always return ONLY raw valid JSON — absolutely no markdown, no backticks, no explanation, no extra text of any kind.`,
          messages: [
            {
              role: 'user',
              content: `Select one authentic Quran verse on the theme of: "${theme}".

Rules:
- The verse must be a real, authentic Quran verse
- Use verse number ${randNum} as a random seed to ensure variety across requests
- Avoid overused verses like Al-Fatihah 1:1 or Ash-Sharh 94:5-6
- Prefer lesser-known but beautiful verses
- Arabic must be the full original Quranic Arabic text with diacritics
- Translation must be clear, modern English

Respond with ONLY this JSON and nothing else:
{"arabic":"full arabic verse text","translation":"english translation","reference":"Surah Name, Chapter:Verse"}`,
            },
          ],
        }),
      })

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`)
      }

      const data  = await res.json()
      const text  = data.content?.map(b => b.text || '').join('') || ''
      const clean = text.replace(/```json|```/g, '').trim()

      const parsed = JSON.parse(clean)

      // Validate the response has all required fields
      if (!parsed.arabic || !parsed.translation || !parsed.reference) {
        throw new Error('Invalid response structure from API')
      }

      setMsg(parsed)
    } catch (err) {
      console.warn('API error:', err.message)
      setError(err.message)
      setMsg(FALLBACK)
    } finally {
      setLoading(false)
    }
  }

  return { msg, loading, error, generate }
}