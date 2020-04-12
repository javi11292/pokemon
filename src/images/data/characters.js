import { groupD8 } from "pixi.js"

const SIZE = 16
const COLUMNS = 8
const ROTATE = "rotate"

function getFrame(id) {
  return {
    x: (id % COLUMNS) * SIZE,
    y: (Math.floor(id / COLUMNS)) * SIZE,
    w: SIZE,
    h: SIZE,
  }
}

export function getData(id) {
  return {
    meta: {},
    frames: {
      ["stillDown" + id]: {
        frame: getFrame(id),
      },
      ["stillUp" + id]: {
        frame: getFrame(id + 1),
      },
      ["stillLeft" + id]: {
        frame: getFrame(id + 2),
      },
      ["stillRight" + id]: {
        frame: getFrame(id + 2),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },

      ["walkDown0" + id]: {
        frame: getFrame(id + 3)
      },
      ["walkDown1" + id]: {
        frame: getFrame(id + 3),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },

      ["walkUp0" + id]: {
        frame: getFrame(id + 4),
      },
      ["walkUp1" + id]: {
        frame: getFrame(id + 4),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },

      ["walkLeft" + id]: {
        frame: getFrame(id + 5),
      },

      ["walkRight" + id]: {
        frame: getFrame(id + 5),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },
    },

    animations: {
      walkDown: ["walkDown0" + id, "stillDown" + id, "walkDown1" + id, "stillDown" + id],
      walkUp: ["walkUp0" + id, "stillUp" + id, "walkUp1" + id, "stillUp" + id],
      walkLeft: ["walkLeft" + id, "stillLeft" + id],
      walkRight: ["walkRight" + id, "stillRight" + id],
    },
  }
}