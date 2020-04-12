import { Spritesheet, AnimatedSprite, Loader, groupD8 } from "pixi.js"
import localForage from "localforage"
import texture from "images/characters.png"
import { upperCase } from "libraries/util"
import { CONTROLS, SIZE, SPEED } from "libraries/constants"

const TILE_SIZE = 16
const COLUMNS = 8
const ROTATE = "rotate"

export const STATES = {
  STILL: "still",
  WALK: "walk",
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
    onNextTileUpdate: () => { },
    get event() {
      return event
    },
    set event(newEvent) {
      event = createEvent(newEvent)
    },
    sprite: null,
    state: STATES.STILL,
    direction: CONTROLS.DOWN,
    speed: { x: 0, y: 0 },
    nextDirection: null,
    nextState: null,
    get nextTile() {
      return nextTile
    },
    set nextTile(newValue) {
      nextTile = newValue
      character.onNextTileUpdate(newValue)
    },
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

  function update() {
    const speedX = character.direction === CONTROLS.RIGHT ? 1 : character.direction === CONTROLS.LEFT ? -1 : 0
    const speedY = character.direction === CONTROLS.DOWN ? 1 : character.direction === CONTROLS.UP ? -1 : 0

    if (character.state === STATES.WALK && !character.speed.x && !character.speed.y) updateNextTile(speedX, speedY)

    if (event && event.check()) {
      event = null
    }

    if (character.state === STATES.WALK && !character.speed.x && !character.speed.y && character.nextTile.data.collision === false) {
      character.speed.x = speedX
      character.speed.y = speedY
      updatePosition(character.speed.x ? "x" : "y", true)
    } else if (character.speed.x || character.speed.y) {
      updatePosition(character.speed.x ? "x" : "y")
    } else {
      updateState()
    }

    updateTextures()
    character.postUpdate()
  }

  function postUpdate() {
    character.sprite.x = position.x
    character.sprite.y = position.y
  }

  function updateNextTile(speedX, speedY) {
    const nextX = Math.floor(position.x / SIZE + speedX)
    const nextY = Math.floor(position.y / SIZE + speedY)

    if (character.nextTile.x === nextX && character.nextTile.y === nextY) return

    const data = character.game.world.tileAt(nextX, nextY)

    character.nextTile = {
      x: nextX,
      y: nextY,
      data,
    }
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
      character.sprite = sprite

      sprite.width = SIZE
      sprite.height = SIZE
      sprite.animationSpeed = 0.1
      sprite.x = x
      sprite.y = y

      container.addChild(sprite)
    })
  }

  let event = null
  let nextTile = { data: {} }

  addSpriteSheet()

  character.game.app.ticker.add(update)

  return character
}

async function loadResources() {
  return new Promise(resolve => {
    new Loader().add("characters", texture).load((loader, loadedResources) => {
      resources = loadedResources
      resolve()
    })
  })
}

async function createPosition(database, startX, startY) {
  const positionDB = await await database.getItem("position")
  let x = positionDB?.x ?? startX
  let y = positionDB?.y ?? startY

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

function getTextures(spriteSheet, key) {
  return spriteSheet.data.animations[key].map(id => {
    const texture = spriteSheet.textures[id]
    texture.rotate = spriteSheet.data.frames[id].rotate ?? texture.rotate
    return texture
  })
}

function getData(id) {
  return {
    meta: {},
    frames: {
      ["stillDown" + id]: {
        frame: getFrame(id),
      },
      ["stillUp" + id]: {
        frame: getFrame(id + 1),
      },
      ["stillLeft" + id]: {
        frame: getFrame(id + 2),
      },
      ["stillRight" + id]: {
        frame: getFrame(id + 2),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },

      ["walkDown0" + id]: {
        frame: getFrame(id + 3)
      },
      ["walkDown1" + id]: {
        frame: getFrame(id + 3),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },

      ["walkUp0" + id]: {
        frame: getFrame(id + 4),
      },
      ["walkUp1" + id]: {
        frame: getFrame(id + 4),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },

      ["walkLeft" + id]: {
        frame: getFrame(id + 5),
      },

      ["walkRight" + id]: {
        frame: getFrame(id + 5),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },
    },

    animations: {
      walkDown: ["walkDown0" + id, "stillDown" + id, "walkDown1" + id, "stillDown" + id],
      walkUp: ["walkUp0" + id, "stillUp" + id, "walkUp1" + id, "stillUp" + id],
      walkLeft: ["walkLeft" + id, "stillLeft" + id],
      walkRight: ["walkRight" + id, "stillRight" + id],
    },
  }
}

function getFrame(id) {
  return {
    x: (id % COLUMNS) * TILE_SIZE,
    y: (Math.floor(id / COLUMNS)) * TILE_SIZE,
    w: TILE_SIZE,
    h: TILE_SIZE,
  }
}

function createEvent(callback) {
  let resolve = null

  const event = {
    check,
    promise: new Promise(callback => {
      resolve = callback
    }),
  }

  function check() {
    if (callback()) {
      resolve()
      return true
    }
  }

  return event
}

let resources = null
let loadingResources = null