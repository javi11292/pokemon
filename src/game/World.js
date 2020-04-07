import { Graphics, Loader, Container } from "pixi.js"
import data from "images/data/world"
import texture from "images/world.png"
import { SIZE } from "libraries/constants"

function loadTexture(world) {
  new Loader().add("world", texture).load((loader, resources) => {
    world.texture = resources.world.texture
    world.setLocation("PalletTown")
  })
}

async function loadMapLocation(world) {
  let locationMap = world.map[world.location]

  if (!locationMap) {
    const { default: url } = await import(`map/${world.location}.txt`)
    const map = await fetch(url).then(response => response.text())

    locationMap = new Container()

    map.split("\n").forEach((row, i) => row.split(" ").forEach((value, j) => {
      const frame = data[value]
      if (!frame) return
      const graphics = new Graphics()
      graphics.name = `${i}-${j}`
      graphics.collision = frame.collision

      graphics.beginTextureFill({ texture: world.texture })
      graphics.drawRect(frame.x, frame.y, frame.w, frame.h)

      graphics.width = SIZE
      graphics.height = SIZE
      graphics.x = -frame.x * graphics.scale.x + j * SIZE
      graphics.y = -frame.y * graphics.scale.y + i * SIZE

      locationMap.addChild(graphics)
    }))

    world.map[world.location] = locationMap
  }

  world.camera.removeChildren()
  world.camera.addChild(locationMap)
}

export class World {
  constructor(game) {
    this.game = game
    this.location = null
    this.texture = null
    this.map = {}
    this.camera = new Container()

    loadTexture(this)
    game.app.stage.addChildAt(this.camera, 0)
  }

  updatePosition = position => {
    this.camera.pivot.x = -this.game.player.sprite?.x
    this.camera.pivot.y = -this.game.player.sprite?.y
    this.camera.position.x = -position.x
    this.camera.position.y = -position.y
  }

  setLocation = location => {
    this.location = location
    loadMapLocation(this)
  }

  hasCollision = (x, y) => {
    const tile = this.camera.getChildAt(0).getChildByName(`${y}-${x}`)
    return !tile || tile.collision
  }
}