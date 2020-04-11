import localForage from "localforage"

export const playerDB = localForage.createInstance({ name: "player" })

export function getEventsDB(storeName) {
  return localForage.createInstance({ name: "events", storeName })
}