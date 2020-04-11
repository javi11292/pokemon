import { Graphics, Loader, Container, UPDATE_PRIORITY } from "pixi.js"
import worldTexture from "images/world.png"
import worldData from "images/data/world.xml"
import { SIZE } from "libraries/constants"
import { parseData, parseMap } from "libraries/util"
import { playerDB } from "libraries/database"

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
  let location = null
  let layer = null

  const world = {
    game,
    update,
    tileAt,
    setLocation,
    load,
    events: null,
    get location() {
      return location
    },
    set location(newLocation) {
      location = newLocation
      playerDB.setItem("location", newLocation)
    },
    get layer() {
      return layer
    },
    set layer(newLayer) {
      layer = newLayer
      playerDB.setItem("layer", newLayer)
    },
    texture: null,
    data: null,
    map: {},
    camera: new Container(),
  }

  function setLocation(location, layer, position) {
    world.location = location || world.location
    world.layer = layer || "index"
    playerDB.setItem("location", world.location)
    playerDB.setItem("layer", world.layer)
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
    const { location, layer } = world
    let locationMap = world.map[location + layer]

    const eventsImport = import(`scripts/${world.location}/${world.layer}`).catch(() => ({}))

    if (!locationMap) {
      locationMap = new Container()
      const { default: url } = await import(`maps/${location}.xml`)
      const layers = await parseMap(url)
      const { tileSize, columns } = world.data
      const { value: map, objects } = layers[layer]

      map.trim().split("\n").forEach((row, i) => row.split(",").forEach((value, j) => {
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

    const events = await eventsImport

    world.events = events
    world.camera.removeChildren()
    world.camera.addChild(locationMap)
    if (position) world.game.player.position = position
  }

  function tileAt(x, y) {
    if (!world.camera.children.length) return {}
    return world.camera.getChildAt(0).getChildByName(`${x}-${y}`)?.data || {}
  }

  game.app.stage.addChildAt(world.camera, 0)

  game.app.ticker.add(update, null, UPDATE_PRIORITY.INTERACTION)

  return world
}