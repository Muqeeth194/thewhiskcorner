import { configureStore } from "@reduxjs/toolkit"
import cakesReducer from "./cakesSlice"

export const store = configureStore({
  reducer: {
    cakes: cakesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
