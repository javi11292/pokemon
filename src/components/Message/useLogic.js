import { useRef, useState, useEffect } from "react"
import useStore from "hooks/useStore"

function useLogic() {
  const messageRef = useRef()
  const [message, setMessage] = useStore("message")
  const [scroll, setScroll] = useState(0)
  const [hasScroll, setHasScroll] = useState(false)
  const isScrolling = useRef(false)

  function handleTransition() {
    isScrolling.current = false
    checkScroll()
  }

  function checkScroll() {
    if (!messageRef.current) setHasScroll(false)
    else setHasScroll(-messageRef.current.offsetTop + messageRef.current.clientHeight < messageRef.current.scrollHeight)
  }

  useEffect(() => {
    function handleTouch() {
      if (hasScroll && !isScrolling.current) {
        setScroll(scroll => scroll + 1)
        isScrolling.current = true
      } else if (!hasScroll) {
        setMessage(message => {
          if (message.callback) message.callback()
          return { value: "" }
        })
      }
    }

    window.addEventListener("pointerdown", handleTouch)
    return () => window.removeEventListener("pointerdown", handleTouch)
  }, [setMessage, hasScroll])

  useEffect(() => {
    setScroll(0)
    checkScroll()
  }, [message.value])

  return { message: message.value, messageRef, scroll, hasScroll, handleTransition }
}

export default useLogic