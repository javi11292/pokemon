import { Graphics, Loader, Container, UPDATE_PRIORITY } from "pixi.js"
import worldTexture from "images/world.png"
import worldData from "images/data/world.xml"
import { SIZE } from "libraries/constants"
import { parseData, parseMap } from "libraries/util"
import { playerDB } from "libraries/database"
import { createCharacter } from "./Character"

function loadTexture() {
  return new Promise(resolve => {
    new Loader().add("world", worldTexture).load((loader, resources) => {
      resolve(resources.world.texture)
    })
  })
}

function addGraphic({ texture, map, tileX, tileY, x, y, tileSize }) {
  const graphics = new Graphics()

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
    tiles: {},
    characters: {},
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
    const eventsImport = import(`scripts/${world.location}/${world.layer}`).catch(() => ({ default: {} }))
    const { location, layer } = world
    let locationMap = world.map[location + layer]
    let locationTiles = world.tiles[location + layer]
    let locationCharacters = world.characters[location + layer]

    if (!locationMap) {
      locationMap = new Container()
      locationTiles = {}
      locationCharacters = []

      const { default: url } = await import(`maps/${location}.xml`)
      const layers = await parseMap(url)
      const { tileSize, columns } = world.data
      const { value: map, objects, } = layers[layer]
      const promises = []

      map.split("\n").forEach((row, i) => row.split(",").forEach((value, j) => {
        if (!value || value === "0") return

        const id = parseInt(value, 10) - layers.gids.world
        const object = world.data[id] || {}
        const tileX = (id % columns) * tileSize
        const tileY = Math.floor(id / columns) * tileSize

        locationTiles[`${j}-${i}`] = object

        addGraphic({
          texture: world.texture,
          map: locationMap,
          tileX,
          tileY,
          x: j,
          y: i,
          tileSize,
        })
      }))

      objects.forEach(async object => {
        if (!layers.gids.characters || object.id < layers.gids.characters) {
          const id = object.id - layers.gids.world
          const tileX = (id % columns) * tileSize
          const tileY = Math.floor(id / columns) * tileSize

          locationTiles[`${object.x / tileSize}-${object.y / tileSize}`] = { ...(world.data[id] || {}), ...object }

          addGraphic({
            texture: world.texture,
            map: locationMap,
            tileX,
            tileY,
            x: object.x / tileSize,
            y: object.y / tileSize,
            tileSize,
          })
        } else {
          const id = object.id - layers.gids.characters
          const promise = createCharacter(world.game, id, locationMap, SIZE * object.x / tileSize, SIZE * object.y / tileSize)
          promises.push(promise)

          const character = await promise
          locationCharacters.push(character)

          character.sprite.visible = object.visible !== "false"
        }

      })

      await Promise.all(promises)

      world.map[location + layer] = locationMap
      world.tiles[location + layer] = locationTiles
      world.characters[location + layer] = locationCharacters
    }

    const { default: events } = await eventsImport

    world.events = events
    world.camera.removeChildren()
    world.camera.addChild(locationMap)
    if (position) world.game.player.position = position
  }

  function tileAt(x, y) {
    if (!world.tiles[location + layer]) return {}
    return world.tiles[location + layer][`${x}-${y}`] || {}
  }

  game.app.stage.addChildAt(world.camera, 0)

  game.app.ticker.add(update, null, UPDATE_PRIORITY.INTERACTION)

  return world
}