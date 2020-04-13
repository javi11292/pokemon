export function getEvents(game) {
  const events = {
    choosePokemon() {
      game.setMessage({ value: "Elige uno de los pokemon sobre la mesa" })
    }
  }

  return events
}