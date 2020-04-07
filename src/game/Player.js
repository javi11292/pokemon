import { Spritesheet, AnimatedSprite } from "pixi.js"
import data from "images/data/player"
import texture from "images/characters.png"
import { upperCase } from "libraries/util"
import { CONTROLS } from "libraries/constants"

function addSpriteSheet(player) {
  player.app.loader.add("characters", texture).load((loader, resources) => {
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

      sprite.width = 100
      sprite.height = 100
      sprite.animationSpeed = 0.1
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

  constructor(app) {
    this.app = app
    this.sprite = null
    this.state = null
    this.direction = CONTROLS.DOWN
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

  still = () => {
    if (this.state === Player.STATES.STILL) return
    this.state = Player.STATES.STILL
    setTextures(this)
  }

  walk = direction => {
    if (this.state === Player.STATES.WALK && this.direction === direction) return
    this.state = Player.STATES.WALK
    this.direction = direction
    setTextures(this)
  }
}