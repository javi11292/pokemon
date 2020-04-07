import { useRef, useEffect } from "react"

function preventDefault(event) {
  event.preventDefault()
}

function useLogic() {
  const canvas = useRef()

  useEffect(() => {
    if (navigator.userAgent === "ReactSnap") return

    import("game").then(({ Game }) => new Game(canvas.current))

    window.addEventListener("contextmenu", preventDefault)

    return () => {
      window.removeEventListener("contextmenu", preventDefault)
    }
  }, [])

  return { canvas }
}

export default useLogic