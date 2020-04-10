import localForage from "localforage"

export const playerDB = localForage.createInstance({ name: "player" })