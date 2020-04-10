import React from "react"
import Notifications from "components/Notifications"
import GamePad from "components/GamePad"
import Message from "components/Message"
import useLogic from "./useLogic"
import styles from "./index.module.css"

function Main() {
  const { canvas } = useLogic()

  return (
    <div className={styles.root}>
      <div className={styles.title}>Pokemon</div>
      <Notifications />
      <GamePad />
      <Message />
      <canvas className={styles.canvas} ref={canvas} />
    </div>
  )
}

export default React.memo(Main)