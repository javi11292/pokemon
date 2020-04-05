import { useState, useEffect, useLayoutEffect } from "react"

function useLogic(style) {
  const [update, setUpdate] = useState()

  useLayoutEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.innerHTML = style
    document.head.appendChild(styleElement)
  }, [style])

  useEffect(() => {
    function callback({ detail }) {
      setUpdate(() => () => {
        detail.postMessage({ type: "SKIP_WAITING" })
        window.location.reload()
      })
    }

    window.addEventListener("update", callback)
    return () => window.removeEventListener("update", callback)
  }, [])

  function handleClose({ currentTarget }) {
    if (currentTarget.dataset.confirm) {
      update()
    } else {
      setUpdate()
    }
  }

  return { update, handleClose }
}

export default useLogic