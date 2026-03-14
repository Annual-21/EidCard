import { useState, useEffect } from 'react'

export default function LanternAnimation({ x, delay = 0 }) {
  const [y, setY] = useState(0)

  useEffect(() => {
    let t = 0
    const id = setInterval(() => {
      t += 0.02
      setY(Math.sin(t + delay) * 12)
    }, 50)
    return () => clearInterval(id)
  }, [delay])

  return (
    <div style={{
      position:      'absolute',
      left:          `${x}%`,
      top:           `${15 + delay * 8}%`,
      transform:     `translateY(${y}px)`,
      transition:    'transform 0.05s linear',
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'center',
    }}>
      {/* String */}
      <div style={{ width: 2, height: 20, background: '#c9a84c', opacity: 0.7 }} />

      {/* Body */}
      <div style={{
        width:          22,
        height:         32,
        background:     'linear-gradient(180deg, #c9a84c, #8b5e0a)',
        borderRadius:   '4px 4px 50% 50%',
        boxShadow:      '0 0 18px #c9a84c88',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width:        10,
          height:       10,
          borderRadius: '50%',
          background:   '#fff8dc',
          opacity:      0.8,
        }} />
      </div>

      {/* Tail */}
      <div style={{ width: 1.5, height: 10, background: '#c9a84c', opacity: 0.7 }} />
    </div>
  )
}
