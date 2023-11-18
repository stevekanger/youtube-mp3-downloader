import { useCallback, useSyncExternalStore } from 'react'

type UpdaterFn<TStore> = (state: () => TStore) => void

/**
 * Factory function to create a store. Uses useSyncExternalStore
 * to manage the store.
 *
 * @param initialStore - The stores intial value.
 * @returns [useStore, setStore, getStore] utility functions
 */
export default function createStore<TStore>(initialStore: TStore) {
  let store = initialStore
  let listeners = new Set<UpdaterFn<TStore>>()

  function getStore() {
    return store
  }

  function setStore(action: TStore | ((store: TStore) => TStore)) {
    store = action instanceof Function ? action(store) : action
    listeners.forEach((updater) => updater(() => store))
  }

  function useStore() {
    const subscribe = useCallback((listener: UpdaterFn<TStore>) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    }, [])

    return useSyncExternalStore(subscribe, getStore)
  }

  return [useStore, setStore, getStore] as const
}
