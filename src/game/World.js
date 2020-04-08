import { Graphics, Loader, Container } from "pixi.js"
import data from "images/data/world"
import texture from "images/world.png"
import { SIZE } from "libraries/constants"

export function createWorld(game) {
  const world = {
    game,
    update,
    tileAt,
    location: null,
    texture: null,
    map: {},
    camera: new Container(),
  }

  function update() {
    const position = world.game.player.position
    world.camera.pivot.x = -world.game.player.sprite?.x
    world.camera.pivot.y = -world.game.player.sprite?.y
    world.camera.position.x = -position.x
    world.camera.position.y = -position.y
  }

  function loadTexture() {
    new Loader().add("world", texture).load((loader, resources) => {
      world.texture = resources.world.texture
      loadMapLocation("PalletTown")
    })
  }

  async function loadMapLocation(location) {
    let locationMap = world.map[location]

    if (!locationMap) {
      const { default: url } = await import(`map/${location}.txt`)
      const map = await fetch(url).then(response => response.text())

      locationMap = new Container()

      map.split("\n").forEach((row, i) => row.split(" ").forEach((value, j) => {
        const frame = data[value]
        if (!frame) return
        const graphics = new Graphics()
        graphics.name = `${j}-${i}`
        graphics.collision = frame.collision

        graphics.beginTextureFill({ texture: world.texture })
        graphics.drawRect(frame.x, frame.y, frame.w, frame.h)

        graphics.width = SIZE
        graphics.height = SIZE
        graphics.x = -frame.x * graphics.scale.x + j * SIZE
        graphics.y = -frame.y * graphics.scale.y + i * SIZE

        locationMap.addChild(graphics)
      }))

      world.map[location] = locationMap
    }

    world.camera.removeChildren()
    world.camera.addChild(locationMap)
  }

  function tileAt(x, y) {
    if (!world.camera.children.length) return
    return world.camera.getChildAt(0).getChildByName(`${x}-${y}`)
  }

  loadTexture()
  game.app.stage.addChildAt(world.camera, 0)

  return world
}