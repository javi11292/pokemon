export function upperCase(string = "") {
  return string && string[0].toUpperCase() + string.slice(1)
}

export function sendMessage(game) {
  return value => new Promise(resolve => {
    game.setMessage({ value, callback: resolve })
  })
}