import { useState } from 'react'
import { getUrlParams } from './utils/getUrlParams'
import EidCover    from './components/EidCover'
import MessagePage from './components/MessagePage'

export default function App() {
  const { to, from } = getUrlParams()
  const autoOpen     = !!(to || from)

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
          <MessagePage />
        </div>
      )}
    </>
  )
}
