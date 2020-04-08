import { groupD8 } from "pixi.js"

const SIZE = 16
const ROTATE = "rotate"

export default {
  meta: {},
  frames: {
    stillDown: {
      frame: {
        x: SIZE * 6,
        y: SIZE * 14,
        w: SIZE,
        h: SIZE,
      },
    },
    walkDown0: {
      frame: {
        x: SIZE * 1,
        y: SIZE * 15,
        w: SIZE,
        h: SIZE,
      },
    },
    walkDown1: {
      frame: {
        x: SIZE * 1,
        y: SIZE * 15,
        w: SIZE,
        h: SIZE,
      },
      [ROTATE]: groupD8.MIRROR_HORIZONTAL,
    },

    stillUp: {
      frame: {
        x: SIZE * 7,
        y: SIZE * 14,
        w: SIZE,
        h: SIZE,
      },
    },
    walkUp0: {
      frame: {
        x: SIZE * 2,
        y: SIZE * 15,
        w: SIZE,
        h: SIZE,
      },
    },
    walkUp1: {
      frame: {
        x: SIZE * 2,
        y: SIZE * 15,
        w: SIZE,
        h: SIZE,
      },
      [ROTATE]: groupD8.MIRROR_HORIZONTAL,
    },


    stillLeft: {
      frame: {
        x: SIZE * 0,
        y: SIZE * 15,
        w: SIZE,
        h: SIZE,
      },
    },
    walkLeft: {
      frame: {
        x: SIZE * 3,
        y: SIZE * 15,
        w: SIZE,
        h: SIZE,
      },
    },

    stillRight: {
      frame: {
        x: SIZE * 0,
        y: SIZE * 15,
        w: SIZE,
        h: SIZE,
      },
      [ROTATE]: groupD8.MIRROR_HORIZONTAL,
    },
    walkRight: {
      frame: {
        x: SIZE * 3,
        y: SIZE * 15,
        w: SIZE,
        h: SIZE,
      },
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