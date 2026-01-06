// app/providers.tsx
"use client"

import { Provider } from "react-redux"
import { store } from "@/store/store"
import { useEffect, useRef } from "react"
import { checkAuth } from "@/store/authSlice"

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const initialized = useRef(false)

  useEffect(() => {
    // Prevent double initialization in Strict Mode. Only run once on mount
    if (!initialized.current) {
      initialized.current = true
      store.dispatch(checkAuth()) // This sets isLoggedIn based on cookie
    }
  }, [])

  return <Provider store={store}>{children}</Provider>
}
