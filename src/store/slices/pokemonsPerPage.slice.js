import { createSlice } from "@reduxjs/toolkit";

const pokemonsPerPageSlice = createSlice({
  initialState: localStorage.getItem("pokemonsPerPage") ?? 12,
  name: "pokemonsPerPage",
  reducers: {
    setPokemonsPerPage: (state, action) => {
      localStorage.setItem("pokemonsPerPage", action.payload)
      return action.payload
    }
  }
})
export const {setPokemonsPerPage} = pokemonsPerPageSlice.actions
export default pokemonsPerPageSlice.reducer