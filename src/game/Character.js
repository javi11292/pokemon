import { Spritesheet, AnimatedSprite, Loader } from "pixi.js"
import localForage from "localforage"
import { getData, CHARACTERS } from "images/data/characters"
import texture from "images/characters.png"
import { upperCase } from "libraries/util"
import { CONTROLS, SIZE, SPEED } from "libraries/constants"

export const STATES = {
  STILL: "still",
  WALK: "walk",
}

function getTextures(spriteSheet, key) {
  return spriteSheet.data.animations[key].map(id => {
    const texture = spriteSheet.textures[id]
    texture.rotate = spriteSheet.data.frames[id].rotate ?? texture.rotate
    return texture
  })
}

function createPosition(database) {
  let x = 0
  let y = 0
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

export function createCharacter(game, id) {
  const database = localForage.createInstance({ name: id })
  const position = createPosition(database)

  const character = {
    database,
    game,
    still,
    face,
    walk,
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

  function update() {
    const speedX = character.direction === CONTROLS.RIGHT ? 1 : character.direction === CONTROLS.LEFT ? -1 : 0
    const speedY = character.direction === CONTROLS.DOWN ? 1 : character.direction === CONTROLS.UP ? -1 : 0

    if (character.state === STATES.WALK && !character.speed.x && !character.speed.y) updateNextTile(speedX, speedY)

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
  }

  function updateNextTile(speedX, speedY) {
    const nextX = Math.floor(character.position.x / SIZE + speedX)
    const nextY = Math.floor(character.position.y / SIZE + speedY)

    if (character.nextTile.x === nextX && character.nextTile.y === nextY) return

    const data = character.game.world.tileAt(nextX, nextY)

    character.nextTile = {
      x: nextX,
      y: nextY,
      data: character.game.world.tileAt(nextX, nextY),
    }

    if (data.event === id) loadEvent(nextX, nextY)
  }

  function updatePosition(dimension, move) {
    if (!character.speed[dimension]) return

    const speed = character.speed[dimension] * SPEED
    const remainder = character.position[dimension] % SIZE

    if (remainder || move) {
      character.position[dimension] += speed
    } else {
      character.speed[dimension] = 0
      updateState()

      const { data } = character.nextTile
      if (data.location || data.layer) {
        const [x, y] = data.position.split(",")
        character.game.world.setLocation(data.location, data.layer, { x: x * SIZE, y: y * SIZE })
      }
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
    new Loader().add("characters", texture).load((loader, resources) => {
      const spriteSheet = new Spritesheet(resources.characters.texture, getData(CHARACTERS[id.toUpperCase()]))

      spriteSheet.parse(() => {
        character.textures.stillDown = [spriteSheet.textures.stillDown]
        character.textures.stillUp = [spriteSheet.textures.stillUp]
        character.textures.stillLeft = [spriteSheet.textures.stillLeft]
        character.textures.stillRight = [spriteSheet.textures.stillRight]

        character.textures.walkDown = getTextures(spriteSheet, "walkDown")
        character.textures.walkUp = getTextures(spriteSheet, "walkUp")
        character.textures.walkLeft = getTextures(spriteSheet, "walkLeft")
        character.textures.walkRight = getTextures(spriteSheet, "walkRight")

        const sprite = new AnimatedSprite(character.textures[character.state + upperCase(character.direction)])

        sprite.width = SIZE
        sprite.height = SIZE
        sprite.animationSpeed = 0.1
        sprite.x = character.game.app.screen.width / 2 - sprite.width / 2
        sprite.y = character.game.app.screen.height / 2 - sprite.height / 2
        character.sprite = sprite

        character.game.app.stage.addChild(sprite)
      })
    })
  }

  async function loadEvent(x, y) {
    game.world.events[id][`${x}-${y}`](character.game)
  }

  addSpriteSheet()

  character.game.app.ticker.add(update)

  return character
}