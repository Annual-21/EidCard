import { useState, useEffect, useRef } from 'react'
import { useGenerateEidMessage } from '../hooks/useGenerateEidMessage'
import { getUrlParams }          from '../utils/getUrlParams'
import NotebookMessage           from './NotebookMessage'
import NameForm                  from './NameForm'
import ShareCard                 from './ShareCard'
import LanternAnimation          from './LanternAnimation'
import MoonAnimation             from './MoonAnimation'
import Stars                     from './Stars'
import Confetti                  from './Confetti'

function daysUntilEid() {
  const eid = new Date('2026-03-20')
  const now = new Date()
  const d   = Math.ceil((eid - now) / 86400000)
  return d > 0 ? d : 0
}

export default function MessagePage({ isShared = false }) {
  const params                     = getUrlParams()
  const { msg, loading, generate } = useGenerateEidMessage()
  const [to,       setTo]          = useState(params.to)
  const [from,     setFrom]        = useState(params.from)
  const [confetti, setConfetti]    = useState(false)
  const generated                  = useRef(false)
  const days                       = daysUntilEid()

  useEffect(() => {
    if (!generated.current) { generated.current = true; generate() }
  }, [])

  useEffect(() => {
    if (msg) { setConfetti(true); setTimeout(() => setConfetti(false), 100) }
  }, [msg])

  return (
    <div style={{
      minHeight:      '100vh',
      background:     'radial-gradient(ellipse at 60% 10%, #1a3a2a, #0d2b1e 70%)',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      padding:        '24px 16px 48px',
      gap:            24,
      position:       'relative',
      overflow:       'hidden',
    }}>
      <Stars count={30} />
      <MoonAnimation />
      <LanternAnimation x={5}  delay={0} />
      <LanternAnimation x={90} delay={1} />
      <LanternAnimation x={15} delay={2} />
      <LanternAnimation x={80} delay={0.5} />
      <Confetti active={confetti} />

      {/* Eid countdown */}
      {days > 0 && (
        <div style={{
          color:         '#c9a84c',
          fontSize:      '0.8rem',
          letterSpacing: '0.15em',
          background:    '#ffffff0a',
          borderRadius:  20,
          padding:       '6px 18px',
          border:        '1px solid #c9a84c44',
          zIndex:        10,
        }}>
          Eid begins in {days} day{days !== 1 ? 's' : ''}
        </div>
      )}

      {/* Page title */}
      <div style={{
        color:      '#c9a84c',
        fontFamily: 'Georgia, serif',
        fontSize:   'clamp(1.6rem, 5vw, 2.8rem)',
        textShadow: '0 0 20px #c9a84c88',
        textAlign:  'center',
        zIndex:     10,
      }}>
        Eid Mubarak ✨
      </div>

      {/* Notebook card */}
      <div style={{
        width:      '100%',
        maxWidth:   640,
        position:   'relative',
        zIndex:     10,
        opacity:    msg ? 1 : 0.4,
        transition: 'opacity 0.8s ease',
      }}>
        {loading ? (
          <div style={{
            background:      '#fdf6e3',
            borderRadius:    4,
            padding:         '48px',
            textAlign:       'center',
            color:           '#1a4731',
            fontSize:        '1rem',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #b8c9e8 28px)',
            lineHeight:      '28px',
            boxShadow:       '4px 6px 24px #0005',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>🌙</div>
            Generating your Eid message…
          </div>
        ) : msg ? (
          <NotebookMessage msg={msg} to={to} from={from} />
        ) : null}
      </div>

      {/* Personalization inputs — hidden for recipients */}
      {!isShared && (
        <div style={{ width: '100%', maxWidth: 600, zIndex: 10 }}>
          <p style={{
            color:         '#a8c4a0',
            fontSize:      '0.78rem',
            letterSpacing: '0.12em',
            marginBottom:  10,
            textAlign:     'center',
          }}>
            ✦ Personalize your message ✦
          </p>
          <NameForm
            to={to}
            from={from}
            onChange={(k, v) => k === 'to' ? setTo(v) : setFrom(v)}
          />
        </div>
      )}

      {/* Regenerate verse — hidden for recipients */}
      {!isShared && (
        <button
          onClick={generate}
          disabled={loading}
          style={{
            background:    'transparent',
            border:        '1px solid #c9a84c66',
            borderRadius:  8,
            padding:       '8px 20px',
            color:         '#c9a84c',
            cursor:        loading ? 'not-allowed' : 'pointer',
            fontSize:      '0.85rem',
            letterSpacing: '0.08em',
            zIndex:        10,
            opacity:       loading ? 0.5 : 1,
          }}
        >
          {loading ? 'Generating…' : '✨ New Verse'}
        </button>
      )}

      {/* Share buttons — hidden for recipients */}
      {!isShared && (
        <div style={{ zIndex: 10 }}>
          <ShareCard to={to} from={from} />
        </div>
      )}

      {/* Decorative gold border */}
      <div style={{
        position:      'fixed',
        inset:         10,
        border:        '1px solid #c9a84c33',
        borderRadius:  4,
        pointerEvents: 'none',
        zIndex:        1,
      }} />
    </div>
  )
}