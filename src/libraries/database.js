import localForage from "localforage"
import { CHARACTERS } from "./constants"

export const playerDB = localForage.createInstance({ name: CHARACTERS.PLAYER })

export function getEventsDB(storeName) {
  return localForage.createInstance({ name: "events", storeName })
}