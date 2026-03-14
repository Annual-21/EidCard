import { useState, useEffect, useRef } from 'react'

const COLORS = ['#c9a84c', '#e8c96a', '#2d7a4f', '#ffffff', '#c9a84c88']

export default function Confetti({ active }) {
  const pieces = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id:    i,
      x:     Math.random() * 100,
      color: COLORS[i % COLORS.length],
      size:  Math.random() * 8 + 4,
      delay: Math.random() * 2,
      speed: Math.random() * 3 + 2,
    }))
  )
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) return
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 4000)
    return () => clearTimeout(t)
  }, [active])

  if (!visible) return null

  return (
    <div style={{
      position:      'fixed',
      inset:         0,
      pointerEvents: 'none',
      overflow:      'hidden',
      zIndex:        100,
    }}>
      {pieces.current.map(p => (
        <div key={p.id} style={{
          position:     'absolute',
          left:         `${p.x}%`,
          top:          '-20px',
          width:        p.size,
          height:       p.size,
          background:   p.color,
          borderRadius: '2px',
          animation:    `fall ${p.speed}s ${p.delay}s linear forwards`,
        }} />
      ))}
      <style>{`
        @keyframes fall {
          to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
