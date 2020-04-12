import getStore from "eztore"

export default getStore({
  message: {
    state: { value: "" },
    reducer(state, value) {
      return typeof value === "function" ? value(state) : value
    }
  }
})