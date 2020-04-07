import React from "react"
import Notifications from "components/Notifications"
import GamePad from "components/GamePad"
import useLogic from "./useLogic"
import styles from "./index.module.css"

function Main() {
  const { canvas } = useLogic()

  return (
    <div className={styles.root} >
      <Notifications />
      <GamePad />
      <canvas className={styles.canvas} ref={canvas} />
    </div>
  )
}

export default React.memo(Main)