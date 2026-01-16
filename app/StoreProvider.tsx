// app/providers.tsx
"use client"

import { Provider } from "react-redux"
import { store } from "@/store/store"
import { useEffect, useRef } from "react"
import { checkAuth } from "@/store/authSlice"
import { setAuth } from "@/store/authSlice"

export default function ReduxProvider({
  children,
  initialLoggedIn,
}: {
  children: React.ReactNode
  initialLoggedIn: boolean
}) {
  // const initialized = useRef(false)

  useEffect(() => {
    // Prevent double initialization in Strict Mode. Only run once on mount
    // if (!initialized.current) {
    //   initialized.current = true
    // store.dispatch(checkAuth()) // This sets isLoggedIn based on cookie

    // ✅ Dispatch immediately using the value from the Server
    // We don't need to look for cookies in the browser anymore!
    store.dispatch(setAuth({ isLoggedIn: initialLoggedIn, user: null }))
    // }
  }, [])

  return <Provider store={store}>{children}</Provider>
}
