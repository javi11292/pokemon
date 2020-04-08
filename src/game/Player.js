import { Spritesheet, AnimatedSprite, Loader } from "pixi.js"
import data from "images/data/player"
import texture from "images/characters.png"
import { upperCase } from "libraries/util"
import { CONTROLS, SIZE, SPEED } from "libraries/constants"

const STATES = {
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

export function createPlayer(game) {
  const player = {
    game,
    update,
    still,
    walk,
    sprite: null,
    state: null,
    direction: CONTROLS.DOWN,
    nextDirection: null,
    position: { x: SIZE * 10, y: SIZE * 3 },
    speed: { x: 0, y: 0 },
    collision: null,
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
    player.state = STATES.STILL
  }

  function face(direction) {
    setTimeout(() => {
      player.direction = direction
      if (direction === player.game.action) walk(direction)
      else still()
    }, 100)
  }

  function walk(direction) {
    if (player.direction !== direction && player.state !== STATES.WALK) {
      face(direction)
      return
    }

    player.nextDirection = direction
    player.state = STATES.WALK
  }

  function setTextures() {
    if (!player.sprite) return
    const textures = player.textures[player.state + upperCase(player.direction)]
    if (!textures || player.sprite.textures === textures) return
    player.sprite.textures = textures
    player.sprite.play()
  }

  function updateDirection() {
    if (player.nextDirection) {
      player.direction = player.nextDirection
      player.nextDirection = null
    }
  }

  function updatePosition(dimension, move) {
    if (!player.speed[dimension]) return

    const speed = player.speed[dimension] * SPEED
    const remainder = Math.abs(player.position[dimension] % SIZE)

    const offset = remainder && (player.speed[dimension] === 1 ? remainder : SIZE - remainder)

    if (remainder) {
      const normalizedOffset = player.position[dimension] <= 0 ? offset : SIZE - offset
      player.position[dimension] += normalizedOffset >= SPEED ? speed : normalizedOffset * player.speed[dimension]
    } else if (move) {
      player.position[dimension] += speed
    } else {
      player.speed[dimension] = 0
      updateDirection()
    }
  }

  function hasWorldCollision(speedX, speedY) {
    const nextX = Math.floor(player.position.x / SIZE + speedX)
    const nextY = Math.floor(player.position.y / SIZE + speedY)
    const remainderX = player.position.x % SIZE
    const remainderY = player.position.y % SIZE

    if (remainderX || remainderY) return !!player.collision

    if (!player.collision || nextX !== player.collision.x || nextY !== player.collision.y) {
      const tile = player.game.world.tileAt(nextX, nextY)
      if (!tile || tile.collision) {
        player.collision = {
          x: nextX,
          y: nextY,
        }
      } else {
        player.collision = null
      }
    }

    return !!player.collision
  }

  function update() {
    const speedX = player.direction === CONTROLS.RIGHT ? 1 : player.direction === CONTROLS.LEFT ? -1 : 0
    const speedY = player.direction === CONTROLS.DOWN ? 1 : player.direction === CONTROLS.UP ? -1 : 0

    if (player.state === STATES.WALK && !player.speed.x && !player.speed.y && !hasWorldCollision(speedX, speedY)) {
      player.speed.x = speedX
      player.speed.y = speedY
      updatePosition(player.speed.x ? "x" : "y", true)
    } else if (player.speed.x || player.speed.y) {
      updatePosition(player.speed.x ? "x" : "y")
    } else {
      updateDirection()
    }

    setTextures()
  }

  function addSpriteSheet() {
    new Loader().add("characters", texture).load((loader, resources) => {
      const spriteSheet = new Spritesheet(resources.characters.texture, data)

      spriteSheet.parse(() => {
        player.textures.stillDown = [spriteSheet.textures.stillDown]
        player.textures.stillUp = [spriteSheet.textures.stillUp]
        player.textures.stillLeft = [spriteSheet.textures.stillLeft]
        player.textures.stillRight = [spriteSheet.textures.stillRight]

        player.textures.walkDown = getTextures(spriteSheet, "walkDown")
        player.textures.walkUp = getTextures(spriteSheet, "walkUp")
        player.textures.walkLeft = getTextures(spriteSheet, "walkLeft")
        player.textures.walkRight = getTextures(spriteSheet, "walkRight")

        const sprite = new AnimatedSprite(player.textures[`still${upperCase(player.direction)}`])

        sprite.width = SIZE
        sprite.height = SIZE
        sprite.animationSpeed = 0.1
        sprite.x = player.game.app.screen.width / 2 - sprite.width / 2
        sprite.y = player.game.app.screen.height / 2 - sprite.height / 2
        player.sprite = sprite

        player.game.app.stage.addChild(sprite)
      })
    })
  }

  addSpriteSheet()

  return player
}