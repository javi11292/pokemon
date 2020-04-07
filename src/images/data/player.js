import { groupD8 } from "pixi.js"

const WIDTH = 16
const HEIGHT = 16

export default {
  meta: {},
  frames: {
    stillDown: {
      frame: {
        x: WIDTH * 6,
        y: HEIGHT * 14,
        w: WIDTH,
        h: HEIGHT,
      },
    },
    walkDown0: {
      frame: {
        x: WIDTH * 1,
        y: HEIGHT * 15,
        w: WIDTH,
        h: HEIGHT,
      },
    },
    walkDown1: {
      frame: {
        x: WIDTH * 1,
        y: HEIGHT * 15,
        w: WIDTH,
        h: HEIGHT,
      },
      rotate: groupD8.MIRROR_HORIZONTAL,
    },

    stillUp: {
      frame: {
        x: WIDTH * 7,
        y: HEIGHT * 14,
        w: WIDTH,
        h: HEIGHT,
      },
    },
    walkUp0: {
      frame: {
        x: WIDTH * 2,
        y: HEIGHT * 15,
        w: WIDTH,
        h: HEIGHT,
      },
    },
    walkUp1: {
      frame: {
        x: WIDTH * 2,
        y: HEIGHT * 15,
        w: WIDTH,
        h: HEIGHT,
      },
      rotate: groupD8.MIRROR_HORIZONTAL,
    },


    stillLeft: {
      frame: {
        x: WIDTH * 0,
        y: HEIGHT * 15,
        w: WIDTH,
        h: HEIGHT,
      },
    },
    walkLeft: {
      frame: {
        x: WIDTH * 3,
        y: HEIGHT * 15,
        w: WIDTH,
        h: HEIGHT,
      },
    },

    stillRight: {
      frame: {
        x: WIDTH * 0,
        y: HEIGHT * 15,
        w: WIDTH,
        h: HEIGHT,
      },
      rotate: groupD8.MIRROR_HORIZONTAL,
    },
    walkRight: {
      frame: {
        x: WIDTH * 3,
        y: HEIGHT * 15,
        w: WIDTH,
        h: HEIGHT,
      },
      rotate: groupD8.MIRROR_HORIZONTAL,
    },
  },
  animations: {
    walkDown: ["walkDown0", "stillDown", "walkDown1", "stillDown"],
    walkUp: ["walkUp0", "stillUp", "walkUp1", "stillUp"],
    walkLeft: ["walkLeft", "stillLeft"],
    walkRight: ["walkRight", "stillRight"],
  },
}