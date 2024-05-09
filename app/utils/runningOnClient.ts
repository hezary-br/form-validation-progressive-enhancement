import { useSyncExternalStore } from "react"

export function isRunningOnClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}
