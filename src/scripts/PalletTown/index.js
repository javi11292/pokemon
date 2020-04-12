import { getEventsDB } from "libraries/database"
import { CHARACTERS, SIZE } from "libraries/constants"

const database = getEventsDB("PalletTown")

export function getEvents(game) {
  const events = {
    async meetOak() {
      if (await database.getItem("meetOak")) return
      await setMessage("¡Eh tu, espera!")
      const character = game.characters[CHARACTERS.OAK]
      character.position.x = 9 * SIZE
      character.position.y = 7 * SIZE
      character.sprite.visible = true
      character.walk("up")

      character.event = () => character.nextTile.y === 3
      await character.event.promise
      character.walk("right")

      character.event = () => character.nextTile.x === character.game.player.position.x / SIZE
      await character.event.promise
      character.walk("up")

      character.event = () => character.nextTile.y === 2
      await character.event.promise
      character.still()

      database.setItem("meetOak", true)
    },
  }

  function setMessage(value) {
    return new Promise(resolve => {
      game.setMessage({ value, callback: resolve })
    })
  }

  return events
}