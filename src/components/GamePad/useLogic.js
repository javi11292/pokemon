import { useEffect, useState } from "react"
import useStore from "hooks/useStore"

function useLogic() {
  const [buttonPress, setButtonPress] = useState()
  const [message] = useStore("message")

  useEffect(() => {
    function handlePress(event) {
      const target = document.elementFromPoint(event.x, event.y)
      const action = target?.parentElement.dataset.action
      if (!action) {
        handleRelease()
      } else {
        setButtonPress(action)
      }
    }

    function handleRelease() {
      setButtonPress(null)
    }

    const events = [["pointerdown", handlePress], ["pointermove", handlePress], ["pointerup", handleRelease]]

    events.forEach(event => window.addEventListener(...event))
    return () => events.forEach(event => window.removeEventListener(...event))
  }, [])

  useEffect(() => {
    if (message.value) setButtonPress(null)
  }, [message.value])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("action", { detail: buttonPress }))
  }, [buttonPress])

  return { buttonPress, message: message.value }
}

export default useLogic