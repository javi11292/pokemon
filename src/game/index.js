import { Application, utils, settings, SCALE_MODES } from "pixi.js"
import { CONTROLS, SIZE } from "libraries/constants"
import { playerDB } from "libraries/database"
import { loadText } from "libraries/util"
import { createPlayer } from "./Player"
import { createWorld } from "./World"

export async function createGame({ view, setMessage }) {
  const game = {
    setMessage,
    app: null,
    action: null,
    player: null,
    world: null,
    enableControls: false,
  }

  function handleAction({ detail }) {
    if (!game.enableControls) {
      game.action = null
    } else {
      game.action = detail
    }

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

  const save = {
    position: await playerDB.getItem("position"),
    location: await playerDB.getItem("location"),
    layer: await playerDB.getItem("layer"),
  }

  await prepareGame(game, view)

  if (!save.position) {
    loadText("welcome", setMessage)
    game.player.position = { x: SIZE * 3, y: SIZE * 6 }
    game.world.location = "PalletTownRooms"
    game.world.layer = "house1 f2"
  } else {
    game.world.location = save.location
    game.world.layer = save.layer
  }

  game.world.load()

  window.addEventListener("action", handleAction)
}

async function prepareGame(game, view) {
  utils.skipHello()
  settings.SCALE_MODE = SCALE_MODES.NEAREST

  game.app = new Application({
    view,
    width: 1920,
    height: 1080,
  })

  game.app.renderer.plugins.accessibility.destroy()
  delete game.app.renderer.plugins.accesibility

  game.player = await createPlayer(game)
  game.world = await createWorld(game)
}