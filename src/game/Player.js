import { Spritesheet, AnimatedSprite, Loader } from "pixi.js"
import data from "images/data/player"
import texture from "images/characters.png"
import { upperCase } from "libraries/util"
import { CONTROLS, SIZE, SPEED } from "libraries/constants"

function addSpriteSheet(player) {
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
      sprite.x = player.app.screen.width / 2 - sprite.width / 2
      sprite.y = player.app.screen.height / 2 - sprite.height / 2
      player.sprite = sprite

      player.app.stage.addChild(sprite)
    })
  })
}

function setTextures(player) {
  if (!player.sprite) return
  const textures = player.textures[player.state + upperCase(player.direction)]
  if (!textures || player.sprite.textures === textures) return
  player.sprite.textures = textures
  player.sprite.play()
}

function getTextures(spriteSheet, key) {
  return spriteSheet.data.animations[key].map(id => {
    const texture = spriteSheet.textures[id]
    texture.rotate = spriteSheet.data.frames[id].rotate ?? texture.rotate
    return texture
  })
}

export class Player {
  static STATES = {
    STILL: "still",
    WALK: "walk",
  }

  constructor(game) {
    this.game = game
    this.app = game.app
    this.sprite = null
    this.state = null
    this.direction = CONTROLS.DOWN
    this.nextDirection = null

    this.position = {
      x: SIZE * 10,
      y: SIZE * 3,
    }

    this.speed = {
      x: 0,
      y: 0,
    }

    this.collision = null

    this.textures = {
      stillDown: [],
      stillUp: [],
      stillLeft: [],
      stillRight: [],
      walkDown: [],
      walkUp: [],
      walkLeft: [],
      walkRight: [],
    }

    addSpriteSheet(this)
  }

  update = () => {
    const speedX = this.direction === CONTROLS.RIGHT ? 1 : this.direction === CONTROLS.LEFT ? -1 : 0
    const speedY = this.direction === CONTROLS.DOWN ? 1 : this.direction === CONTROLS.UP ? -1 : 0

    if (this.state === Player.STATES.WALK && !this.speed.x && !this.speed.y && !this.hasWorldCollision(speedX, speedY)) {
      this.speed.x = speedX
      this.speed.y = speedY
      this.updatePosition(this.speed.x ? "x" : "y", true)
    } else if (this.speed.x || this.speed.y) {
      this.updatePosition(this.speed.x ? "x" : "y")
    } else {
      this.updateDirection()
    }

    setTextures(this)
  }

  updateDirection = () => {
    if (this.nextDirection) {
      this.direction = this.nextDirection
      this.nextDirection = null
    }
  }

  updatePosition = (dimension, move) => {
    if (!this.speed[dimension]) return

    const speed = this.speed[dimension] * SPEED
    const remainder = Math.abs(this.position[dimension] % SIZE)

    const offset = remainder && (this.speed[dimension] === 1 ? remainder : SIZE - remainder)

    if (remainder) {
      const normalizedOffset = this.position[dimension] <= 0 ? offset : SIZE - offset
      this.position[dimension] += normalizedOffset >= SPEED ? speed : normalizedOffset * this.speed[dimension]
    } else if (move) {
      this.position[dimension] += speed
    } else {
      this.speed[dimension] = 0
      this.updateDirection()
    }
  }

  hasWorldCollision = (speedX, speedY) => {
    const nextX = this.position.x / SIZE + speedX
    const nextY = this.position.y / SIZE + speedY
    const floorX = Math.floor(nextX)
    const floorY = Math.floor(nextY)

    if (nextX !== floorX || nextY !== floorY) return !!this.collision

    if (!this.collision || floorX !== this.collision.x || floorY !== this.collision.y) {
      if (this.game.world.hasCollision(floorX, floorY)) {
        this.collision = {
          x: floorX,
          y: floorY,
        }
      } else {
        this.collision = null
      }
    }

    return !!this.collision
  }

  still = () => {
    this.state = Player.STATES.STILL
  }

  face = (direction) => {
    setTimeout(() => {
      this.direction = direction
      if (this.game.action === direction) this.walk(direction)
      else this.still()
    }, 100)
  }

  walk = direction => {
    if (this.direction !== direction && this.state !== Player.STATES.WALK) {
      this.face(direction)
      return
    }

    this.nextDirection = direction
    this.state = Player.STATES.WALK
  }
}