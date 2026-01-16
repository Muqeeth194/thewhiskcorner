// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

interface AuthState {
  isLoggedIn: boolean
  user: {
    id?: number
    email?: string
    name?: string
  } | null
  isInitialized: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  isInitialized: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ isLoggedIn: boolean; user?: any }>
    ) => {
      // console.log("🔵 setAuth called by someone:", action.payload) // ✅ Debug log
      state.isLoggedIn = action.payload.isLoggedIn
      state.user = action.payload.user || null
      state.isInitialized = true
    },
    checkAuth: (state) => {
      const token = Cookies.get("session_token")
      state.isLoggedIn = !!token
      state.isInitialized = true
      // Optionally, decode token to get user info if you store it in the token
    },
    logout: (state) => {
      // console.log("🔴 logout called") // ✅ Debug log
      state.isLoggedIn = false
      state.user = null
      Cookies.remove("session_token")
    },
  },
})

export const { setAuth, checkAuth, logout } = authSlice.actions
export default authSlice.reducer
