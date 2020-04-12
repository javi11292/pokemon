import { getEventsDB } from "libraries/database"
import { CHARACTERS } from "libraries/constants"

const database = getEventsDB("PalletTown")

const characters = {
  [CHARACTERS.PLAYER]: {
    async "10-1"(game) {
      if (await database.getItem("10-1")) return
      game.setMessage({ value: "¡Eh tu, espera wey!" })
      database.setItem("10-1", true)
    },
    "11-1"(game) {
      characters[CHARACTERS.PLAYER]["10-1"](game)
    },
  }
}

export default characters