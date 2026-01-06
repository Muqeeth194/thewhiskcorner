import { configureStore } from "@reduxjs/toolkit"
import cakesReducer from "./cakesSlice"
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    cakes: cakesReducer,
    auth: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
