import { useState } from 'react'
import { getUrlParams } from './utils/getUrlParams'
import EidCover    from './components/EidCover'
import MessagePage from './components/MessagePage'

export default function App() {
  const { to, from } = getUrlParams()

  const p        = new URLSearchParams(window.location.search)
  const isShared = p.get('shared') === 'true'

  // Always show the cover first when opening any link
  // Never auto-open the message page directly
  const [open, setOpen] = useState(false)
  const [vis,  setVis]  = useState(false)

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