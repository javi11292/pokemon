import { useRef, useEffect } from "react"
import useStore from "hooks/useStore"

function useLogic() {
  const canvas = useRef()
  const setMessage = useStore("message", false)

  useEffect(() => {
    if (navigator.userAgent === "ReactSnap") return

    import("game").then(({ createGame }) => createGame({ view: canvas.current, setMessage }))

    window.addEventListener("contextmenu", preventDefault)
    return () => window.removeEventListener("contextmenu", preventDefault)
  }, [setMessage])

  return { canvas }
}

function preventDefault(event) {
  event.preventDefault()
}

export default useLogic