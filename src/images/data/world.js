const WIDTH = 16
const HEIGHT = 16

export default {
  0: {
    name: "dirt",
    x: WIDTH * 0,
    y: HEIGHT * 0,
    w: WIDTH,
    h: HEIGHT,
  },
  1: {
    name: "grass",
    x: WIDTH * 2,
    y: HEIGHT * 1,
    w: WIDTH,
    h: HEIGHT,
  },
  2: {
    name: "wall",
    x: WIDTH * 6,
    y: HEIGHT * 0,
    w: WIDTH,
    h: HEIGHT,
    collision: true,
  },
  3: {
    name: "dirt2",
    x: WIDTH * 0,
    y: HEIGHT * 1,
    w: WIDTH,
    h: HEIGHT,
  },
}