import { useState, useEffect } from 'react'

export default function Stars({ count = 60 }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id:    i,
    x:     Math.random() * 100,
    y:     Math.random() * 80,
    size:  Math.random() * 8 + 1,
    delay: i,
  }))

  return <>{stars.map(s => <Star key={s.id} {...s} />)}</>
}

function Star({ x, y, size, delay }) {
  const [op, setOp] = useState(Math.random())

  useEffect(() => {
    const id = setInterval(
      () => setOp(Math.random() * 0.7 + 0.3),
      1200 + delay * 300
    )
    return () => clearInterval(id)
  }, [delay])

  return (
    <div style={{
      position:     'absolute',
      left:         `${x}%`,
      top:          `${y}%`,
      width:        size,
      height:       size,
      borderRadius: '50%',
      background:   '#c9a84c',
      opacity:      op,
      boxShadow:    `0 0 ${size * 2}px #c9a84c`,
      transition:   'opacity 1.2s ease',
    }} />
  )
}
