import React from "react"
import { CONTROLS } from "libraries/constants"
import useLogic from "./useLogic"
import styles from "./index.module.css"
import { ReactComponent as PadButton } from "./PadButton.svg"
import { ReactComponent as Triangle } from "./Triangle.svg"
import { ReactComponent as ActionButton } from "./ActionButton.svg"

function GamePad() {
  const { buttonPress, message } = useLogic()

  return !message && (
    <>
      <div className={styles.pad}>
        <div className={styles.corner} style={{ "--area": "topLeft" }}>
          <Triangle data-action={CONTROLS.UP} className={styles.triangle} style={{ "--rotate": "180deg" }} />
          <Triangle data-action={CONTROLS.LEFT} className={styles.triangle} />
        </div>
        <div className={styles.corner} style={{ "--area": "topRight" }}>
          <Triangle data-action={CONTROLS.RIGHT} className={styles.triangle} style={{ "--rotate": "270deg" }} />
          <Triangle data-action={CONTROLS.UP} className={styles.triangle} style={{ "--rotate": "90deg" }} />
        </div>
        <div className={styles.corner} style={{ "--area": "bottomLeft" }}>
          <Triangle data-action={CONTROLS.DOWN} className={styles.triangle} style={{ "--rotate": "270deg" }} />
          <Triangle data-action={CONTROLS.LEFT} className={styles.triangle} style={{ "--rotate": "90deg" }} />
        </div>
        <div className={styles.corner} style={{ "--area": "bottomRight" }}>
          <Triangle data-action={CONTROLS.RIGHT} className={styles.triangle} style={{ "--rotate": "180deg" }} />
          <Triangle data-action={CONTROLS.DOWN} className={styles.triangle} />
        </div>

        <div
          className={styles.container}
          style={{ "--area": "top", "--color": buttonPress.includes(CONTROLS.UP) ? "grey" : "white" }}>
          <PadButton data-action={CONTROLS.UP} className={styles.button} />
        </div>
        <div
          className={styles.container}
          style={{ "--area": "left", "--rotate": "270deg", "--color": buttonPress.includes(CONTROLS.LEFT) ? "grey" : "white" }}>
          <PadButton data-action={CONTROLS.LEFT} className={styles.button} />
        </div>
        <div
          className={styles.container}
          style={{ "--area": "right", "--rotate": "90deg", "--color": buttonPress.includes(CONTROLS.RIGHT) ? "grey" : "white" }}>
          <PadButton data-action={CONTROLS.RIGHT} className={styles.button} />
        </div>
        <div
          className={styles.container}
          style={{ "--area": "bottom", "--rotate": "180deg", "--color": buttonPress.includes(CONTROLS.DOWN) ? "grey" : "white" }}>
          <PadButton data-action={CONTROLS.DOWN} className={styles.button} />
        </div>
      </div>

      <div className={styles.actions}>
        <div style={{ "--area": "top", "--color": buttonPress.includes(CONTROLS.B) ? "grey" : "white" }} >
          <ActionButton data-action={CONTROLS.B} className={styles.button} />
        </div>
        <div style={{ "--area": "top", "--color": buttonPress.includes(CONTROLS.A) ? "grey" : "white" }} >
          <ActionButton data-action={CONTROLS.A} className={styles.button} />
        </div>
      </div>
    </>
  )
}

export default GamePad