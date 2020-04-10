import { groupD8 } from "pixi.js"

const SIZE = 16
const COLUMNS = 8
const ROTATE = "rotate"

export const CHARACTERS = {
  PLAYER: [6, 14]
}

function getFrame(id) {
  return {
    x: (id % COLUMNS) * SIZE,
    y: (Math.floor(id / COLUMNS)) * SIZE,
    w: SIZE,
    h: SIZE,
  }
}

export function getData([x, y]) {
  const id = y * COLUMNS + x

  return {
    meta: {},
    frames: {
      stillDown: {
        frame: getFrame(id),
      },
      stillUp: {
        frame: getFrame(id + 1),
      },
      stillLeft: {
        frame: getFrame(id + 2),
      },
      stillRight: {
        frame: getFrame(id + 2),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },

      walkDown0: {
        frame: getFrame(id + 3)
      },
      walkDown1: {
        frame: getFrame(id + 3),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },

      walkUp0: {
        frame: getFrame(id + 4),
      },
      walkUp1: {
        frame: getFrame(id + 4),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },

      walkLeft: {
        frame: getFrame(id + 5),
      },

      walkRight: {
        frame: getFrame(id + 5),
        [ROTATE]: groupD8.MIRROR_HORIZONTAL,
      },
    },

    animations: {
      walkDown: ["walkDown0", "stillDown", "walkDown1", "stillDown"],
      walkUp: ["walkUp0", "stillUp", "walkUp1", "stillUp"],
      walkLeft: ["walkLeft", "stillLeft"],
      walkRight: ["walkRight", "stillRight"],
    },
  }
}