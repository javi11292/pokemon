import React from "react"
import { CONTROLS } from "libraries/constants"
import useLogic from "./useLogic"
import styles from "./index.module.css"

function Button() {
  return (
    <>
      <div className={styles.button} />
      <div className={styles.border} />
    </>
  )
}

function GamePad() {
  const { buttonPress, handlePress } = useLogic()

  return (
    <div className={styles.root}>

      <div
        className={styles.container}
        onPointerDown={handlePress}
        data-id={CONTROLS.UP}
        style={{ "--area": "top", "--color": buttonPress === CONTROLS.UP ? "grey" : "white" }}>
        <Button />
      </div>
      <div
        className={styles.container}
        onPointerDown={handlePress}
        data-id={CONTROLS.LEFT}
        style={{ "--area": "left", "--rotate": "270deg", "--color": buttonPress === CONTROLS.LEFT ? "grey" : "white" }}>
        <Button />
      </div>
      <div
        className={styles.container}
        onPointerDown={handlePress}
        data-id={CONTROLS.RIGHT}
        style={{ "--area": "right", "--rotate": "90deg", "--color": buttonPress === CONTROLS.RIGHT ? "grey" : "white" }}>
        <Button />
      </div>
      <div
        className={styles.container}
        onPointerDown={handlePress}
        data-id={CONTROLS.DOWN}
        style={{ "--area": "bottom", "--rotate": "180deg", "--color": buttonPress === CONTROLS.DOWN ? "grey" : "white" }}>
        <Button />
      </div>

    </div>
  )
}

export default GamePad