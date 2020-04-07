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
  player.sprite.textures = player.textures[player.state + upperCase(player.direction)]
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

  updatePosition = shouldStop => {
    if (shouldStop && !this.speed.x && !this.speed.y) return

    const speedX = this.speed.x * SPEED
    const speedY = this.speed.y * SPEED

    const xModule = Math.abs(this.position.x % SIZE)
    const yModule = Math.abs(this.position.y % SIZE)

    if (!shouldStop && !xModule && !yModule) {
      this.position.x += speedX
      this.position.y += speedY
    }

    const xOffset = xModule && (this.speed.x === 1 ? xModule : SIZE - xModule)
    const yOffset = yModule && (this.speed.y === 1 ? yModule : SIZE - yModule)

    if (xModule) {
      const normalizedOffset = this.position.x < 0 ? xOffset : SIZE - xOffset
      this.position.x += normalizedOffset > SPEED ? speedX : normalizedOffset * this.speed.x
    } else {
      this.speed.x = 0
    }

    if (yModule) {
      const normalizedOffset = this.position.y < 0 ? yOffset : SIZE - yOffset
      this.position.y += normalizedOffset > SPEED ? speedY : normalizedOffset * this.speed.y
    } else {
      this.speed.y = 0
    }
  }

  hasWorldCollision = (speedX, speedY) => {
    const nextX = this.position.x / SIZE + speedX
    const nextY = this.position.y / SIZE + speedY
    const floorX = Math.floor(nextX)
    const floorY = Math.floor(nextY)

    if (nextX !== floorX || nextY !== floorY) return !!this.collision

    if (!this.collision || floorX !== this.collision.x || floorY !== this.collision.y) {
      const hasCollision = this.game.world.hasCollision(floorX, floorY)

      if (hasCollision) {
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
    this.updatePosition(true)

    if (this.speed.x || this.speed.y || this.state === Player.STATES.STILL) return
    this.state = Player.STATES.STILL
    setTextures(this)
  }

  walk = direction => {
    const speedX = direction === CONTROLS.RIGHT ? 1 : direction === CONTROLS.LEFT ? -1 : 0
    const speedY = direction === CONTROLS.DOWN ? 1 : direction === CONTROLS.UP ? -1 : 0

    if (!this.hasWorldCollision(speedX, speedY)) {
      this.speed.x = speedX
      this.speed.y = speedY
      this.updatePosition()
    }

    if (this.state === Player.STATES.WALK && this.direction === direction) return
    this.state = Player.STATES.WALK
    this.direction = direction
    setTextures(this)
  }
}