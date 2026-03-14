import { useState } from 'react'
import { generateShareLink } from '../utils/generateShareLink'

const btnStyle = {
  background:    'linear-gradient(135deg, #c9a84c, #8b5e0a)',
  border:        'none',
  borderRadius:  8,
  padding:       '10px 22px',
  color:         '#0d2b1e',
  fontWeight:    'bold',
  cursor:        'pointer',
  fontSize:      '0.9rem',
  letterSpacing: '0.05em',
  boxShadow:     '0 4px 14px #c9a84c55',
}

export default function ShareCard({ to, from }) {
  const [copied, setCopied] = useState(false)

  // Force the shared link to always open the cover first
  // by adding &shared=true — App.jsx will read this
  function buildLink() {
    const base = generateShareLink(to, from)
    const url  = new URL(base)
    url.searchParams.set('shared', 'true')
    return url.toString()
  }

  async function handleShare() {
    const link = buildLink()
    if (navigator.share) {
      await navigator.share({
        title: 'Eid Mubarak!',
        text:  'Wishing you a blessed Eid!',
        url:   link,
      })
    } else {
      copyLink()
    }
  }

  function copyLink() {
    const link = buildLink()
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
      <button onClick={handleShare} style={btnStyle}>Share Card</button>
      <button onClick={copyLink}    style={btnStyle}>
        {copied ? '✅ Copied!' : ':)Copy Link'}
      </button>
    </div>
  )
}