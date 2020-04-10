import React from "react"
import { Paper } from "@material-ui/core"
import Next from "@material-ui/icons/ArrowDropDown"
import useLogic from "./useLogic"
import styles from "./index.module.css"

function Message() {
  const { message, messageRef, scroll, handleTransition, hasScroll } = useLogic()

  return message && (
    <div className={styles.root}>
      <Paper className={styles.box}>
        <div className={styles.message}>
          <div
            ref={messageRef}
            className={styles.scroller}
            onTransitionEnd={handleTransition}
            style={{ "--scroll": `${-scroll * 4.5}rem` }}>
            {message}
          </div>
        </div>
        {hasScroll && <Next className={styles.icon} />}
      </Paper>
    </div>
  )
}

export default Message