import { getEventsDB } from "libraries/database"

const database = getEventsDB("PalletTown")

export const player = {
  async "10-1"(game) {
    if (await database.getItem("10-1")) return
    game.setMessage({ value: "¡Eh tu, espera wey!" })
    database.setItem("10-1", true)
  },
  "11-1"(game) {
    player["10-1"](game)
  },
}