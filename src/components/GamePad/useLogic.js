import { useEffect, useState } from "react"

function useLogic() {
  const [buttonPress, setButtonPress] = useState()

  useEffect(() => {
    window.addEventListener("pointerup", handleRelease)
    return () => window.removeEventListener("pointerup", handleRelease)
  }, [])

  function handlePress(event) {
    setButtonPress(event.currentTarget.dataset.id)
    window.dispatchEvent(new CustomEvent("action", { detail: event.currentTarget.dataset.id }))
  }

  function handleRelease() {
    setButtonPress()
    window.dispatchEvent(new CustomEvent("action", { detail: null }))
  }

  return { buttonPress, handlePress }
}

export default useLogic