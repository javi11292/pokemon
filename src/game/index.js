import { Application, utils, settings, SCALE_MODES } from "pixi.js"
import { CONTROLS } from "libraries/constants"
import { createPlayer } from "./Player"
import { createWorld } from "./World"

export function createGame(view) {
  utils.skipHello()
  settings.SCALE_MODE = SCALE_MODES.NEAREST

  const game = {
    app: null,
    action: null,
    player: null,
    world: null,
    enableControls: false,
  }

  game.app = new Application({
    view,
    width: 1920,
    height: 1080,
  })

  game.player = createPlayer(game)
  game.world = createWorld(game)

  function handleAction({ detail }) {
    if (!game.enableControls) return
    game.action = detail

    switch (game.action) {
      case CONTROLS.UP:
      case CONTROLS.LEFT:
      case CONTROLS.RIGHT:
      case CONTROLS.DOWN: {
        game.player.walk(game.action)
        break
      }

      default: {
        game.player.still()
      }
    }
  }

  window.addEventListener("action", handleAction)

  game.app.ticker.add(() => {
    game.player.update()
    game.world.update()
  })
}