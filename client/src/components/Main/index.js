import React from "react"
import Notifications from "components/Notifications"
import styles from "./index.module.css"

function Main() {
  return (
    <div className={styles.root}>
      <Notifications />
    </div>
  )
}

export default React.memo(Main)