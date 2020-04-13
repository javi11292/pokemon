import { useEffect, useState } from "react"
import useStore from "hooks/useStore"

function useLogic() {
  const [buttonPress, setButtonPress] = useState({})
  const [message] = useStore("message")

  useEffect(() => {
    function handlePress(event) {
      const target = document.elementFromPoint(event.x, event.y)
      const action = target?.parentElement.dataset.action
      if (!action) {
        handleRelease(event)
      } else {
        setButtonPress(buttons => ({ ...buttons, [event.pointerId]: action }))
      }
    }

    function handleRelease(event) {
      setButtonPress(buttons => {
        const { [event.pointerId]: removed, ...otherButtons } = buttons
        return otherButtons
      })
    }

    const events = [["pointerdown", handlePress], ["pointermove", handlePress], ["pointerup", handleRelease]]

    events.forEach(event => window.addEventListener(...event))
    return () => events.forEach(event => window.removeEventListener(...event))
  }, [])

  useEffect(() => {
    if (message.value) setButtonPress({})
  }, [message.value])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("action", { detail: Object.values(buttonPress) }))
  }, [buttonPress])

  return { buttonPress: Object.values(buttonPress), message: message.value }
}

export default useLogic