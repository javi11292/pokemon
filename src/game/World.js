import { Graphics, Loader, Container } from "pixi.js"
import worldTexture from "images/world.png"
import worldData from "images/data/world.xml"
import { SIZE } from "libraries/constants"
import { parseData, parseMap } from "libraries/util"

function loadTexture() {
  return new Promise(resolve => {
    new Loader().add("world", worldTexture).load((loader, resources) => {
      resolve(resources.world.texture)
    })
  })
}

function addGraphic({ texture, map, tileX, tileY, x, y, object, tileSize }) {
  const graphics = new Graphics()
  graphics.name = `${x}-${y}`
  graphics.data = object

  graphics.beginTextureFill({ texture })
  graphics.drawRect(tileX, tileY, tileSize, tileSize)

  graphics.width = SIZE
  graphics.height = SIZE

  graphics.x = -tileX * graphics.scale.x + x * SIZE
  graphics.y = -tileY * graphics.scale.y + y * SIZE

  map.addChild(graphics)
}

export function createWorld(game) {
  const world = {
    game,
    update,
    tileAt,
    setLocation,
    location: "PalletTownRooms",
    layer: "house1 f2",
    texture: null,
    data: null,
    map: {},
    camera: new Container(),
  }

  function setLocation(location, layer, position) {
    world.location = location || world.location
    world.layer = layer
    loadMapLocation(position)
  }

  function update() {
    const position = world.game.player.position
    world.camera.pivot.x = -world.game.player.sprite?.x
    world.camera.pivot.y = -world.game.player.sprite?.y
    world.camera.position.x = -position.x
    world.camera.position.y = -position.y
  }

  async function load() {
    const [texture, data] = await Promise.all([loadTexture(), parseData(worldData)])
    world.texture = texture
    world.data = data
    await loadMapLocation()
    world.game.enableControls = true
  }

  async function loadMapLocation(position) {
    const { location } = world
    const layer = world.layer || "index"
    let locationMap = world.map[location + layer]

    if (!locationMap) {
      locationMap = new Container()
      const { default: url } = await import(`maps/${location}.xml`)
      const layers = await parseMap(url)
      const { tileSize, columns } = world.data
      const { value: map, objects } = layers[layer]

      map.split("\n").forEach((row, i) => row.split(",").forEach((value, j) => {
        if (!value || value === "0") return
        const id = parseInt(value, 10) - 1
        const object = world.data[id] || {}
        const tileX = (id % columns) * tileSize
        const tileY = Math.floor(id / columns) * tileSize

        addGraphic({
          texture: world.texture,
          map: locationMap,
          tileX,
          tileY,
          x: j,
          y: i,
          tileSize,
          object,
        })
      }))

      objects.forEach(object => {
        const id = parseInt(object.id, 10) - 1
        const tileX = (id % columns) * tileSize
        const tileY = Math.floor(id / columns) * tileSize

        addGraphic({
          texture: world.texture,
          map: locationMap,
          tileX,
          tileY,
          x: object.x / tileSize,
          y: object.y / tileSize,
          tileSize,
          object: { ...(world.data[id] || {}), ...object },
        })
      })

      world.map[location + layer] = locationMap
    }

    world.camera.removeChildren()
    world.camera.addChild(locationMap)
    if (position) world.game.player.position = position
  }

  function tileAt(x, y) {
    if (!world.camera.children.length) return {}
    return world.camera.getChildAt(0).getChildByName(`${x}-${y}`)?.data || {}
  }

  load()
  game.app.stage.addChildAt(world.camera, 0)

  return world
}