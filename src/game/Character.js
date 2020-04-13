import { Spritesheet, AnimatedSprite, Loader, groupD8 } from "pixi.js"
import localForage from "localforage"
import texture from "images/characters.png"
import { upperCase } from "libraries/util"
import { CONTROLS, SIZE, SPEED, CHARACTERS } from "libraries/constants"

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

  const database = localForage.createInstance({ name: id, storeName: id !== CHARACTERS.PLAYER ? game.world.location + game.world.layer : "index" })

  const character = {
    database,
    game,
    collision: true,
    still,
    face,
    walk,
    updateState,
    get properties() {
      return properties
    },
    set properties(value) {
      Object.assign(properties, value)
      database.setItem("properties", properties)

      character.sprite.visible = properties.visible !== false
    },
    postUpdate,
    onNextTileUpdate: () => { },
    get event() {
      return event.promise
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
      game.world.tileAt(position.x / SIZE, position.y, { character: null })
      nextTile = { data: {} }

      position.x = newPosition.x
      position.y = newPosition.y
    },

    // common fields for all characters with same id
    spritesheet: characters[id]?.spritesheet,
    textures: characters[id]?.textures || {
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

  function still(direction) {
    character.nextState = STATES.STILL
    if (direction) character.nextDirection = direction
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

    if (
      character.state === STATES.WALK &&
      !character.speed.x && !character.speed.y &&
      character.nextTile.data.collision === false &&
      (character.nextTile.data.character?.properties.visible === false || character.nextTile.data.character?.collision !== true)
    ) {
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

    game.world.tileAt(position.x / SIZE, position.y / SIZE, { character })
  }

  function updateTextures() {
    if (!character.sprite) return
    const textures = character.textures[character.state + upperCase(character.direction)]
    if (!textures || character.sprite.textures === textures) return
    character.sprite.textures = textures
    character.sprite.play()
  }

  function addSpritesheet() {
    const spritesheet = new Spritesheet(resources.characters.texture, getData(id))
    character.spritesheet = spritesheet

    spritesheet.parse(() => {
      loadSprite()
    })
  }

  function loadSprite() {
    character.textures.stillDown = [character.spritesheet.textures["stillDown" + id]]
    character.textures.stillUp = [character.spritesheet.textures["stillUp" + id]]
    character.textures.stillLeft = [character.spritesheet.textures["stillLeft" + id]]
    character.textures.stillRight = [character.spritesheet.textures["stillRight" + id]]

    character.textures.walkDown = getTextures(character.spritesheet, "walkDown")
    character.textures.walkUp = getTextures(character.spritesheet, "walkUp")
    character.textures.walkLeft = getTextures(character.spritesheet, "walkLeft")
    character.textures.walkRight = getTextures(character.spritesheet, "walkRight")

    const sprite = new AnimatedSprite(character.textures[character.state + upperCase(character.direction)])
    character.sprite = sprite

    sprite.width = SIZE
    sprite.height = SIZE
    sprite.animationSpeed = 0.1
    sprite.x = x
    sprite.y = y

    container.addChild(sprite)
  }

  let event = null
  let nextTile = { data: {} }
  const properties = await database.getItem("properties") || {}
  const position = await createPosition(character, database, x, y)

  if (!characters[id]) addSpritesheet()
  else loadSprite()

  character.game.app.ticker.add(update)

  characters[id] = character

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

async function createPosition(character, database, startX, startY) {
  function removeCharacter() {
    character.game.world.tileAt(position.x / SIZE, position.y / SIZE, { character: null })
  }

  const positionDB = await database.getItem("position")
  let x = positionDB?.x ?? startX
  let y = positionDB?.y ?? startY

  const position = {
    get x() {
      return x
    },
    set x(newX) {
      if (x % SIZE === 0) removeCharacter()

      x = newX
      if (x % SIZE === 0) {
        database.setItem("position", { ...position, x })
      }
    },
    get y() {
      return y
    },
    set y(newY) {
      if (y % SIZE === 0) removeCharacter()

      y = newY
      if (y % SIZE === 0) {
        database.setItem("position", { ...position, y })
      }
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
const characters = {}