export async function loadText(id, callback) {
  try {
    const { default: url } = await import(`scripts/${id}.txt`)
    const text = await fetch(url).then(response => response.text())
    callback({ value: text })
  } catch (error) {
    console.error(error)
  }
}

export function upperCase(string = "") {
  return string && string[0].toUpperCase() + string.slice(1)
}