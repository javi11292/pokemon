import { Application, utils, settings, SCALE_MODES } from "pixi.js"
import { CONTROLS } from "libraries/constants"
import { Player } from "./Player"

export class Game {
  constructor(view) {
    utils.skipHello()
    settings.SCALE_MODE = SCALE_MODES.NEAREST

    this.app = new Application({
      view,
      width: 1920,
      height: 1080,
    })

    this.player = new Player(this.app)
    this.action = null

    window.addEventListener("action", this.handleAction)

    this.app.ticker.add(() => {
      switch (this.action) {
        case CONTROLS.UP:
        case CONTROLS.LEFT:
        case CONTROLS.RIGHT:
        case CONTROLS.DOWN: {
          this.player.walk(this.action)
          break
        }

        default: {
          this.player.still()
        }
      }
    })
  }

  destroy = () => {
    window.removeEventListener("action", this.handleAction)
  }

  handleAction = ({ detail }) => {
    this.action = detail
  }
}