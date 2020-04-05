import { useState, useEffect } from "react"
import useStore from "hooks/useStore"

function useLogic() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useStore("notifications")

  useEffect(() => {
    setOpen(notifications.length > 0)
  }, [notifications])

  function handleClose() {
    setOpen(false)
  }

  function handleExited() {
    setNotifications({ action: "shift" })
  }

  return { notification: notifications[0], handleClose, handleExited, open }
}

export default useLogic