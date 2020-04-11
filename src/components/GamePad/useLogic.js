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
        dispatchButton(action)
      }
    }

    function handleRelease() {
      dispatchButton(null)
    }

    const events = [["pointerdown", handlePress], ["pointermove", handlePress], ["pointerup", handleRelease]]

    events.forEach(event => window.addEventListener(...event))
    return () => events.forEach(event => window.removeEventListener(...event))
  }, [])

  useEffect(() => {
    if (message.value) dispatchButton(null)
  }, [message.value])

  function dispatchButton(button) {
    setButtonPress(button)
    window.dispatchEvent(new CustomEvent("action", { detail: button }))
  }

  return { buttonPress, message: message.value }
}

export default useLogic