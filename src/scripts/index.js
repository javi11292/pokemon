export function getEvents(game) {
  const events = {
    welcome() {
      game.setMessage({
        value: `
        Bienvenido al mundo pokemon, todo parecido con el original es pura coincidencia. Ahora haz como que quieres salir de Pueblo Paleta
        para empezar la historia.
        ` })
    }
  }

  return events
}