import * as SecureStore from "expo-secure-store"
import { useCallback, useEffect, useReducer } from "react"
import { Platform } from "react-native"

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void]

const useAsyncState = <T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> => {
  return useReducer(
    (_: [boolean, T | null], action: T | null = null): [boolean, T | null] => [
      false,
      action,
    ],
    initialValue,
  ) as UseStateHook<T>
}

export const setStorageItemAsync = async (
  key: string,
  value: string | null,
) => {
  if (Platform.OS !== "web") {
    if (value == null) {
      await SecureStore.deleteItemAsync(key)
    } else {
      await SecureStore.setItemAsync(key, value)
    }
  }
}

export const useStorageState = (key: string): UseStateHook<string> => {
  const [state, setState] = useAsyncState<string>()

  // Get stored value (only on mobile)
  useEffect(() => {
    if (Platform.OS !== "web") {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value)
      })
    }
  }, [key, setState])

  // Set new value (only on mobile)
  const setValue = useCallback(
    (value: string | null) => {
      if (Platform.OS !== "web") {
        setStorageItemAsync(key, value).then(() => {
          setState(value)
        })
      }
    },
    [key, setState],
  )

  return [state, setValue]
}
