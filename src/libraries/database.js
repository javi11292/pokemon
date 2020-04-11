import localForage from "localforage"
import { CHARACTERS } from "images/data/characters"

export const playerDB = localForage.createInstance({ name: CHARACTERS.PLAYER })

export function getEventsDB(storeName) {
  return localForage.createInstance({ name: "events", storeName })
}