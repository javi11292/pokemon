const parser = new DOMParser()

export async function loadText(id, callback) {
  try {
    const { default: url } = await import(`scripts/${id}.txt`)
    const text = await fetch(url).then(response => response.text())
    callback({ value: text })
    return text
  } catch { }
}

export async function parseData(url) {
  try {
    const text = await fetch(url).then(response => response.text())
    const [xml] = Array.from(parser.parseFromString(text, "application/xml").children)
    const [, ...tileset] = xml.children

    return tileset.reduce((acc, tile) => {
      const [...properties] = tile.children[0].children
      acc[tile.id] = properties.reduce((acc, property) => {
        acc[property.getAttribute("name")] = property.getAttribute("value")
        return acc
      }, {})
      return acc
    }, { tileSize: xml.getAttribute("tilewidth"), columns: xml.getAttribute("columns") })
  } catch { }
}

export async function parseMap(url) {
  try {
    const text = await fetch(url).then(response => response.text())
    const [xml] = Array.from(parser.parseFromString(text, "application/xml").children)
    const [, ...layers] = xml.children

    return layers.reduce((acc, layer) => {
      const tileData = acc[layer.getAttribute("name")] || {}

      if (layer.nodeName === "objectgroup") {
        const objects = Array.from(layer.children).reduce((acc, object) => {
          acc.push({
            id: object.getAttribute("gid"),
            x: parseInt(object.getAttribute("x"), 10),
            y: parseInt(object.getAttribute("y"), 10) - object.getAttribute("width"),
            ...Array.from(object.children[0].children).reduce((acc, property) => {
              acc[property.getAttribute("name")] = property.getAttribute("value")
              return acc
            }, {})
          })

          return acc
        }, [])

        Object.assign(tileData, { objects })
      } else {
        Object.assign(tileData, { value: layer.children[0].innerHTML })
      }

      return { ...acc, [layer.getAttribute("name")]: tileData }
    }, {})
  } catch { }
}

export function upperCase(string = "") {
  return string && string[0].toUpperCase() + string.slice(1)
}