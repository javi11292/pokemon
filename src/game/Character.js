import { Spritesheet, AnimatedSprite, Loader } from "pixi.js"
import localForage from "localforage"
import { getData } from "images/data/characters"
import texture from "images/characters.png"
import { upperCase } from "libraries/util"
import { CONTROLS, SIZE, SPEED } from "libraries/constants"

export const STATES = {
  STILL: "still",
  WALK: "walk",
}

let resources = null
let loadingResources = null

async function loadResources() {
  return new Promise(resolve => {
    new Loader().add("characters", texture).load((loader, loadedResources) => {
      resources = loadedResources
      resolve()
    })
  })
}

function getTextures(spriteSheet, key) {
  return spriteSheet.data.animations[key].map(id => {
    const texture = spriteSheet.textures[id]
    texture.rotate = spriteSheet.data.frames[id].rotate ?? texture.rotate
    return texture
  })
}

async function createPosition(database, startX, startY) {
  const positionDB = await await database.getItem("position")
  let x = positionDB?.x || startX
  let y = positionDB?.y || startY

  const position = {
    get x() {
      return x
    },
    set x(newX) {
      x = newX
      database.setItem("position", { ...position, x })
    },
    get y() {
      return y
    },
    set y(newY) {
      y = newY
      database.setItem("position", { ...position, y })
    }
  }

  return position
}

export async function createCharacter(game, id, container, x, y) {
  if (!resources && !loadingResources) {
    loadingResources = await loadResources()
  }

  const database = localForage.createInstance({ name: id })
  const position = await createPosition(database, x, y)

  const character = {
    database,
    game,
    still,
    face,
    walk,
    updateState,
    postUpdate,
    sprite: null,
    state: STATES.STILL,
    direction: CONTROLS.DOWN,
    speed: { x: 0, y: 0 },
    nextDirection: null,
    nextState: null,
    nextTile: { data: {} },
    get position() {
      return position
    },
    set position(newPosition) {
      position.x = newPosition.x
      position.y = newPosition.y
    },
    textures: {
      stillDown: [],
      stillUp: [],
      stillLeft: [],
      stillRight: [],
      walkDown: [],
      walkUp: [],
      walkLeft: [],
      walkRight: [],
    },
  }

  function still() {
    character.nextState = STATES.STILL
  }

  function face(direction) {
    character.nextDirection = direction
  }

  function walk(direction) {
    face(direction)
    character.nextState = STATES.WALK
  }

  async function update() {
    const speedX = character.direction === CONTROLS.RIGHT ? 1 : character.direction === CONTROLS.LEFT ? -1 : 0
    const speedY = character.direction === CONTROLS.DOWN ? 1 : character.direction === CONTROLS.UP ? -1 : 0

    if (character.state === STATES.WALK && !character.speed.x && !character.speed.y) await updateNextTile(speedX, speedY)

    if (character.state === STATES.WALK && !character.speed.x && !character.speed.y && character.nextTile.data.collision === "false") {
      character.speed.x = speedX
      character.speed.y = speedY
      updatePosition(character.speed.x ? "x" : "y", true)
    } else if (character.speed.x || character.speed.y) {
      updatePosition(character.speed.x ? "x" : "y")
    } else {
      updateState()
    }

    updateTextures()
    character.postUpdate && character.postUpdate()
  }

  function postUpdate() {
    character.sprite.x = position.x
    character.sprite.y = position.y
  }

  async function updateNextTile(speedX, speedY) {
    const nextX = Math.floor(position.x / SIZE + speedX)
    const nextY = Math.floor(position.y / SIZE + speedY)

    if (character.nextTile.x === nextX && character.nextTile.y === nextY) return

    const data = character.game.world.tileAt(nextX, nextY)

    character.nextTile = {
      x: nextX,
      y: nextY,
      data,
    }

    if (data.event === id.toString()) await loadEvent(nextX, nextY)
  }

  function updatePosition(dimension, move) {
    if (!character.speed[dimension]) return

    const speed = character.speed[dimension] * SPEED
    const remainder = position[dimension] % SIZE

    if (remainder || move) {
      position[dimension] += speed
    } else {
      character.speed[dimension] = 0
      character.updateState()
    }
  }

  function updateState() {
    if (character.nextDirection) {
      character.direction = character.nextDirection
      character.nextDirection = null
    }
    if (character.nextState) {
      character.state = character.nextState
      character.nextState = null
    }
  }

  function updateTextures() {
    if (!character.sprite) return
    const textures = character.textures[character.state + upperCase(character.direction)]
    if (!textures || character.sprite.textures === textures) return
    character.sprite.textures = textures
    character.sprite.play()
  }

  function addSpriteSheet() {
    const spriteSheet = new Spritesheet(resources.characters.texture, getData(id))

    spriteSheet.parse(() => {
      character.textures.stillDown = [spriteSheet.textures["stillDown" + id]]
      character.textures.stillUp = [spriteSheet.textures["stillUp" + id]]
      character.textures.stillLeft = [spriteSheet.textures["stillLeft" + id]]
      character.textures.stillRight = [spriteSheet.textures["stillRight" + id]]

      character.textures.walkDown = getTextures(spriteSheet, "walkDown")
      character.textures.walkUp = getTextures(spriteSheet, "walkUp")
      character.textures.walkLeft = getTextures(spriteSheet, "walkLeft")
      character.textures.walkRight = getTextures(spriteSheet, "walkRight")

      const sprite = new AnimatedSprite(character.textures[character.state + upperCase(character.direction)])

      sprite.width = SIZE
      sprite.height = SIZE
      sprite.animationSpeed = 0.1
      sprite.x = x
      sprite.y = y
      character.sprite = sprite

      container.addChild(sprite)
    })
  }

  async function loadEvent(x, y) {
    await game.world.events[id][`${x}-${y}`](character.game)
  }

  addSpriteSheet()

  character.game.app.ticker.add(update)

  return character
}