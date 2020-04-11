export const player = {
  "10-1"(game) {
    game.setMessage({ value: "¡Eh tu, espera wey!" })
  },
  "11-1"(game) {
    player["10-1"](game)
  },
}