// store/cakesSlice.ts
import { CakesState } from "@/types/contents"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchCakes = createAsyncThunk("cakes/fetchCakes", async () => {
  const response = await fetch("/api/cakes")
  return response.json()
})

const initialState: CakesState = {
  data: [],
  isLoading: false,
  error: undefined as string | undefined,
}

const cakesSlice = createSlice({
  name: "cakes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCakes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCakes.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchCakes.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "An error occurred"
      })
  },
})

export default cakesSlice.reducer
