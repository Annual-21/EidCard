const inputStyle = {
  background:   '#ffffff22',
  border:       '1px solid #c9a84c66',
  borderRadius: 6,
  padding:      '8px 14px',
  color:        '#e8d5a0',
  fontSize:     '0.95rem',
  width:        '100%',
  outline:      'none',
  fontFamily:   'Georgia, serif',
}

export default function NameForm({ to, from, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', width: '100%', maxWidth: 600 }}>
      <div style={{ flex: 1, minWidth: 140 }}>
        <label style={{
          color:         '#c9a84c',
          fontSize:      '0.75rem',
          letterSpacing: '0.1em',
          display:       'block',
          marginBottom:  4,
        }}>
          TO
        </label>
        <input
          style={inputStyle}
          placeholder="Recipient name"
          value={to}
          onChange={e => onChange('to', e.target.value)}
        />
      </div>

      <div style={{ flex: 1, minWidth: 140 }}>
        <label style={{
          color:         '#c9a84c',
          fontSize:      '0.75rem',
          letterSpacing: '0.1em',
          display:       'block',
          marginBottom:  4,
        }}>
          FROM
        </label>
        <input
          style={inputStyle}
          placeholder="Your name"
          value={from}
          onChange={e => onChange('from', e.target.value)}
        />
      </div>
    </div>
  )
}
