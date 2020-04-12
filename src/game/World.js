import { Graphics, Loader, Container, UPDATE_PRIORITY } from "pixi.js"
import worldTexture from "images/world.png"
import worldData from "images/data/world.json"
import { SIZE } from "libraries/constants"
import { playerDB } from "libraries/database"
import { createCharacter } from "./Character"

export async function createWorld(game) {
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

  function update() {
    const position = world.game.player.position
    world.camera.pivot.x = -world.game.player.sprite?.x
    world.camera.pivot.y = -world.game.player.sprite?.y
    world.camera.position.x = -position.x
    world.camera.position.y = -position.y
  }

  function setLocation(location, layer, position) {
    world.location = location || world.location
    world.layer = layer || "index"
    playerDB.setItem("location", world.location)
    playerDB.setItem("layer", world.layer)
    loadMapLocation(position)
  }

  async function load() {
    const texture = await loadTexture()
    world.texture = texture
    world.data = {
      tileSize: worldData.tilewidth,
      columns: worldData.columns,
      tiles: worldData.tiles.reduce((acc, tile) => {
        acc[tile.id] = tile.properties.reduce(addProperties, {})
        return acc
      }, {})
    }
    await loadMapLocation()
    world.game.enableControls = true
  }

  async function loadMapLocation(position) {
    const eventsImport = import(`scripts/${world.location}/${world.layer}`).catch(() => ({}))

    const { location, layer } = world
    let locationMap = world.map[location + layer]
    let locationCharacters = world.characters[location + layer]

    if (!locationMap) {
      const locationTiles = {}
      locationMap = new Container()
      locationCharacters = {}

      const { layers, tilesets, width } = await import(`maps/${location}.json`)
      const promises = []

      layers.forEach(item => {
        if (item.name !== layer) return

        if (item.type === "tilelayer") loadTile({ item, tilesets, locationTiles, locationMap, width })

        if (item.type === "objectgroup") loadObject({ item, tilesets, locationTiles, locationCharacters, locationMap, promises })
      })

      await Promise.all(promises)

      world.map[location + layer] = locationMap
      world.tiles[location + layer] = locationTiles
      world.characters[location + layer] = locationCharacters
    }

    const { getEvents } = await eventsImport

    world.events = getEvents ? getEvents(game) : null
    world.camera.removeChildren()
    world.camera.addChild(locationMap)
    world.game.characters = locationCharacters
    if (position) world.game.player.position = position
  }

  function tileAt(x, y) {
    if (!world.tiles[location + layer]) return {}
    return world.tiles[location + layer][`${x}-${y}`] || {}
  }


  function loadTile({ item, tilesets, locationTiles, locationMap, width }) {
    const { tileSize, columns } = world.data

    item.data.forEach((value, index) => {
      if (!value) return
      const id = parseInt(value, 10) - tilesets[0].firstgid
      const object = world.data.tiles[id] || {}
      const x = (index % width)
      const y = Math.floor(index / width)
      const tileX = (id % columns) * tileSize
      const tileY = Math.floor(id / columns) * tileSize

      locationTiles[`${x}-${y}`] = object

      addGraphic({
        texture: world.texture,
        map: locationMap,
        tileX,
        tileY,
        x,
        y,
        tileSize,
      })
    })
  }

  function loadObject({ item, tilesets, locationTiles, locationCharacters, locationMap, promises }) {
    const { tileSize, columns } = world.data

    item.objects.forEach(async object => {
      const { gid } = object
      if (!tilesets[1] || gid < tilesets[1].firstgid) {
        const id = gid - tilesets[0].firstgid
        const tileX = (id % columns) * tileSize
        const tileY = Math.floor(id / columns) * tileSize
        const x = object.x / tileSize
        const y = object.y / tileSize - 1

        locationTiles[`${x}-${y}`] = { ...(world.data.tiles[id] || {}), ...object.properties.reduce(addProperties, {}) }

        addGraphic({
          texture: world.texture,
          map: locationMap,
          tileX,
          tileY,
          x,
          y,
          tileSize,
        })
      } else {
        const id = gid - tilesets[1].firstgid
        const promise = createCharacter(world.game, id, locationMap, SIZE * object.x / tileSize, SIZE * (object.y / tileSize - 1))
        promises.push(promise)

        const properties = object.properties ? object.properties.reduce(addProperties, {}) : {}

        const character = await promise
        character.sprite.visible = properties.visible !== false

        locationCharacters[id] = character
      }
    })
  }

  game.app.stage.addChildAt(world.camera, 0)

  game.app.ticker.add(update, null, UPDATE_PRIORITY.INTERACTION)

  let location = null
  let layer = null

  return world
}

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

function addProperties(acc, property) {
  acc[property.name] = property.value
  return acc
}