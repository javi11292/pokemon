import React from "react"
import { Snackbar, SnackbarContent } from "@material-ui/core"
import useLogic from "./useLogic"

function Notifications() {
  const { notification, handleClose, handleExited, open } = useLogic()

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      onExited={handleExited}
      autoHideDuration={2000}>
      <SnackbarContent message={notification} />
    </Snackbar>
  )
}

export default Notifications