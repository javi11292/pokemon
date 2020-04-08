import { Application, utils, settings, SCALE_MODES } from "pixi.js"
import { CONTROLS } from "libraries/constants"
import { Player } from "./Player"
import { World } from "./World"

export class Game {
  constructor(view) {
    utils.skipHello()
    settings.SCALE_MODE = SCALE_MODES.NEAREST

    this.app = new Application({
      view,
      width: 1920,
      height: 1080,
    })

    this.action = null
    this.player = new Player(this)
    this.world = new World(this)

    window.addEventListener("action", this.handleAction)

    this.app.ticker.add(() => {
      this.player.update()
      this.world.update()
    })
  }

  handleAction = ({ detail }) => {
    this.action = detail

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
  }
}