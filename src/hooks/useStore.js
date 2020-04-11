import getStore from "eztore"

export default getStore({
  notifications: {
    state: [],
    reducer: (state, { action, value }) => {
      switch (action) {
        case "push":
          state.push(value)
          break
        case "shift":
          state.shift()
          break
        default:
          return
      }
    },
  },
  message: {
    state: { value: "", callback: null },
    reducer: (state, value) => typeof value === "function" ? value(state) : value
  }
})