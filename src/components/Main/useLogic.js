import { useRef, useEffect } from "react"
import { Game } from "game"

function preventDefault(event) {
  event.preventDefault()
}

function useLogic() {
  const canvas = useRef()

  useEffect(() => {
    window.addEventListener("contextmenu", preventDefault)
    const game = new Game(canvas.current)

    return () => {
      window.removeEventListener("contextmenu", preventDefault)
      game.destroy()
    }
  }, [])

  return { canvas }
}

export default useLogic