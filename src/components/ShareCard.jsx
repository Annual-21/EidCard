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

const outlineStyle = {
  ...btnStyle,
  background: 'transparent',
  border:     '1px solid #c9a84c88',
  color:      '#c9a84c',
  boxShadow:  'none',
}

export default function ShareCard({ to, from, isShared = false }) {
  const [copied,       setCopied]       = useState(false)
  const [copiedSender, setCopiedSender] = useState(false)

  // Recipient link — shared=true hides personalization bars
  function buildSharedLink() {
    const base = generateShareLink(to, from)
    const url  = new URL(base)
    url.searchParams.set('shared', 'true')
    return url.toString()
  }

  // Sender link — no shared=true, shows editable bars so receiver
  // can change To/From and resend to someone else
  function buildSenderLink() {
    // Strip To/From so the new sender can fill in their own names
    const url = new URL(window.location.href.split('?')[0])
    return url.toString()
  }

  async function handleShare() {
    const link = buildSharedLink()
    if (navigator.share) {
      await navigator.share({
        title: 'Eid Mubarak! 🌙',
        text:  'Wishing you a blessed Eid!',
        url:   link,
      })
    } else {
      navigator.clipboard.writeText(link)
    }
  }

  // Sender's own Copy Link — keeps To/From in URL
  function copyLink() {
    const link = generateShareLink(to, from)
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Receiver's "Send to someone else" — strips names so they can personalise fresh
  function copySendLink() {
    const link = buildSenderLink()
    navigator.clipboard.writeText(link).then(() => {
      setCopiedSender(true)
      setTimeout(() => setCopiedSender(false), 2000)
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>

      {/* Shown to SENDER */}
      {!isShared && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={handleShare} style={btnStyle}>
            Share Card
          </button>
          <button onClick={copyLink} style={btnStyle}>
            {copied ? '✅ Copied!' : 'Copy Link'}
          </button>
        </div>
      )}

      {/* Shown to RECEIVER — lets them send the card to someone else */}
      {isShared && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <p style={{
            color:         '#a8c4a0',
            fontSize:      '0.78rem',
            letterSpacing: '0.12em',
            textAlign:     'center',
          }}>
            ✦ Want to send this to someone? ✦
          </p>
          <button onClick={copySendLink} style={outlineStyle}>
            {copiedSender ? '✅ Copied!' : 'Send to closed ones'}
          </button>
        </div>
      )}

    </div>
  )
}