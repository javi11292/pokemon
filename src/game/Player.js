import { createCharacter, STATES } from "./Character"

export function createPlayer(game) {
  const player = createCharacter(game, "player")
  const { walk: characterWalk, face: characterFace, still: characterStill } = player
  player.still = still
  player.face = face
  player.walk = walk

  let faceTimeout = null

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

  return player
}