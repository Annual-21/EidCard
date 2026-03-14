import { useState, useEffect } from 'react'

// 👆 emoji as a data URI cursor
const POINTER_CURSOR = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><text y='26' font-size='26'>🌟</text></svg>") 8 0, pointer`

export default function MoonAnimation() {
  const [glow,     setGlow]     = useState(0)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    let t = 0
    const id = setInterval(() => {
      t += 0.03
      setGlow(Math.sin(t) * 0.3 + 0.7)
    }, 60)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {/* Clickable Moon */}
      <div
        onClick={() => setShowInfo(true)}
        title="What is Eid Al-Fitr?"
        style={{
          position:     'absolute',
          top:          30,
          right:        60,
          width:        70,
          height:       70,
          boxShadow:    `0 0 ${40 + glow * 30}px #c9a84c`,
          borderRadius: '50%',
          overflow:     'hidden',
          cursor:       POINTER_CURSOR,
          zIndex:       20,
        }}
      >
        <div style={{
          width:        '100%',
          height:       '100%',
          background:   '#c9a84c',
          borderRadius: '50%',
          position:     'relative',
        }}>
        </div>
      </div>

      {/* Info overlay */}
      {showInfo && (
        <div
          onClick={() => setShowInfo(false)}
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         50,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            background:     'rgba(13, 43, 30, 0.75)',
            backdropFilter: 'blur(4px)',
            cursor:         'pointer',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:   'rgba(26, 71, 49, 0.85)',
              border:       '1px solid #c9a84c66',
              borderRadius: 12,
              padding:      '36px 40px',
              maxWidth:     420,
              width:        '90%',
              boxShadow:    '0 8px 40px #00000066',
              position:     'relative',
              cursor:       'default',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowInfo(false)}
              style={{
                position:   'absolute',
                top:        12,
                right:      16,
                background: 'transparent',
                border:     'none',
                color:      '#c9a84c',
                fontSize:   '1.2rem',
                cursor:     'pointer',
              }}
            >
              ✕
            </button>

            {/* Title */}
            <div style={{
              color:         '#c9a84c',
              fontFamily:    "'Playfair Display', Georgia, serif",
              fontSize:      '1.3rem',
              fontWeight:    'bold',
              marginBottom:  20,
              textAlign:     'center',
              letterSpacing: '0.05em',
            }}>
              🌙 What is Eid Al-Fitr?
            </div>

            {/* 4 lines */}
            {[
              '🕌  Eid Al-Fitr marks the end of Ramadan, the Islamic holy month of fasting, prayer, and reflection.',
              '🌙  It begins with the sighting of the new crescent moon and is celebrated on the 1st of Shawwal in the Islamic calendar.',
              '🤲  Muslims gather for special Eid prayers, give to charity (Zakat al-Fitr), and share meals with family and loved ones.',
            ].map((line, i) => (
              <p key={i} style={{
                color:        '#e8d5a0',
                fontFamily:   "'Playfair Display', Georgia, serif",
                fontSize:     '0.92rem',
                lineHeight:   1.75,
                marginBottom: i < 3 ? 14 : 0,
              }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  )
}