import { SIZE, CHARACTERS } from "libraries/constants"
import { createCharacter, STATES } from "./Character"

export async function createPlayer(game) {
  const player = await createCharacter(
    game,
    CHARACTERS.PLAYER,
    game.app.stage,
    game.app.screen.width / 2 - SIZE / 2,
    game.app.screen.height / 2 - SIZE / 2,
  )

  function still() {
    characterStill()
    clearTimeout(faceTimeout)
  }

  function face(direction) {
    characterFace(direction)
    faceTimeout = setTimeout(() => walk(direction), 50)
  }

  function walk(direction) {
    if (player.direction !== direction && player.state !== STATES.WALK) face(direction)
    else characterWalk(direction)
  }

  function updateState() {
    characterUpdateState()

    const { data } = player.nextTile
    if (data.location || data.layer) {
      const [x, y] = data.position.split(",")
      game.world.setLocation(data.location, data.layer, { x: x * SIZE, y: y * SIZE })
    }
  }

  function loadEvent({ data }) {
    if (data.event) {
      game.world.events[data.event]()
    }
  }

  const {
    walk: characterWalk,
    face: characterFace,
    still: characterStill,
    updateState: characterUpdateState,
  } = player

  player.still = still
  player.face = face
  player.walk = walk
  player.updateState = updateState
  player.postUpdate = () => { }
  player.onNextTileUpdate = loadEvent

  let faceTimeout = null

  return player
}