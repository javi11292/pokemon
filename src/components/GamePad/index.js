import React from "react"
import { CONTROLS } from "libraries/constants"
import useLogic from "./useLogic"
import styles from "./index.module.css"
import { ReactComponent as PadButton } from "./PadButton.svg"

function GamePad() {
  const { buttonPress, handlePress, handleRelease } = useLogic()

  return (
    <div className={styles.root}>

      <div
        className={styles.container}
        onPointerDown={handlePress}
        onPointerOut={handleRelease}
        data-id={CONTROLS.UP}
        style={{ "--area": "top", "--color": buttonPress === CONTROLS.UP ? "grey" : "white" }}>
        <PadButton className={styles.button} />
      </div>
      <div
        className={styles.container}
        onPointerDown={handlePress}
        onPointerOut={handleRelease}
        data-id={CONTROLS.LEFT}
        style={{ "--area": "left", "--rotate": "270deg", "--color": buttonPress === CONTROLS.LEFT ? "grey" : "white" }}>
        <PadButton className={styles.button} />
      </div>
      <div
        className={styles.container}
        onPointerDown={handlePress}
        onPointerOut={handleRelease}
        data-id={CONTROLS.RIGHT}
        style={{ "--area": "right", "--rotate": "90deg", "--color": buttonPress === CONTROLS.RIGHT ? "grey" : "white" }}>
        <PadButton className={styles.button} />
      </div>
      <div
        className={styles.container}
        onPointerDown={handlePress}
        onPointerOut={handleRelease}
        data-id={CONTROLS.DOWN}
        style={{ "--area": "bottom", "--rotate": "180deg", "--color": buttonPress === CONTROLS.DOWN ? "grey" : "white" }}>
        <PadButton className={styles.button} />
      </div>

    </div>
  )
}

export default GamePad