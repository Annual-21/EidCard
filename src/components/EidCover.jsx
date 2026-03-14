import { useState, useEffect } from 'react'
import Stars           from './Stars'
import LanternAnimation from './LanternAnimation'

// Vite picks up every image in assets/images at build time
const imageModules = import.meta.glob(
  '../assets/images/*.{jpg,png,gif}',
  { eager: true }
)
const IMAGE_URLS = Object.values(imageModules).map(m => m.default)

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function EidCover({ onOpen }) {
  const [show,  setShow]  = useState(false)
  const [bgImg, setBgImg] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200)
    if (IMAGE_URLS.length > 0) setBgImg(pickRandom(IMAGE_URLS))
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      onClick={onOpen}
      style={{
        position:       'fixed',
        inset:          0,
        cursor:         'pointer',
        background: bgImg
          ? `linear-gradient(to bottom, #0d2b1ecc, #0d2b1e99), url("${bgImg}") center / cover no-repeat`
          : 'radial-gradient(ellipse at 70% 20%, #1a3a2a 0%, #0d2b1e 60%, #060e09 100%)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        overflow:       'hidden',
      }}
    >
      <Stars count={40} />
      <LanternAnimation x={10}  delay={0} />
      <LanternAnimation x={85}  delay={1} />
      <LanternAnimation x={20}  delay={2} />
      <LanternAnimation x={75}  delay={0.5} />

      {/* Mosque silhouette — shown only when no background image */}
      {!bgImg && (
        <div style={{
          position:  'absolute',
          bottom:    0,
          left:      '50%',
          transform: 'translateX(-50%)',
          width:     'min(700px, 100vw)',
        }}>
          <svg viewBox="0 0 700 200" style={{ width: '100%', display: 'block' }}>
            <g fill="#1a4731cc">
              <ellipse cx="350" cy="110" rx="80"  ry="70" />
              <rect    x="270"  y="110" width="160" height="90" />
              <ellipse cx="200" cy="140" rx="50"  ry="40" />
              <rect    x="150"  y="140" width="100" height="60" />
              <ellipse cx="500" cy="140" rx="50"  ry="40" />
              <rect    x="450"  y="140" width="100" height="60" />
              <rect    x="80"   y="80"  width="16"  height="120" />
              <ellipse cx="88"  cy="80" rx="12"  ry="18" />
              <rect    x="600"  y="80"  width="16"  height="120" />
              <ellipse cx="608" cy="80" rx="12"  ry="18" />
              <rect    x="0"    y="155" width="150" height="45" />
              <rect    x="550"  y="155" width="150" height="45" />
            </g>
          </svg>
        </div>
      )}

      {/* Card text */}
      <div style={{
        position:  'relative',
        zIndex:    10,
        textAlign: 'center',
        padding:   '0 24px',
        opacity:    show ? 1 : 0,
        transform:  show ? 'scale(1)' : 'scale(0.85)',
        transition: 'opacity 1.2s ease, transform 1.2s ease',
      }}>
        <div style={{
          fontFamily:    'Georgia, serif',
          fontSize:      'clamp(2.4rem, 7vw, 5rem)',
          color:         '#c9a84c',
          textShadow:    '0 0 30px #c9a84c88',
          letterSpacing: '0.08em',
          lineHeight:    1.2,
        }}>
          Eid Mubarak
        </div>

        <div style={{
          fontFamily:    '"Amiri", serif',
          fontSize:      'clamp(1rem, 2.5vw, 1.4rem)',
          color:         '#e8d5a0',
          marginTop:     8,
          letterSpacing: '0.15em',
        }}>
          عيد مبارك
        </div>

        <div style={{
          marginTop:     32,
          color:         '#a8c4a0',
          fontSize:      'clamp(0.85rem, 2vw, 1.05rem)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity:        show ? 1 : 0,
          transition:     'opacity 2s ease 0.8s',
        }}>
          ✦ Click to open your card ✦
        </div>
      </div>

      {/* Decorative gold border */}
      <div style={{
        position:      'absolute',
        inset:         12,
        border:        '2px solid #c9a84c55',
        borderRadius:  4,
        pointerEvents: 'none',
        boxShadow:     'inset 0 0 40px #c9a84c11',
      }} />
      <div style={{
        position:      'absolute',
        inset:         18,
        border:        '1px solid #c9a84c33',
        borderRadius:  2,
        pointerEvents: 'none',
      }} />
    </div>
  )
}
