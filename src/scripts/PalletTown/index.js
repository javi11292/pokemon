import { getEventsDB } from "libraries/database"
import { CHARACTERS, SIZE } from "libraries/constants"

const database = getEventsDB("PalletTown")

export function getEvents(game) {
  const events = {
    async meetOak() {
      if (await database.getItem("meetOak")) return

      const character = game.characters[CHARACTERS.OAK]
      const { player } = game

      game.enableControls = false
      await setMessage("¡Eh tú, espera!")
      player.still("down")
      character.position.x = 9 * SIZE
      character.position.y = 7 * SIZE
      character.properties = { ...character.properties, visible: true }
      character.walk("up")

      character.event = () => character.nextTile.y === 3
      await character.event
      character.walk("right")

      character.event = () => character.nextTile.x === player.position.x / SIZE
      await character.event
      character.still("up")

      await setMessage(`
      No puedes irte por ahí a lo loco sin un pokemon, ¿es que no has visto la noticia del niño que murió incinerado por un charmander?
      ¿Y la señora que estaba recogiendo la ropa tendida felizmente cuando vino un magikarp y se la chapoteó entera? Sígueme anda, que te doy uno.
      `)

      game.enableControls = true
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