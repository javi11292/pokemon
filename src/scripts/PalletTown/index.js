import { getEventsDB } from "libraries/database"
import { CHARACTERS, SIZE } from "libraries/constants"

const database = getEventsDB("PalletTown")

export function getEvents(game) {
  const events = {
    async meetOak() {
      if (await database.getItem("meetOak")) return

      async function goToLaboratory(character) {
        if (character === player) {
          character.walk("down")
          character.event = () => character.nextTile.y === 3
          await character.event
        }

        character.walk("left")
        character.event = () => character.nextTile.x === 9
        await character.event

        character.walk("down")
        character.event = () => character.nextTile.y === 12
        await character.event

        character.walk("right")
        character.event = () => character.nextTile.x === 12
        await character.event

        character.walk("up")
        character.event = () => character.nextTile.y === (character === player ? 11 : 10)
        await character.event
      }

      async function goUp(character) {
        character.walk("up")
        character.event = () => character.nextTile.y === 2
        await character.event
      }

      let character = game.characters[CHARACTERS.OAK]
      const { player } = game

      await setMessage("¡Eh tú, espera!")
      game.enableControls = false
      character.collision = false
      player.still("down")

      character.properties = { visible: true }
      character.position = {
        x: 9 * SIZE,
        y: 7 * SIZE,
      }

      character.walk("up")
      character.event = () => character.nextTile.y === 3
      await character.event

      character.walk("right")
      character.event = () => character.nextTile.x === player.position.x / SIZE
      await character.event

      character.still("up")

      await setMessage(`
      No puedes irte por ahí a lo loco sin un pokemon, ¿es que no has visto la noticia del niño que murió incinerado por un charizard?
      ¿Y la señora que estaba recogiendo la ropa del tendedero felizmente cuando vino un magikarp y se la chapoteó entera? Sígueme anda, que te doy uno.
      `)

      await Promise.all([
        goToLaboratory(character).then(() => character.properties = { visible: false }),
        goToLaboratory(player).then(() => player.still())
      ])


      player.event = () => game.characters[CHARACTERS.OAK] !== character
      await player.event

      character.collision = true

      character = game.characters[CHARACTERS.OAK]
      character.direction = "up"
      character.position = {
        x: 5 * SIZE,
        y: 10 * SIZE,
      }

      await Promise.all([
        goUp(character).then(() => character.still("left")),
        goUp(player).then(() => player.still("right")),
      ])

      await setMessage("Elige uno de los pokemon sobre la mesa")

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