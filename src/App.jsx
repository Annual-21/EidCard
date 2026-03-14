import { useState } from 'react'
import { getUrlParams } from './utils/getUrlParams'
import EidCover    from './components/EidCover'
import MessagePage from './components/MessagePage'

export default function App() {
  const { to, from } = getUrlParams()

  const p        = new URLSearchParams(window.location.search)
  const isShared = p.get('shared') === 'true'

  // Only auto-open if names are in URL AND it is NOT a shared link
  const autoOpen = !!(to || from) && !isShared

  const [open, setOpen] = useState(autoOpen)
  const [vis,  setVis]  = useState(autoOpen)

  function handleOpen() {
    setOpen(true)
    setTimeout(() => setVis(true), 50)
  }

  return (
    <>
      {!open && <EidCover onOpen={handleOpen} />}
      {open && (
        <div style={{
          opacity:    vis ? 1 : 0,
          transform:  vis ? 'scale(1)' : 'scale(0.96)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <MessagePage isShared={isShared} />
        </div>
      )}
    </>
  )
}