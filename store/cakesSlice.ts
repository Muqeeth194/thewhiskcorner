import { CakesState } from "@/types/contents"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchCakes = createAsyncThunk("cakes/fetchCakes", async () => {
  const response = await fetch("/api/cakes")
  return response.json()
})

export const fetchCakeById = createAsyncThunk(
  "cakes/fetchById",
  async (id: number) => {
    const response = await fetch(`/api/cakes/${id}`)
    return response.json()
  }
)

const initialState: CakesState = {
  data: [],
  selectedCake: null,
  isLoading: false,
  error: undefined as string | undefined,
}

const cakesSlice = createSlice({
  name: "cakes",
  initialState,
  reducers: {
    clearSelectedCake: (state) => {
      state.selectedCake = null
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch ALL Cakes ---
      .addCase(fetchCakes.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchCakes.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchCakes.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to load cakes"
      })

      // --- Fetch SINGLE Cake (Add these!) ---
      .addCase(fetchCakeById.pending, (state) => {
        state.isLoading = true // 👈 UX: Show spinner when clicking a cake
        state.error = undefined
      })
      .addCase(fetchCakeById.fulfilled, (state, action) => {
        state.isLoading = false
        // ⚠️ Check API: If your API returns an array [cake], use action.payload[0]
        state.selectedCake = action.payload
      })
      .addCase(fetchCakeById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to load cake details"
      })
  },
})

export const { clearSelectedCake } = cakesSlice.actions

export default cakesSlice.reducer
